import React from 'react';
import { Flower2, Calendar, Gem } from 'lucide-react';
import heroImage from '../assets/images/regenerated_image_1791467436659.png';

interface HeroProps {
  onShopNow: () => void;
}

const HERO_BANNER = heroImage;

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section 
      id="home" 
      className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex items-center overflow-hidden bg-[#FAF7F2]"
      style={{ 
        marginLeft: '5px',
        marginRight: '-15px',
        marginTop: '1px',
      }}
    >
      {/* Right Half: Image positioned starting from the middle of the page, blending smoothly from the center */}
      <div className="absolute right-0 top-0 bottom-0 left-1/2 w-1/2 z-0 overflow-hidden pointer-events-none">
        <img
          src={HERO_BANNER}
          alt="JE Blooms & Events bespoke peach satin bouquet with tiara and crystal monogram"
          className="w-full h-full object-cover object-center select-none"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 12%, black 28%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 12%, black 28%)',
          }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('regenerated_image_1791467436659.png')) {
              target.src = '/regenerated_image_1791467436659.png';
            }
          }}
        />

        {/* Seamless blend gradient starting right from the middle of the page */}
        <div 
          className="absolute inset-y-0 left-0 w-20 sm:w-32 lg:w-44 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/50 to-transparent z-10 pointer-events-none" 
          aria-hidden="true"
        />

        {/* Soft edge feathering top & bottom for high-end editorial finish */}
        <div 
          className="absolute inset-x-0 top-0 h-12 sm:h-20 bg-gradient-to-b from-[#FAF7F2]/40 to-transparent z-10 pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-14 sm:h-20 bg-gradient-to-t from-[#FAF7F2] to-transparent z-10 pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      {/* Main Content Container on the left */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24"
        style={{
          marginLeft: '35px',
          marginTop: '-98px',
          marginBottom: '-156px',
        }}
      >
        <div className="max-w-xl lg:max-w-2xl text-left">
          
          {/* Top Brand Tag with flanking lines */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 sm:w-12 h-[1px] bg-[#B8976C]" />
            <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#B8976C] font-semibold">
              JE BLOOMS &amp; EVENTS
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#B8976C]" />
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.1rem] text-[#1A1A1A] tracking-normal leading-[1.12] mb-5 font-normal">
            Beautiful Blooms,<br />
            Unforgettable Moments
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-[#4A4A4A] max-w-lg mb-8 leading-relaxed font-sans font-light">
            We create elegant floral arrangements, bespoke bouquets and stunning event décor for life’s most special occasions.
          </p>
        </div>

        {/* Enlarged, Ultra-Luxurious SHOP NOW Button placed in the middle of the page */}
        <div className="w-full flex justify-center items-center my-8 sm:my-10">
          <button
            onClick={onShopNow}
            style={{
              paddingTop: '28px',
              marginTop: '-20px',
            }}
            className="group relative inline-flex items-center justify-center gap-4 sm:gap-6 px-12 sm:px-20 py-4.5 sm:py-5.5 bg-[#161616] text-[#FAF7F2] uppercase tracking-[0.32em] font-medium transition-all duration-500 shadow-2xl hover:shadow-[0_20px_45px_rgba(184,151,108,0.35)] border border-[#B8976C] hover:bg-[#B8976C] hover:text-[#161616] hover:border-[#B8976C] cursor-pointer"
          >
            {/* Haute Couture jewelry box inner gold frame */}
            <span className="absolute inset-1.5 border border-[#B8976C]/60 pointer-events-none group-hover:border-[#161616]/30 transition-colors duration-500" />
            
            <span className="relative z-10 font-serif tracking-[0.32em] font-medium text-sm sm:text-base">
              SHOP NOW
            </span>
            <span className="relative z-10 text-base sm:text-lg font-serif text-[#B8976C] group-hover:text-[#161616] transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </button>
        </div>

        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Bottom 3 Feature Highlights with gold icons */}
          <div className="mt-6 sm:mt-8 pt-8 border-t border-[#B8976C]/30 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 max-w-xl">
            {/* Feature 1: Custom Floral Arrangements */}
            <div className="flex items-center gap-3">
              <Flower2 className="w-5 h-5 text-[#B8976C] shrink-0 stroke-[1.6]" />
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#2D2D2D] leading-tight">
                CUSTOM FLORAL<br />ARRANGEMENTS
              </div>
            </div>

            {/* Feature 2: Event Decor & Styling */}
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#B8976C] shrink-0 stroke-[1.6]" />
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#2D2D2D] leading-tight">
                EVENT DECOR<br />&amp; STYLING
              </div>
            </div>

            {/* Feature 3: Bespoke Bouquets & Gift Sets */}
            <div className="flex items-center gap-3">
              <Gem className="w-5 h-5 text-[#B8976C] shrink-0 stroke-[1.6]" />
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#2D2D2D] leading-tight">
                BESPOKE BOUQUETS<br />&amp; GIFT SETS
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
