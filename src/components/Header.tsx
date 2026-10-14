import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { RevMaxLogo } from './RevMaxLogo';

interface HeaderProps {
  onOpenConsultation: (service?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Who We Help', href: '#who-we-help' },
    { label: 'Calculators', href: '#calculators' },
    { label: 'Why RevMax', href: '#why-us' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Standards', href: '#standards' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3' 
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official RevMax Logo */}
          <a href="#" className="flex items-center group">
            <RevMaxLogo size="md" variant="light-bg" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase font-bold tracking-wider text-slate-700 hover:text-[#0052FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/251985447873?text=Hello%20RevMax%20Team%2C%20I%20would%20like%20to%20inquire%20about%20hospitality%20management%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 hover:border-[#00D4FF] transition-all"
              title="Chat with RevMax on WhatsApp"
            >
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenConsultation()}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-[#0052FF] text-white text-xs font-bold"
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-black border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0052FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <a
              href="https://wa.me/251985447873"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#0052FF]" />
              <span>WhatsApp: +251 985 447 873</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#0052FF] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
