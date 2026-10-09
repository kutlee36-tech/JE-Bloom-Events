import React from 'react';
import { Droplets, Scissors, Sun, Heart } from 'lucide-react';

export const FloralCareGuide: React.FC = () => {
  return (
    <section id="care" className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
          Preserving Radiance
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#333333]">
          The Botanical Care Ritual
        </h2>
        <p className="mt-3 text-sm text-[#666666] font-light">
          Simple daily steps to ensure your blooms unfurl gracefully and last up to 10–14 days.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="p-6 bg-white/60 border border-[#E8C7C8]/50 text-left">
          <div className="w-10 h-10 rounded-full bg-[#E8C7C8]/30 flex items-center justify-center mb-4 text-[#333333]">
            <Scissors className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="font-serif text-lg text-[#333333] mb-2">Angled Stem Trim</h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            Trim 2cm off the stem bases at a 45-degree angle under running water before placing into clean vessel water.
          </p>
        </div>

        <div className="p-6 bg-white/60 border border-[#E8C7C8]/50 text-left">
          <div className="w-10 h-10 rounded-full bg-[#E8C7C8]/30 flex items-center justify-center mb-4 text-[#333333]">
            <Droplets className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="font-serif text-lg text-[#333333] mb-2">Cool Water Refresh</h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            Replace vase water every 48 hours. Ensure foliage below water level is stripped to prevent bacterial clouding.
          </p>
        </div>

        <div className="p-6 bg-white/60 border border-[#E8C7C8]/50 text-left">
          <div className="w-10 h-10 rounded-full bg-[#E8C7C8]/30 flex items-center justify-center mb-4 text-[#333333]">
            <Sun className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="font-serif text-lg text-[#333333] mb-2">Gentle Placement</h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            Display away from harsh direct midday sunshine, drafty air conditioning vents, and ripening fruit bowls.
          </p>
        </div>

        <div className="p-6 bg-white/60 border border-[#E8C7C8]/50 text-left">
          <div className="w-10 h-10 rounded-full bg-[#E8C7C8]/30 flex items-center justify-center mb-4 text-[#333333]">
            <Heart className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="font-serif text-lg text-[#333333] mb-2">Everlasting Drying</h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            As petals mature, hang roses, hydrangeas, and grasses upside down in a dark room to preserve as an heirloom dried keepsake.
          </p>
        </div>
      </div>
    </section>
  );
};
