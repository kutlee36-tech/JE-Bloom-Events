import React, { useState } from 'react';
import { FloralProduct, OccasionFilter, ColorOption, AccessoryItem } from '../types';
import { OCCASIONS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, Flower2, Clock } from 'lucide-react';

interface ProductGridProps {
  products: FloralProduct[];
  onAddToCart: (product: FloralProduct, stems?: number, price?: number, color?: ColorOption, accessories?: AccessoryItem[]) => void;
  onQuickView: (product: FloralProduct, initialColor?: ColorOption) => void;
  addedProductId: string | null;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onQuickView,
  addedProductId,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Occasion display mapping (exact shopping occasion strings)
  const occasionLabels: Record<OccasionFilter, string> = {
    'NEW ARRIVALS': 'NEW ARRIVALS',
    'ALL': 'ALL',
    'FOR HER': 'FOR HER',
    'BIRTHDAYS': 'BIRTHDAYS',
    'WEDDINGS': 'WEDDINGS',
    'HAPPY MOTHERS DAY': 'HAPPY MOTHERS DAY',
    'ROMANCE': 'ROMANCE',
  };

  // Calculate counts for each occasion
  const getOccasionCount = (occ: OccasionFilter) => {
    if (occ === 'ALL') return products.length;
    return products.filter((p) => p.occasions?.includes(occ) || (occ === 'NEW ARRIVALS' && p.isNewArrival)).length;
  };

  const filteredProducts = products.filter((p) => {
    // Occasion filter
    const matchesOccasion =
      selectedOccasion === 'ALL' ||
      (selectedOccasion === 'NEW ARRIVALS' && (p.isNewArrival || p.occasions?.includes('NEW ARRIVALS'))) ||
      p.occasions?.includes(selectedOccasion);

    // Search query
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stems.some((stem) => stem.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesOccasion && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <section id="shop" className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E8C7C8]/40 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
            The Botanical Catalog
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#333333]">
            Curated Flower Arrangements
          </h2>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#333333]/40" />
            <input
              type="text"
              placeholder="Search florals, roses, vase..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs bg-white/70 border border-[#E8C7C8]/60 text-[#333333] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#D4AF37] w-48 sm:w-56"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs bg-white/70 border border-[#E8C7C8]/60 text-[#333333] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="featured">Sort: Atelier Curated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Unified Catalog Layout:
          The left vertical navigation stands still (sticky) while scrolling the catalogue page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10 items-stretch border-b border-[#E8C7C8]/40 pb-16">
        
        {/* ========================================================
            LEFT VERTICAL NAVIGATION — Stands still while scrolling
           ======================================================== */}
        <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#E8C7C8]/40 pr-0 lg:pr-8 pb-10 lg:pb-0 relative">
          <div className="sticky top-24 lg:top-28 z-20 space-y-8">
            
            {/* 1. Primary Occasion Navigation */}
            <div>
              <div className="pb-3 mb-4 border-b border-[#E8C7C8]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                    Curated Occasions
                  </span>
                  <h3 className="text-base font-serif text-[#333333] tracking-wide mt-0.5">
                    Shop by Occasion
                  </h3>
                </div>
                <Flower2 className="w-4 h-4 text-[#E8C7C8]" />
              </div>

              {/* Occasion List */}
              <nav className="flex flex-col space-y-1" aria-label="Shopping Occasions">
                {OCCASIONS.map((occ) => {
                  const isActive = selectedOccasion === occ;
                  const count = getOccasionCount(occ);
                  return (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`group w-full flex items-center justify-between py-2.5 px-3 text-xs tracking-wider transition-all duration-200 text-left cursor-pointer ${
                        isActive
                          ? 'border-l-2 border-[#D4AF37] bg-white text-[#333333] font-bold shadow-xs pl-4'
                          : 'border-l-2 border-transparent text-[#666666] hover:text-[#333333] hover:bg-white/60 hover:pl-4'
                      }`}
                    >
                      <span className="uppercase font-medium">
                        {occasionLabels[occ]}
                      </span>
                      <span className={`text-[11px] tabular-nums ${isActive ? 'text-[#D4AF37] font-bold' : 'text-[#999999]'}`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Atelier Dispatch Guarantee */}
            <div className="pt-6 border-t border-[#E8C7C8]/40 text-xs text-[#666666] space-y-3">
              <div className="p-4 bg-white/50 border border-[#E8C7C8]/50">
                <p className="font-serif text-[#333333] font-medium text-xs mb-1">
                  Atelier Dispatch Guarantee
                </p>
                <p className="text-[11px] text-[#777777] leading-relaxed">
                  Morning-conditioned stems shipped in thermal water wraps. Complimentary handwritten wax-sealed stationery with every order.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#888888]">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Same-day orders cutoff: 14:00</span>
              </div>
            </div>

          </div>
        </aside>

        {/* ========================================================
            RIGHT AREA — Product Columns Grid
           ======================================================== */}
        <div className="lg:col-span-9 pl-0 lg:pl-2 pt-6 lg:pt-0">
          {/* Active Filter Indicator & Count Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8C7C8]/30 text-xs text-[#666666]">
            <div className="flex items-center gap-2">
              <span className="uppercase tracking-widest text-[#333333] font-semibold">
                Viewing:
              </span>
              <span className="text-[#D4AF37] font-medium tracking-wider uppercase">
                {occasionLabels[selectedOccasion]}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="tabular-nums">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'arrangement' : 'arrangements'}
              </span>
              {(selectedOccasion !== 'ALL' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedOccasion('ALL');
                    setSearchQuery('');
                  }}
                  className="text-[11px] uppercase tracking-wider text-[#D4AF37] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Product Cards Grid - Enlarged columns for bigger imagery */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white/40 border border-dashed border-[#E8C7C8] p-8">
              <p className="font-serif text-xl text-[#333333]">No arrangements found for {occasionLabels[selectedOccasion]}.</p>
              <p className="text-xs text-[#777777] mt-2">Try clearing your filters or selecting "ALL" occasions.</p>
              <button
                onClick={() => {
                  setSelectedOccasion('ALL');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2 text-xs uppercase tracking-wider bg-[#333333] text-[#F8F6F2] hover:bg-[#D4AF37] hover:text-[#333333] transition-colors"
              >
                View All Occasions
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  isAdded={addedProductId === product.id}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
