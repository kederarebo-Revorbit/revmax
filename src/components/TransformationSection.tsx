import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Search, 
  Network, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { TRANSFORMATION_STEPS, TRANSFORMATION_METRIC_PILLARS } from '../data/caseStudiesData';

interface TransformationSectionProps {
  onOpenConsultation: () => void;
}

const STEP_ICONS: Record<string, React.ElementType> = {
  Search,
  Network,
  TrendingUp,
  Award,
  ShieldCheck
};

export const TransformationSection: React.FC<TransformationSectionProps> = ({ onOpenConsultation }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = TRANSFORMATION_STEPS[activeStepIndex];
  const StepIcon = STEP_ICONS[activeStep.iconName] || Search;

  return (
    <section id="methodology" className="py-24 bg-slate-50/60 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Verified Implementation Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How We Transform <span className="text-revmax-gradient">Hospitality Performance</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our structured, 5-stage commercial methodology is engineered to eliminate revenue leakage, build channel dominance, and sustain long-term profitability.
          </p>
        </div>

        {/* 4 Pillars Standards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TRANSFORMATION_METRIC_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#00D4FF] shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-2xl font-black text-[#0052FF] mb-1">
                {pillar.target}
              </div>
              <div className="text-xs uppercase font-bold text-slate-400 mb-3">
                {pillar.label}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive 5-Step Methodology Timeline Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF] block mb-1">
              Step-by-Step Implementation Flow
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The 5-Stage RevMax Framework
            </h3>
          </div>

          {/* Step Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
            {TRANSFORMATION_STEPS.map((s, index) => {
              const isSelected = activeStepIndex === index;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStepIndex(index)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-[#0052FF] shadow-sm ring-1 ring-[#0052FF]'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${isSelected ? 'bg-[#0052FF] text-white' : 'bg-slate-100 text-slate-600'}`}>
                      Stage 0{s.step}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{s.timeline}</span>
                  </div>
                  <div className={`text-xs font-bold truncate ${isSelected ? 'text-[#0052FF]' : 'text-slate-800'}`}>
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Showcase */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Scope & Deliverables */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0052FF] text-white flex items-center justify-center shadow-md">
                    <StepIcon className="w-6 h-6 text-[#00D4FF]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#0052FF] uppercase tracking-wider">
                      Stage 0{activeStep.step} • {activeStep.category} ({activeStep.timeline})
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {activeStep.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeStep.description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Stage Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStep.coreDeliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#0052FF] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Business Impact & Action */}
              <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#0052FF] block mb-1">
                    Operational Impact
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed mb-4">
                    {activeStep.businessImpact}
                  </p>
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    Implemented in close coordination with your front desk and reservations team.
                  </div>
                </div>

                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <span>Start with Step 1 Audit</span>
                  <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
