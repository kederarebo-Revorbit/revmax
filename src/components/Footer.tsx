import React from 'react';
import { Phone, Mail, MapPin, Send, ArrowUp } from 'lucide-react';
import { RevMaxLogo } from './RevMaxLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <RevMaxLogo size="md" variant="dark-bg" />

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Helping Hotels & Apartments Grow Revenue, Visibility, and Profitability through dynamic yield management, distribution integrity, and digital marketing.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00D4FF] shrink-0" />
                <span>Kazanchis, Tito Street, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>WhatsApp: +251 985 447 873</span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-[#229ED9] shrink-0" />
                <span>Telegram: +251 910 680 141</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00D4FF] shrink-0" />
                <span>Email: kederarebo@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">OTA Setup for New Properties</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">Daily OTA Management</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">Revenue Management & ADR</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">Distribution & Parity</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">Reputation Management</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">Hospitality Audits & Training</a></li>
            </ul>
          </div>

          {/* Who We Help */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Accommodations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#who-we-help" className="hover:text-[#00D4FF] transition-colors">Boutique & City Hotels</a></li>
              <li><a href="#who-we-help" className="hover:text-[#00D4FF] transition-colors">Serviced Apartments</a></li>
              <li><a href="#who-we-help" className="hover:text-[#00D4FF] transition-colors">Guesthouses & B&Bs</a></li>
              <li><a href="#who-we-help" className="hover:text-[#00D4FF] transition-colors">Wellness Resorts & Retreats</a></li>
              <li><a href="#who-we-help" className="hover:text-[#00D4FF] transition-colors">Eco-Lodges & Safari Camps</a></li>
              <li><a href="#who-we-help" className="hover:text-[#00D4FF] transition-colors">Independent Property Owners</a></li>
            </ul>
          </div>

          {/* Hospitality Calculators */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Calculators
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#calculators" className="hover:text-[#00D4FF] transition-colors">ADR Calculator</a></li>
              <li><a href="#calculators" className="hover:text-[#00D4FF] transition-colors">Occupancy % Calculator</a></li>
              <li><a href="#calculators" className="hover:text-[#00D4FF] transition-colors">RevPAR Yield Calculator</a></li>
              <li><a href="#calculators" className="hover:text-[#00D4FF] transition-colors">Birr (ETB) Exchange Calculator</a></li>
              <li><a href="#calculators" className="hover:text-[#00D4FF] transition-colors">Rate Parity Checker</a></li>
              <li><a href="#calculators" className="hover:text-[#00D4FF] transition-colors">Revenue Opportunity Tool</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} RevMax Digital Hospitality. All rights reserved. Kazanchis, Addis Ababa, Ethiopia.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">
              Hotel & Apartment Commercial Partner
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-[#00D4FF] hover:bg-slate-700 transition-all cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
