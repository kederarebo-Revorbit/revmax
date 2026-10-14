import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  BedDouble, 
  Palmtree, 
  Mountain, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { WHO_WE_HELP_DATA } from '../data/whoWeHelpData';
import { PropertyType } from '../types';

interface WhoWeHelpProps {
  onOpenConsultation: (propertyType?: string) => void;
}

const PROPERTY_ICONS: Record<PropertyType, React.ElementType> = {
  Hotels: Building2,
  Apartments: Home,
  Guesthouses: BedDouble,
  Resorts: Palmtree,
  Lodges: Mountain,
  'Independent Property Owners': UserCheck
};

export const WhoWeHelp: React.FC<WhoWeHelpProps> = ({ onOpenConsultation }) => {
  const [selectedType, setSelectedType] = useState<PropertyType>('Hotels');

  const currentAudience = WHO_WE_HELP_DATA.find((a) => a.type === selectedType) || WHO_WE_HELP_DATA[0];

  return (
    <section id="who-we-help" className="py-24 bg-slate-50/60 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Tailored Lodging Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Who We <span className="text-revmax-gradient">Help Scale</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every lodging asset has unique guest profiles, distribution hurdles, and pricing rhythms. Select your property type to explore our dedicated strategy:
          </p>
        </div>

        {/* Property Type Grid / Pill Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {WHO_WE_HELP_DATA.map((item) => {
            const Icon = PROPERTY_ICONS[item.type];
            const isSelected = selectedType === item.type;
            return (
              <button
                key={item.type}
                onClick={() => setSelectedType(item.type)}
                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2.5 transition-all text-center border cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#0052FF] shadow-lg shadow-blue-500/10 ring-2 ring-[#0052FF]/20 scale-102'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#0052FF] text-white' : 'bg-slate-100 text-[#0052FF]'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-[#0052FF]' : 'text-slate-700'}`}>
                  {item.type}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Property Detail Showcase */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0052FF] mb-1">
                Strategy Blueprint For:
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentAudience.tagline}
              </h3>
            </div>
            <button
              onClick={() => onOpenConsultation(currentAudience.type)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all self-start lg:self-center"
            >
              <span>Schedule {currentAudience.type} Advisory</span>
              <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
            </button>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-4xl">
            {currentAudience.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* The Challenges (5 cols) */}
            <div className="lg:col-span-5 bg-rose-50/50 p-6 rounded-xl border border-rose-200/80 space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Typical Revenue Roadblocks</span>
              </div>
              <ul className="space-y-3">
                {currentAudience.commonChallenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The RevMax Solution (4 cols) */}
            <div className="lg:col-span-4 bg-blue-50/50 p-6 rounded-xl border border-blue-200/80 space-y-4">
              <div className="flex items-center gap-2 text-[#0052FF] font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                <span>The RevMax Growth Solution</span>
              </div>
              <ul className="space-y-3">
                {currentAudience.revmaxSolutions.map((sol, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] mt-2 shrink-0" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Outcomes (3 cols) */}
            <div className="lg:col-span-3 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 rounded-xl border border-slate-700 shadow-md space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Target Metric Impact
              </div>
              <div className="space-y-4">
                {currentAudience.expectedImpact.map((imp, idx) => (
                  <div key={idx} className="border-b border-slate-700/80 last:border-0 pb-3 last:pb-0">
                    <div className="text-2xl font-black text-[#00D4FF] tracking-tight">
                      {imp.metric}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5 font-medium">
                      {imp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
