/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRODUCTS, STEM_PRICING_TIERS } from './data/products';
import { FloralProduct, CartItem, ColorOption, AccessoryItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { StudioStory } from './components/StudioStory';
import { FloralCareGuide } from './components/FloralCareGuide';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [products] = useState<FloralProduct[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with curated Pink Bouquet with 60 roses and accessories matching concierge checkout
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedStems: 60,
      selectedPrice: 820.00,
      selectedSize: '60 ROSES',
      selectedAccessories: [
        { id: 'pearls', name: 'PEARLS (FOR EVERY 10 ROSES)', price: 50, priceLabel: 'R50' },
        { id: 'sash', name: 'SASH', price: 50, priceLabel: 'R50' },
      ],
      giftNote: 'I love You'
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<FloralProduct | null>(null);
  const [quickViewInitialColor, setQuickViewInitialColor] = useState<ColorOption | undefined>(undefined);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (
    product: FloralProduct, 
    stems?: number, 
    price?: number,
    giftNote: string = '',
    color?: ColorOption,
    accessories?: AccessoryItem[]
  ) => {
    const stemPrice = stems ? (STEM_PRICING_TIERS[stems] ?? 260) : product.price;
    const accessoriesPrice = accessories ? accessories.reduce((sum, a) => sum + a.price, 0) : 0;
    const selectedPrice = price ?? (stemPrice + accessoriesPrice);
    const selectedStems = stems ?? (product.stemOptions ? product.stemOptions[0] : undefined);
    const sizeLabel = selectedStems ? `${selectedStems} ROSES` : undefined;

    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && 
                item.selectedStems === selectedStems &&
                item.selectedColor?.id === color?.id &&
                JSON.stringify(item.selectedAccessories?.map(a => a.id).sort()) ===
                JSON.stringify(accessories?.map(a => a.id).sort())
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1,
          giftNote: giftNote || next[existingIdx].giftNote
        };
        return next;
      }
      return [
        ...prev, 
        { 
          product, 
          quantity: 1, 
          selectedStems, 
          selectedSize: sizeLabel, 
          selectedPrice, 
          giftNote,
          selectedColor: color,
          selectedAccessories: accessories && accessories.length > 0 ? accessories : undefined
        }
      ];
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
    const detailDesc = color ? ` (${color.name} Edition)` : selectedStems ? ` (${selectedStems} ROSES)` : '';
    const accDesc = accessories && accessories.length > 0 ? ` + ${accessories.length} accessories` : '';
    showToast(`Added "${product.name}"${detailDesc}${accDesc} to your bag.`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems(prev => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuickView = (product: FloralProduct, initialColor?: ColorOption) => {
    setQuickViewProduct(product);
    setQuickViewInitialColor(initialColor);
  };

  const handleDirectCheckoutFromModal = (
    product: FloralProduct,
    stems?: number,
    price?: number,
    note?: string,
    color?: ColorOption,
    accessories?: AccessoryItem[]
  ) => {
    handleAddToCart(product, stems, price, note, color, accessories);
    setQuickViewProduct(null);
    setQuickViewInitialColor(undefined);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#333333] flex flex-col font-sans selection:bg-[#E8C7C8]/50 selection:text-[#333333]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <aside 
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#333333] text-[#F8F6F2] px-5 py-3.5 border-l-4 border-[#D4AF37] shadow-xl text-xs uppercase tracking-wider animate-in slide-in-from-bottom duration-300"
        >
          <Check className="w-4 h-4 text-[#E8C7C8]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-3 underline text-[#E8C7C8] hover:text-[#D4AF37] cursor-pointer"
          >
            View Bag
          </button>
        </aside>
      )}

      {/* 5. Navigation: Sticky Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleScrollToSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onShopNow={() => handleScrollToSection('shop')} />

        {/* 4. Product Columns */}
        <ProductGrid
          products={products}
          onAddToCart={(p, stems, price, color, accessories) => handleAddToCart(p, stems, price, '', color, accessories)}
          onQuickView={(p, initialColor) => handleOpenQuickView(p, initialColor)}
          addedProductId={addedProductId}
        />

        {/* Studio Philosophy & Inspiration */}
        <StudioStory />

        {/* Botanical Care Ritual */}
        <FloralCareGuide />
      </main>

      {/* 5. Footer with 3 columns (About, Quick Links, Contact) & blush pink social icons */}
      <Footer onNavigate={handleScrollToSection} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick View & Customization Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        initialColor={quickViewInitialColor}
        onClose={() => {
          setQuickViewProduct(null);
          setQuickViewInitialColor(undefined);
        }}
        onAddToCart={(p, stems, price, note, color, accessories) => handleAddToCart(p, stems, price, note, color, accessories)}
        onDirectCheckout={handleDirectCheckoutFromModal}
      />

      {/* Checkout Modal with Calligraphy Card & Confirmation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => setCartItems([])}
      />

    </div>
  );
}
