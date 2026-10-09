import React, { useState, useRef } from 'react';
import { FloralProduct, ColorOption } from '../types';
import { Check, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: FloralProduct;
  onAddToCart: (product: FloralProduct, stems?: number, price?: number, color?: ColorOption) => void;
  onQuickView: (product: FloralProduct, initialColor?: ColorOption) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isAdded = false,
}) => {
  const hasStemOptions = !!(product.stemOptions && product.stemOptions.length > 0);
  const hasColorOptions = !!(product.colorOptions && product.colorOptions.length > 0);
  const [selectedColor, setSelectedColor] = useState<ColorOption | undefined>(
    hasColorOptions ? product.colorOptions![0] : undefined
  );

  const imageList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveIndex(index);
        if (hasColorOptions && product.colorOptions && product.colorOptions[index]) {
          setSelectedColor(product.colorOptions[index]);
        }
      }
    }
  };

  const scrollToImage = (idx: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: idx * width,
        behavior: 'smooth',
      });
      setActiveIndex(idx);
      if (hasColorOptions && product.colorOptions && product.colorOptions[idx]) {
        setSelectedColor(product.colorOptions[idx]);
      }
    }
  };

  const handleColorSelect = (c: ColorOption) => {
    setSelectedColor(c);
    const imgIdx = imageList.findIndex((img) => img === c.image);
    if (imgIdx !== -1) {
      scrollToImage(imgIdx);
    } else {
      const optIdx = product.colorOptions?.findIndex((opt) => opt.id === c.id) ?? -1;
      if (optIdx !== -1 && optIdx < imageList.length) {
        scrollToImage(optIdx);
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToImage(nextIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = Math.min(imageList.length - 1, activeIndex + 1);
    scrollToImage(nextIdx);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const currentPrice = product.price;

  return (
    <article className="group flex flex-col bg-transparent transition-all duration-300">
      {/* 1. Image at the top with left-to-right horizontal scroll + subtle shadow */}
      <div 
        className="relative aspect-[4/3] md:aspect-[1/1] w-full overflow-hidden bg-[#F2EFE9] border border-[#E8C7C8]/40 shadow-sm transition-shadow duration-300 group-hover:shadow-xl select-none"
        onClick={() => {
          if (!hasDragged) {
            onQuickView(product, selectedColor);
          }
        }}
      >
        {/* Horizontal scroll track: scrollable from left to right */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {imageList.map((imgSrc, idx) => (
            <div 
              key={`${product.id}-img-${idx}`} 
              className="shrink-0 w-full h-full snap-center relative pointer-events-none"
            >
              <img
                src={imgSrc}
                alt={`${product.name} - view ${idx + 1}`}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                referrerPolicy="no-referrer"
                loading="lazy"
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

        {/* Left Arrow (Scroll Left) */}
        {imageList.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className={`absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#333333] hover:bg-white hover:text-[#D4AF37] transition-all border border-[#E8C7C8]/70 shadow-md cursor-pointer ${
              activeIndex === 0 ? 'opacity-30 pointer-events-none' : 'opacity-80 group-hover:opacity-100'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>
        )}

        {/* Right Arrow (Scroll Right) */}
        {imageList.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#333333] hover:bg-white hover:text-[#D4AF37] transition-all border border-[#E8C7C8]/70 shadow-md cursor-pointer ${
              activeIndex === imageList.length - 1 ? 'opacity-30 pointer-events-none' : 'opacity-80 group-hover:opacity-100'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>
        )}

        {/* Bottom Pagination Dots */}
        {imageList.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-xs rounded-full">
            {imageList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToImage(dotIdx);
                }}
                className={`transition-all rounded-full cursor-pointer ${
                  activeIndex === dotIdx
                    ? 'w-4 h-1.5 bg-[#D4AF37]'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`View image ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Subtle quick view overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product, selectedColor);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-[#F8F6F2]/90 backdrop-blur-xs text-[#333333] hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#E8C7C8]/50 shadow-xs cursor-pointer"
          title="Quick look at stems"
          aria-label={`View details for ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Price directly below the image */}
      <div className="mt-4 flex flex-col gap-0.5">
        <span className="text-xs text-[#888888] font-normal tracking-wide">
          from:
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-xl md:text-2xl font-bold text-[#333333] tabular-nums tracking-tight">
            R{product.price.toLocaleString()}
          </span>
          {hasColorOptions && selectedColor ? (
            <span className="text-xs text-[#333333]/50 tracking-wider uppercase font-medium">
              · {selectedColor.name} Edition
            </span>
          ) : product.includesVase ? (
            <span className="text-xs text-[#333333]/50 tracking-wider uppercase font-medium">
              · Includes Signature Box
            </span>
          ) : null}
        </div>

        {/* Colour Selection (under purse bouquet / in the arrangement) */}
        {hasColorOptions && (
          <div className="flex flex-col gap-1.5 pt-1.5">
            <span className="text-[11px] text-[#777777] uppercase tracking-wider font-semibold">
              Arrangement Colour:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {product.colorOptions!.map((c) => {
                const isSelected = selectedColor?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColorSelect(c);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#333333] bg-[#333333] text-[#F8F6F2] font-semibold shadow-xs'
                        : 'border-[#E8C7C8]/80 bg-white/80 text-[#444444] hover:bg-[#E8C7C8]/30 hover:border-[#333333]'
                    }`}
                    title={`${c.name} (${c.hex})`}
                    aria-label={`Select ${c.name} (${c.hex}) colour`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full shrink-0 border transition-transform ${
                        isSelected ? 'border-white scale-110 shadow-xs' : 'border-black/25'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[11px] tracking-wider uppercase font-medium">
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. Product name and features underneath (description removed as requested) */}
      <div className="mt-3 flex-1">
        <h3 
          className="text-xl md:text-2xl font-serif text-[#333333] group-hover:text-[#D4AF37] transition-colors cursor-pointer tracking-wider uppercase"
          onClick={() => onQuickView(product, selectedColor)}
        >
          {product.name.toUpperCase()}
        </h3>

        {/* Features left as they are */}
        <p className="mt-2 text-xs md:text-sm text-[#666666] italic tracking-wide">
          Features: {product.stems.join(', ')}
        </p>
      </div>

      {/* 4. “Add to Bag” button opens configuration modal to select stems and vase curation */}
      <div className="mt-5 text-left">
        <button
          onClick={() => onQuickView(product, selectedColor)}
          className={`inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-bold border transition-all duration-200 cursor-pointer ${
            isAdded
              ? 'bg-[#E8C7C8] text-[#333333] border-[#E8C7C8]'
              : 'bg-[#333333] text-[#F8F6F2] border-[#333333] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#333333]'
          }`}
          aria-label={`Configure and add ${product.name} to bag`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Bag</span>
            </>
          ) : (
            <span>Add to Bag</span>
          )}
        </button>
      </div>
    </article>
  );
};
