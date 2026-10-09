import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Left: Monogram Logo & Brand Name */}
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="group inline-flex items-center gap-3 text-[#1A1A1A] hover:opacity-90 transition-opacity"
        >
          {/* JE Monogram Logo */}
          <div className="h-10 sm:h-11 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/je_logo.png" 
              alt="JE Blooms & Events Logo" 
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>
          
          <span className="font-serif tracking-[0.25em] uppercase text-sm md:text-base font-medium text-[#1A1A1A]">
            BLOOMS &amp; EVENTS
          </span>
        </a>

        {/* Center: Navigation Links matching reference */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs tracking-[0.2em] uppercase font-semibold text-[#2D2D2D]">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="text-[#1A1A1A] relative py-1.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B8976C] transition-colors"
          >
            HOME
          </a>
          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('shop');
            }}
            className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors relative py-1.5 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#B8976C]"
          >
            COLLECTIONS
          </a>
          <a
            href="#atelier"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('atelier');
            }}
            className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors relative py-1.5 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#B8976C]"
          >
            OUR SERVICES
          </a>
          <a
            href="#atelier"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('atelier');
            }}
            className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors relative py-1.5 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#B8976C]"
          >
            ABOUT US
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
            className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors relative py-1.5 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#B8976C]"
          >
            CONTACT
          </a>
        </nav>

        {/* Right: Search and Bag with badge count */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#333333] hover:text-[#B8976C] transition-colors cursor-pointer"
            title="Search collections"
          >
            <Search className="w-4 h-4 stroke-[2]" />
            <span className="hidden sm:inline">SEARCH</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="flex items-center gap-2.5 text-[#333333] hover:text-[#B8976C] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold hidden sm:inline">
              BAG
            </span>
            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-[11px] font-bold rounded-full bg-[#EAD8CD] text-[#222222] tabular-nums shadow-2xs">
              {cartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
