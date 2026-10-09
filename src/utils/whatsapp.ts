import { CartItem, AccessoryItem } from '../types';
import { STEM_PRICING_TIERS } from '../data/products';

export const BUSINESS_WHATSAPP_NUMBER = '27623125656';
export const BUSINESS_WHATSAPP_DISPLAY = '+27 62 312 5656';
export const DEFAULT_DELIVERY_FEE = 150;

/**
 * Format accessory item cleanly to match the requested WhatsApp format:
 * e.g. "pearls For every 10 roses - R50", "Sash -  R50"
 */
export function formatAccessoryLine(acc: AccessoryItem): string {
  if (acc.id === 'pearls') {
    return `pearls For every 10 roses - R${acc.price}`;
  }
  if (acc.id === 'glitter') {
    return `glitter For every 10 roses - R${acc.price}`;
  }
  if (acc.id === 'sash') {
    return `Sash -  R${acc.price}`;
  }
  
  // Clean all-caps names like "CROWN" -> "Crown - R40"
  const formatted = acc.name
    .toLowerCase()
    .replace(' (for every 10 roses)', ' For every 10 roses')
    .replace(/\b\w/g, char => char.toUpperCase());

  return `${formatted} - R${acc.price}`;
}

/**
 * Format stem count with price:
 * e.g. "Stems: 60 - R720"
 */
export function formatStemsLine(item: CartItem): string {
  if (item.selectedStems) {
    const tierPrice = STEM_PRICING_TIERS[item.selectedStems] ?? item.product.price;
    return `Stems: ${item.selectedStems} - R${tierPrice}`;
  }
  if (item.selectedSize) {
    const num = parseInt(item.selectedSize.replace(/\D/g, ''), 10);
    if (!isNaN(num) && STEM_PRICING_TIERS[num]) {
      return `Stems: ${num} - R${STEM_PRICING_TIERS[num]}`;
    }
    return `Stems: ${item.selectedSize} - R${item.product.price}`;
  }
  return `Stems: Standard - R${item.product.price}`;
}

/**
 * Generates a unique 6-digit alphanumeric reference ID: e.g. JE-728194
 */
export function generateOrderUniqueId(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `JE-${digits}`;
}

/**
 * Convert all-caps product name like "PINK BOUQUET" to "Pink Bouquet"
 */
export function formatProductName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export interface OrderDetails {
  uniqueId: string;
  nameAndSurname: string;
  phoneNumber: string;
  gmail: string;
  deliveryDate: string;
  deliveryWindow: string;
  address: string;
  postalCode: string;
  items: CartItem[];
  deliveryFee?: number;
}

/**
 * Accurately calculate order financials (subtotal, delivery fee, total charges)
 */
export function calculateOrderCharges(items: CartItem[], deliveryFee: number = DEFAULT_DELIVERY_FEE) {
  const subtotal = items.reduce((sum, item) => {
    let itemUnit = item.selectedPrice;
    if (itemUnit === undefined) {
      const stemPrice = item.selectedStems !== undefined 
        ? (STEM_PRICING_TIERS[item.selectedStems] ?? item.product.price) 
        : item.product.price;
      const accessoriesPrice = item.selectedAccessories 
        ? item.selectedAccessories.reduce((accSum, a) => accSum + a.price, 0) 
        : 0;
      itemUnit = stemPrice + accessoriesPrice;
    }
    return sum + itemUnit * item.quantity;
  }, 0);

  const totalCharges = subtotal + deliveryFee;
  return { subtotal, deliveryFee, totalCharges };
}

/**
 * Formats the exact order paragraph for WhatsApp as specified:
 *
 * Unique ID:
 * Name and surname:
 * Phone number:
 * Gmail:
 * Delivery Date:
 * Delivery Window:
 * Delivery address and Postal code:
 *
 * Product: Pink Bouquet
 * Stems: 60 - R720
 * Additionals:
 * pearls For every 10 roses - R50
 * Sash -  R50
 * Calligraphy gift message:
 * I love You
 *
 * Delivery fee: R150
 * Total charges: The website should calculate the total before sending the final paragraph
 */
export function generateWhatsappOrderParagraph(order: OrderDetails): string {
  const deliveryFee = order.deliveryFee ?? DEFAULT_DELIVERY_FEE;
  const { totalCharges } = calculateOrderCharges(order.items, deliveryFee);

  const cleanAddress = order.address.trim();
  const cleanPostal = order.postalCode.trim();
  const combinedAddressPostal = [cleanAddress, cleanPostal].filter(Boolean).join(' ');

  const customerHeaderLines: string[] = [
    `Unique ID: ${order.uniqueId || 'JE-000000'}`,
    `Name and surname: ${order.nameAndSurname.trim() || ''}`,
    `Phone number: ${order.phoneNumber.trim() || ''}`,
    `Gmail: ${order.gmail.trim() || ''}`,
    `Delivery Date: ${order.deliveryDate || ''}`,
    `Delivery Window: ${order.deliveryWindow || ''}`,
    `Delivery address and Postal code: ${combinedAddressPostal || ''}`,
  ];

  const productBlocks: string[] = [];

  if (order.items.length === 1) {
    const item = order.items[0];
    const colorLabel = item.selectedColor ? ` (${item.selectedColor.name} Edition)` : '';
    const formattedName = `${formatProductName(item.product.name)}${colorLabel}`;

    const lines: string[] = [
      `Product: ${formattedName}`,
      formatStemsLine(item),
      'Additionals:',
    ];

    if (item.selectedAccessories && item.selectedAccessories.length > 0) {
      item.selectedAccessories.forEach(acc => {
        lines.push(formatAccessoryLine(acc));
      });
    } else {
      lines.push('None');
    }

    lines.push('Calligraphy gift message:');
    lines.push(item.giftNote && item.giftNote.trim() ? item.giftNote.trim() : 'None');

    productBlocks.push(lines.join('\n'));
  } else if (order.items.length > 1) {
    order.items.forEach((item, idx) => {
      const colorLabel = item.selectedColor ? ` (${item.selectedColor.name})` : '';
      const formattedName = `${formatProductName(item.product.name)}${colorLabel}`;

      const lines: string[] = [
        `Product ${idx + 1}: ${formattedName} (Qty: ${item.quantity})`,
        formatStemsLine(item),
        'Additionals:',
      ];

      if (item.selectedAccessories && item.selectedAccessories.length > 0) {
        item.selectedAccessories.forEach(acc => {
          lines.push(formatAccessoryLine(acc));
        });
      } else {
        lines.push('None');
      }

      lines.push('Calligraphy gift message:');
      lines.push(item.giftNote && item.giftNote.trim() ? item.giftNote.trim() : 'None');

      productBlocks.push(lines.join('\n'));
    });
  } else {
    productBlocks.push('Product: No items in bag\nStems: -\nAdditionals:\nNone\nCalligraphy gift message:\nNone');
  }

  const totalsLines: string[] = [
    `Delivery fee: R${deliveryFee}`,
    `Total charges: R${totalCharges.toLocaleString()}`,
  ];

  // Join the 3 sections with double newlines (\n\n) as specified
  return [
    customerHeaderLines.join('\n'),
    productBlocks.join('\n\n'),
    totalsLines.join('\n'),
  ].join('\n\n');
}

/**
 * Builds the official WhatsApp Web/API link
 */
export function createWhatsappUrl(phoneNumber: string, text: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
