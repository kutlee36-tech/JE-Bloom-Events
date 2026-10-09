import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Clock } from 'lucide-react';

export const StudioStory: React.FC = () => {
  return (
    <section id="atelier" className="py-24 bg-[#F2EFE9] border-y border-[#E8C7C8]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Vignette */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] overflow-hidden border border-[#E8C7C8]/60 shadow-md">
              <img
                src="/src/assets/images/hero_flower_arrangement_1791286563747.jpg"
                alt="Florist crafting bespoke bouquet"
                className="w-full h-full object-cover filter contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Soft decorative offset frame */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-52 p-4 bg-[#F8F6F2] border border-[#E8C7C8] shadow-md text-center">
              <p className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold">
                WhatsApp Atelier
              </p>
              <a
                href="https://wa.me/27623125656"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-sm text-[#333333] mt-1 font-bold hover:text-[#D4AF37] block transition-colors"
              >
                062 312 5656
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Atelier Philosophy */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-3">
              About Us · The Bloom &amp; Grace Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#333333] leading-tight mb-6">
              Sculptural Florals Inspired by Organic Imperfection
            </h2>
            <p className="text-base text-[#555555] font-light leading-relaxed mb-6">
              Inspired by the fine-art European floristry movement and natural wild landscapes, Bloom &amp; Grace was founded on a simple truth: flowers should feel alive, poetic, and intimate. We deliberately reject rigid supermarket bundles in favor of flowing silhouettes, heirloom blooms, and textural botanical branches.
            </p>
            <p className="text-sm text-[#666666] leading-relaxed mb-10">
              Each stem is conditioned in our temperature-controlled studio, bound by hand with raw silk or organic linen, and accompanied by customized handwritten wax-sealed stationery.
            </p>

            {/* Core Values Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8C7C8]/50">
              <div>
                <h4 className="font-serif text-lg text-[#333333] mb-1">Seasonal Sourcing</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Partnering directly with local ethical cultivators to harvest blooms at peak vitality.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#333333] mb-1">Bespoke Vessels</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Curated matte ceramics, fluted stoneware, and vintage urns designed to last forever.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#333333] mb-1">WhatsApp Concierge</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Direct atelier consultations &amp; custom bookings via WhatsApp:{' '}
                  <a
                    href="https://wa.me/27623125656"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#333333] hover:text-[#D4AF37] underline underline-offset-2"
                  >
                    062 312 5656
                  </a>.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
