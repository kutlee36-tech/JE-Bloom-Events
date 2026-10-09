import React, { useState } from 'react';
import { Instagram, Facebook, PinIcon as Pinterest, Mail, Phone, MapPin, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer id="contact" className="bg-[#2B2B2B] text-[#F8F6F2] pt-16 pb-12 border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* 3 Columns Required: About, Quick Links, Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Column 1: About */}
          <div>
            <h3 className="font-serif text-2xl tracking-tight text-[#F8F6F2] mb-4">
              Bloom &amp; Grace
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-4">
              Artisanal Floral Atelier
            </p>
            <p className="text-sm text-[#CCCCCC] leading-relaxed font-light mb-6">
              A bespoke botanical design studio crafting poetic floral arrangements, editorial wedding florals, and timeless botanical gifts. We marry intentional design with organic natural beauty.
            </p>
            
            {/* Social media icons styled in blush pink (#E8C7C8) */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/jeblooms_events?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-[#E8C7C8]/40 flex items-center justify-center text-[#E8C7C8] hover:bg-[#E8C7C8] hover:text-[#333333] transition-colors duration-200"
              >
                <Instagram className="w-4 h-4 stroke-[1.8]" />
              </a>
              <a
                href="https://wa.me/27623125656"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/5 border border-[#E8C7C8]/40 flex items-center justify-center text-[#E8C7C8] hover:bg-[#E8C7C8] hover:text-[#333333] transition-colors duration-200"
              >
                <Phone className="w-4 h-4 stroke-[1.8]" />
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-white/5 border border-[#E8C7C8]/40 flex items-center justify-center text-[#E8C7C8] hover:bg-[#E8C7C8] hover:text-[#333333] transition-colors duration-200"
              >
                <Pinterest className="w-4 h-4 stroke-[1.8]" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-[#E8C7C8]/40 flex items-center justify-center text-[#E8C7C8] hover:bg-[#E8C7C8] hover:text-[#333333] transition-colors duration-200"
              >
                <Facebook className="w-4 h-4 stroke-[1.8]" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg tracking-wide text-[#F8F6F2] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-[#CCCCCC]">
              <li>
                <a
                  href="#shop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('shop');
                  }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8C7C8]" />
                  <span>Signature Arrangements</span>
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('shop');
                  }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8C7C8]" />
                  <span>Vase Collections</span>
                </a>
              </li>
              <li>
                <a
                  href="#atelier"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('atelier');
                  }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8C7C8]" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="#care"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('care');
                  }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8C7C8]" />
                  <span>Botanical Care Ritual</span>
                </a>
              </li>
              <li>
                <a
                  href="#weddings"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8C7C8]" />
                  <span>Weddings &amp; Private Installations</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-serif text-lg tracking-wide text-[#F8F6F2] mb-5">
              Contact &amp; Atelier
            </h4>
            
            <div className="space-y-4 text-sm text-[#CCCCCC] mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E8C7C8] shrink-0 mt-1" />
                <span>74 St. George’s Grove, Atelier 4B, Gardens, Cape Town &amp; Johannesburg</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E8C7C8] shrink-0" />
                <a
                  href="https://wa.me/27623125656"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  WhatsApp: 062 312 5656
                </a>
              </div>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <label htmlFor="newsletter-email" className="block text-xs uppercase tracking-wider text-[#D4AF37]">
                Studio Gazettes &amp; Fresh Invocations
              </label>
              <div className="flex items-stretch">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 text-[#F8F6F2] placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] text-[#2B2B2B] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  {isSubscribed ? <Check className="w-4 h-4" /> : 'Join'}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] text-[#E8C7C8] mt-1">Thank you for joining our inner floral circle.</p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Trust markers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#999999] gap-4">
          <p>© {new Date().getFullYear()} Bloom &amp; Grace Floral Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Handmade floral styling</span>
            <span className="text-[#E8C7C8]">·</span>
            <span>Zero synthetic floral foam</span>
            <span className="text-[#E8C7C8]">·</span>
            <span>Secure Checkout</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
