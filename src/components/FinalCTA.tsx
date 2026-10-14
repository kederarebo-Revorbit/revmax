import React from 'react';
import { Calendar, ArrowRight, Phone, Sparkles, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onOpenConsultation: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/40 to-sky-50/50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Elevate Your Property’s Bottom Line
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
          Ready to Increase Your <span className="text-revmax-gradient">Bookings and Revenue?</span>
        </h2>

        <p className="text-slate-600 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          Partner with RevMax Digital Hospitality to unlock your full OTA potential, eliminate rate parity leaks, and achieve sustained RevPAR growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/25 active:scale-95 transition-all cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-[#00D4FF]" />
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#00D4FF]" />
          </button>

          <a
            href="https://wa.me/251985447873?text=Hello%20RevMax%20Team%2C%20I%20am%20ready%20to%20schedule%20a%20consultation%20for%20my%20property."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 hover:border-[#00D4FF] flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Us (+251 985 447 873)</span>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
            No Obligation Preliminary Audit
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
            Strict Financial Confidentiality
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
            Tailored Implementation Roadmap
          </span>
        </div>

      </div>
    </section>
  );
};
