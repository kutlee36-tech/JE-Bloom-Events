import React from 'react';
import { CartItem } from '../types';
import { STEM_PRICING_TIERS } from '../data/products';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const getItemPrice = (item: CartItem) => {
    if (item.selectedPrice !== undefined) {
      return item.selectedPrice;
    }
    const stemPrice = item.selectedStems !== undefined 
      ? (STEM_PRICING_TIERS[item.selectedStems] ?? 260) 
      : item.product.price;
    const accessoriesPrice = item.selectedAccessories 
      ? item.selectedAccessories.reduce((sum, a) => sum + a.price, 0) 
      : 0;
    return stemPrice + accessoriesPrice;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0
  );

  const freeDeliveryThreshold = 1500;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F6F2] border-l border-[#E8C7C8] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8C7C8]/50 flex items-center justify-between bg-white/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#333333]" />
              <h2 className="font-serif text-xl text-[#333333]">Your Atelier Bag</h2>
              <span className="text-xs text-[#777777] tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#333333] hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Delivery Meter */}
          <div className="px-6 py-3 bg-[#E8C7C8]/20 border-b border-[#E8C7C8]/30 text-xs text-[#333333]">
            {remainingForFreeDelivery === 0 ? (
              <p className="font-medium text-[#333333]">
                ✨ You’ve qualified for <span className="font-bold">Complimentary White-Glove Hand Delivery</span>!
              </p>
            ) : (
              <div>
                <p>
                  Add <span className="font-semibold tabular-nums">R{remainingForFreeDelivery.toLocaleString()}</span> more to receive complimentary delivery.
                </p>
                <div className="mt-1.5 h-1.5 w-full bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF37] transition-all duration-300"
                    style={{ width: `${progressToFreeDelivery}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-24 text-center">
                <ShoppingBag className="w-12 h-12 text-[#E8C7C8] mx-auto mb-4 stroke-[1.2]" />
                <h3 className="font-serif text-lg text-[#333333] mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-[#777777] max-w-xs mx-auto mb-6">
                  Select one of our fresh signature floral curations to begin.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#333333] text-[#F8F6F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-[#333333] transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const itemUnit = getItemPrice(item);
                return (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex gap-4 pb-6 border-b border-[#E8C7C8]/40"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 shrink-0 bg-[#EFECE6] border border-[#E8C7C8]/60 overflow-hidden">
                      <img
                        src={item.selectedColor?.image || item.product.image}
                        alt={`${item.product.name} ${item.selectedColor ? item.selectedColor.name : ''}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-base text-[#333333] leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-[#999999] hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          {item.selectedColor ? (
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#333333] font-medium bg-white/70 px-2 py-0.5 border border-[#E8C7C8]/50">
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0" 
                                style={{ backgroundColor: item.selectedColor.hex }} 
                              />
                              <span>Colour: {item.selectedColor.name}</span>
                            </span>
                          ) : (
                            <p className="text-[11px] text-[#777777]">
                              {item.selectedStems 
                                ? `${item.selectedStems} ROSES` 
                                : item.selectedSize 
                                  ? `Scale: ${item.selectedSize}` 
                                  : item.product.includesVase 
                                    ? 'Signature Box' 
                                    : 'Bouquet Wrap'}
                            </p>
                          )}
                        </div>
                        {item.selectedAccessories && item.selectedAccessories.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {item.selectedAccessories.map((acc) => (
                              <span 
                                key={acc.id} 
                                className="text-[10px] bg-[#E8C7C8]/25 text-[#333333] px-1.5 py-0.5 border border-[#E8C7C8]/60 font-medium"
                              >
                                + {acc.name} ({acc.priceLabel})
                              </span>
                            ))}
                          </div>
                        )}
                        {item.giftNote && (
                          <p className="text-[11px] text-[#666666] italic mt-1 bg-white/70 p-1.5 border border-[#E8C7C8]/40 line-clamp-2">
                            "{item.giftNote}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#E8C7C8] bg-white">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-[#E8C7C8]/20 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-[#333333]" />
                          </button>
                          <span className="px-3 text-xs font-semibold tabular-nums text-[#333333]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-[#E8C7C8]/20 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-[#333333]" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="text-sm font-bold text-[#333333] tabular-nums">
                          R{(itemUnit * item.quantity).toLocaleString()}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-6 bg-white/60 border-t border-[#E8C7C8]/60 space-y-4">
              <div className="space-y-1.5 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#333333] tabular-nums">R{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span className="font-semibold text-[#333333]">R150</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8C7C8]/40 text-sm font-bold text-[#333333]">
                  <span>Total Charges</span>
                  <span className="tabular-nums font-serif text-base text-[#1A1A1A]">
                    R{(subtotal + 150).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                </svg>
                <span>Checkout via WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[11px] text-center text-[#777777]">
                Hand-tied and packaged with fresh aqua-pack hydration.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
