import React, { useState, useRef, useEffect } from 'react';
import { FloralProduct, ColorOption, AccessoryItem } from '../types';
import { ACCESSORIES } from '../data/accessories';
import { STEM_PRICING_TIERS } from '../data/products';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: FloralProduct | null;
  initialColor?: ColorOption;
  onClose: () => void;
  onAddToCart: (product: FloralProduct, stems?: number, price?: number, note?: string, color?: ColorOption, accessories?: AccessoryItem[]) => void;
  onDirectCheckout?: (product: FloralProduct, stems?: number, price?: number, note?: string, color?: ColorOption, accessories?: AccessoryItem[]) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialColor,
  onClose,
  onAddToCart,
  onDirectCheckout,
}) => {
  const hasStemOptions = !!(product?.stemOptions && product.stemOptions.length > 0);
  const [selectedStems, setSelectedStems] = useState<number>(
    hasStemOptions ? product!.stemOptions![0] : 18
  );

  const hasColorOptions = !!(product?.colorOptions && product.colorOptions.length > 0);
  const [selectedColor, setSelectedColor] = useState<ColorOption | undefined>(
    initialColor || (hasColorOptions ? product!.colorOptions![0] : undefined)
  );

  const [selectedAccessories, setSelectedAccessories] = useState<AccessoryItem[]>([]);

  const toggleAccessory = (acc: AccessoryItem) => {
    setSelectedAccessories(prev =>
      prev.some(a => a.id === acc.id)
        ? prev.filter(a => a.id !== acc.id)
        : [...prev, acc]
    );
  };

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [giftNote, setGiftNote] = useState('');
  const [showNoteField, setShowNoteField] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync state when product or initialColor changes
  useEffect(() => {
    if (product) {
      setSelectedAccessories([]);
      if (initialColor) {
        setSelectedColor(initialColor);
        const idx = (product.images || [product.image]).findIndex(img => img === initialColor.image);
        if (idx !== -1) {
          setTimeout(() => scrollToModalImage(idx), 50);
        }
      } else if (product.colorOptions && product.colorOptions.length > 0) {
        setSelectedColor(product.colorOptions[0]);
      }
    }
  }, [product, initialColor]);

  if (!product) return null;

  const imageList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const baseStemPrice = hasStemOptions && selectedStems 
    ? (STEM_PRICING_TIERS[selectedStems] ?? product.price) 
    : product.price;

  const accessoriesTotal = selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);

  const finalPrice = baseStemPrice + accessoriesTotal;

  const handleAdd = () => {
    onAddToCart(
      product, 
      hasStemOptions ? selectedStems : undefined, 
      finalPrice, 
      giftNote,
      hasColorOptions ? selectedColor : undefined,
      selectedAccessories
    );
    onClose();
  };

  const handleCheckout = () => {
    if (onDirectCheckout) {
      onDirectCheckout(
        product,
        hasStemOptions ? selectedStems : undefined,
        finalPrice,
        giftNote,
        hasColorOptions ? selectedColor : undefined,
        selectedAccessories
      );
    } else {
      handleAdd();
    }
    onClose();
  };

  const scrollToModalImage = (idx: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: idx * width,
        behavior: 'smooth',
      });
      setActiveImageIdx(idx);
      if (hasColorOptions && product.colorOptions && product.colorOptions[idx]) {
        setSelectedColor(product.colorOptions[idx]);
      }
    }
  };

  const handleModalColorSelect = (c: ColorOption) => {
    setSelectedColor(c);
    const idx = imageList.findIndex((img) => img === c.image);
    if (idx !== -1) {
      scrollToModalImage(idx);
    } else {
      const optIdx = product.colorOptions?.findIndex((opt) => opt.id === c.id) ?? -1;
      if (optIdx !== -1 && optIdx < imageList.length) {
        scrollToModalImage(optIdx);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#F8F6F2] border border-[#E8C7C8] shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#F8F6F2]/80 hover:bg-[#E8C7C8]/40 text-[#333333] transition-colors cursor-pointer border border-[#E8C7C8]/60"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image with left-to-right scroll */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-[#EFECE6] border-b md:border-b-0 md:border-r border-[#E8C7C8]/40 overflow-hidden flex flex-col justify-between">
            <div 
              ref={scrollRef}
              onScroll={() => {
                if (scrollRef.current) {
                  const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
                  setActiveImageIdx(idx);
                }
              }}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {imageList.map((imgSrc, idx) => (
                <div key={idx} className="shrink-0 w-full h-full snap-center relative overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                    style={idx === 1 ? { marginTop: '-64px' } : undefined}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/src/assets/images/')) {
                        target.src = `/src/assets/images${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Left/Right Controls in Modal */}
            {imageList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => scrollToModalImage(Math.max(0, activeImageIdx - 1))}
                  disabled={activeImageIdx === 0}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center text-[#333333] border border-[#E8C7C8] shadow-md cursor-pointer ${
                    activeImageIdx === 0 ? 'opacity-0 pointer-events-none' : 'opacity-90'
                  }`}
                  aria-label="Previous view"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToModalImage(Math.min(imageList.length - 1, activeImageIdx + 1))}
                  disabled={activeImageIdx === imageList.length - 1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center text-[#333333] border border-[#E8C7C8] shadow-md cursor-pointer ${
                    activeImageIdx === imageList.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-90'
                  }`}
                  aria-label="Next view"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Thumbnails list at bottom */}
            {imageList.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2 p-1.5 bg-black/40 backdrop-blur-xs rounded-md">
                {imageList.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToModalImage(idx)}
                    className={`w-10 h-10 overflow-hidden border transition-all cursor-pointer ${
                      activeImageIdx === idx ? 'border-[#D4AF37] scale-105' : 'border-white/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Contiguous Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                {product.category}
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-[#333333] mb-3 uppercase tracking-wider">
                {product.name.toUpperCase()}
              </h2>
              
              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#333333] tabular-nums">
                  R{finalPrice.toLocaleString()}
                </span>
                <span className="text-xs text-[#777777] uppercase tracking-wider">
                  {hasStemOptions ? `${selectedStems} Roses Selection` : 'Signature Atelier Arrangement'}
                  {accessoriesTotal > 0 && ` (+R${accessoriesTotal.toLocaleString()} accessories)`}
                </span>
              </div>

              {/* Botanical Anatomy */}
              <div className="mb-6 p-4 bg-white/60 border border-[#E8C7C8]/50">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#333333] mb-2">
                  Botanical Composition
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs text-[#555555]">
                  {product.stems.map((stem, idx) => (
                    <span key={stem}>
                      {stem}
                      {idx < product.stems.length - 1 && <span className="mx-1 text-[#E8C7C8]">·</span>}
                    </span>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#E8C7C8]/30 flex items-center justify-between text-xs text-[#666666]">
                  <span>Dimensions: {product.dimensions}</span>
                  <span className="font-medium text-[#333333]">Vase Curation: {product.vaseType || (product.includesVase ? 'Signature Structured Box' : 'Hand-tied with Silk Ribbon')}</span>
                </div>
              </div>

              {/* ADDITIONAL ACCESSORIES Section */}
              <div className="mb-6 p-4 bg-white/70 border border-[#E8C7C8]/70">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#333333]">
                    ADDITIONAL ACCESSORIES
                  </span>
                  {selectedAccessories.length > 0 && (
                    <span className="text-[11px] text-[#D4AF37] font-bold tabular-nums">
                      +{selectedAccessories.length} selected
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {ACCESSORIES.map((acc) => {
                    const isSelected = selectedAccessories.some((a) => a.id === acc.id);
                    return (
                      <label
                        key={acc.id}
                        className={`flex items-center justify-between p-2 text-xs border transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'bg-[#333333] text-[#F8F6F2] border-[#333333]'
                            : 'bg-white/90 text-[#444444] border-[#E8C7C8]/50 hover:border-[#D4AF37]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleAccessory(acc)}
                            className="w-3.5 h-3.5 accent-[#D4AF37] cursor-pointer"
                          />
                          <span className="text-[11px] font-medium tracking-wide">
                            {acc.name}
                          </span>
                        </div>
                        <span className={`text-[11px] font-bold tabular-nums shrink-0 ml-2 ${
                          isSelected ? 'text-[#D4AF37]' : 'text-[#333333]'
                        }`}>
                          {acc.priceLabel}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Colour Selection (under purse bouquet / in the arrangement) */}
              {hasColorOptions && (
                <div className="mb-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold">
                      Arrangement Colour Selection
                    </label>
                    {selectedColor && (
                      <span className="text-xs text-[#D4AF37] font-medium tracking-wide">
                        Selected: {selectedColor.name}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {product.colorOptions!.map((c) => {
                      const isSelected = selectedColor?.id === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleModalColorSelect(c)}
                          className={`py-2.5 px-3 text-xs uppercase tracking-wider border transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                            isSelected
                              ? 'border-[#333333] bg-[#333333] text-[#F8F6F2] font-semibold shadow-xs'
                              : 'border-[#E8C7C8]/80 bg-white/70 text-[#444444] hover:bg-[#E8C7C8]/25 hover:border-[#333333]'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border transition-transform ${
                              isSelected ? 'border-white scale-110 shadow-xs' : 'border-black/25'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="font-bold text-[11px]">{c.name}</span>
                          <span className="text-[10px] opacity-75 font-mono">{c.hex}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stem Count Selection */}
              {hasStemOptions && (
                <div className="mb-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold">
                      Stem Count Selection
                    </label>
                    {selectedStems && (
                      <span className="text-xs text-[#D4AF37] font-semibold tracking-wide">
                        Selected: {selectedStems} ROSES · R{(STEM_PRICING_TIERS[selectedStems] ?? 260).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                    {product.stemOptions!.map((stems) => {
                      const tierPrice = STEM_PRICING_TIERS[stems] ?? 260;
                      const isSelected = selectedStems === stems;
                      return (
                        <button
                          key={stems}
                          type="button"
                          onClick={() => setSelectedStems(stems)}
                          className={`py-2 px-2.5 text-xs uppercase tracking-wider border transition-all cursor-pointer flex flex-col items-center justify-center ${
                            isSelected
                              ? 'border-[#333333] bg-[#333333] text-[#F8F6F2] font-semibold shadow-xs'
                              : 'border-[#E8C7C8]/70 bg-white/70 text-[#555555] hover:bg-[#E8C7C8]/25 hover:border-[#333333]'
                          }`}
                        >
                          <div className="font-bold text-[11px] sm:text-xs tracking-wider">
                            {stems} ROSES
                          </div>
                          <div className={`text-[11px] tabular-nums font-semibold mt-0.5 ${
                            isSelected ? 'text-[#D4AF37]' : 'text-[#333333]'
                          }`}>
                            R{tierPrice.toLocaleString()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Complimentary Gift Card Message */}
              <div className="mb-6">
                {!showNoteField ? (
                  <button
                    onClick={() => setShowNoteField(true)}
                    className="text-xs text-[#333333] hover:text-[#D4AF37] underline underline-offset-4 tracking-wide cursor-pointer"
                  >
                    + Add complimentary handwritten card message
                  </button>
                ) : (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#333333] font-semibold mb-1">
                      Calligraphy Gift Message (Complimentary)
                    </label>
                    <textarea
                      rows={2}
                      maxLength={180}
                      placeholder="e.g. Wishing you a season of grace and joy..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/80 border border-[#E8C7C8] text-[#333333] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <div className="text-[10px] text-[#777777] text-right">
                      {180 - giftNote.length} characters left
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: "Add to Bag" with "Check Out" directly underneath */}
            <div className="pt-4 border-t border-[#E8C7C8]/50 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3.5 px-6 bg-[#333333] text-[#F8F6F2] text-xs uppercase tracking-[0.2em] font-bold border border-[#333333] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#333333] transition-all cursor-pointer text-center"
              >
                Add to Bag · R{finalPrice.toLocaleString()}{hasColorOptions && selectedColor ? ` · ${selectedColor.name}` : ''}
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md text-center"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Check Out</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
