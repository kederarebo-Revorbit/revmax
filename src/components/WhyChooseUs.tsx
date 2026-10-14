import React from 'react';
import { 
  Building2, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  Globe2, 
  Check, 
  ArrowRight,
  Shield,
  Sparkles
} from 'lucide-react';
import { WHY_CHOOSE_PILLARS } from '../data/testimonialsData';

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

const ICONS = [
  Building2,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Globe2
];

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenConsultation }) => {
  return (
    <section id="why-us" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            The RevMax Competitive Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Accommodation Leaders <span className="text-revmax-gradient">Choose RevMax</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Most digital agencies treat hotels like retail shops. We understand length of stay, day-of-week patterns, OTA search algorithms, and the discipline of Revenue Management.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {WHY_CHOOSE_PILLARS.map((pillar, index) => {
            const Icon = ICONS[index] || ShieldCheck;
            return (
              <div
                key={pillar.title}
                className="group relative bg-white hover:bg-slate-50/80 p-7 rounded-2xl border border-slate-200 hover:border-[#00D4FF] shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0052FF] group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    Pillar 0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0052FF] transition-colors mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-[#0052FF] font-bold">
                  <Check className="w-4 h-4 text-[#00D4FF]" />
                  <span>Verified Operational Discipline</span>
                </div>
              </div>
            );
          })}

          {/* 6th Feature Card: The RevMax Commitment */}
          <div className="bg-gradient-to-br from-[#0052FF] via-[#0047df] to-[#0038b3] text-white p-7 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00D4FF] mb-3">
                <Sparkles className="w-4 h-4" />
                Our Partner Commitment
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">
                Zero Fluff. Pure Commercial Results.
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-4">
                We embed directly into your commercial workflow. When your revenue, ADR, and guest satisfaction expand, our partnership thrives.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#0052FF] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Partner With Us Today</span>
              <ArrowRight className="w-4 h-4 text-[#0052FF]" />
            </button>
          </div>
        </div>

        {/* Comparison: RevMax vs General Agencies vs Doing It Alone */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 text-center">
            How RevMax Compares to Traditional Alternatives
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3 px-4 uppercase font-bold">Commercial Capability</th>
                  <th className="py-3 px-4 uppercase font-extrabold text-[#0052FF] bg-blue-100/60 rounded-t-lg">RevMax Hospitality</th>
                  <th className="py-3 px-4 uppercase font-bold">Generic Marketing Agency</th>
                  <th className="py-3 px-4 uppercase font-bold">Unassisted In-House</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">OTA Extranet Deep Knowledge</td>
                  <td className="py-3.5 px-4 font-bold text-[#0052FF] bg-blue-50/60">Expert (Booking, Expedia, Agoda)</td>
                  <td className="py-3.5 px-4 text-slate-500">None (Focus only on social ads)</td>
                  <td className="py-3.5 px-4 text-slate-500">Basic or overwhelmed</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Dynamic Pricing & Yield Rules</td>
                  <td className="py-3.5 px-4 font-bold text-[#0052FF] bg-blue-50/60">Active Daily Adjustments</td>
                  <td className="py-3.5 px-4 text-slate-500">No revenue management capability</td>
                  <td className="py-3.5 px-4 text-slate-500">Static seasonal rates</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Rate Parity Enforcement</td>
                  <td className="py-3.5 px-4 font-bold text-[#0052FF] bg-blue-50/60">Continuous Leakage Auditing</td>
                  <td className="py-3.5 px-4 text-slate-500">Ignored</td>
                  <td className="py-3.5 px-4 text-slate-500">Severe parity breaches</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Review & Reputation Workflows</td>
                  <td className="py-3.5 px-4 font-bold text-[#0052FF] bg-blue-50/60">Structured OTA & Google Strategy</td>
                  <td className="py-3.5 px-4 text-slate-500">Passive social media comments only</td>
                  <td className="py-3.5 px-4 text-slate-500">Slow or defensive responses</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Physical Office & Local Market</td>
                  <td className="py-3.5 px-4 font-bold text-[#0052FF] bg-blue-50/60">Addis Ababa HQ + Global OTAs</td>
                  <td className="py-3.5 px-4 text-slate-500">Remote offshore or unspecialized</td>
                  <td className="py-3.5 px-4 text-slate-500">Local but limited tools</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
