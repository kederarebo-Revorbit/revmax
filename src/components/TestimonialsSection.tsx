import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Scale, 
  MapPin, 
  CheckCircle2, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { SERVICE_COMMITMENTS } from '../data/testimonialsData';

const ICONS: Record<string, React.ElementType> = {
  Clock,
  ShieldCheck,
  Scale,
  MapPin
};

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="standards" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Integrity & Operational Standards
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Operational <span className="text-revmax-gradient">Commitments</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Transparent, reliable, and strictly professional. Here is what you can always rely on when partnering with RevMax Digital Hospitality:
          </p>
        </div>

        {/* 4 Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {SERVICE_COMMITMENTS.map((item) => {
            const Icon = ICONS[item.iconName] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="bg-slate-50/70 hover:bg-blue-50/40 rounded-2xl border border-slate-200 hover:border-[#00D4FF] p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0052FF] group-hover:bg-[#0052FF] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold text-[#0052FF] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                      {item.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0052FF] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                  <span>Standard: {item.commitment}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy & Financial Integrity Guarantee Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-[#00D4FF]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                100% Financial & Banking Independence
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                All OTA guest payments, virtual credit cards, and bank transfers flow directly to your property’s official bank account. RevMax never touches your guest revenues.
              </p>
            </div>
          </div>
          <span className="whitespace-nowrap px-4 py-2 rounded-xl bg-[#00D4FF] text-slate-900 font-extrabold text-xs uppercase tracking-wider">
            Direct Owner Payouts
          </span>
        </div>

      </div>
    </section>
  );
};
