import React, { useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle, 
  Hotel, 
  Sparkles,
  Phone,
  BarChart3,
  Layers,
  Activity
} from 'lucide-react';
import { RevMaxLogo } from './RevMaxLogo';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [activeSimulation, setActiveSimulation] = useState<'high' | 'mid' | 'low'>('high');

  const simulationData = {
    high: {
      label: 'Peak & Event Demand',
      adrImpact: '+28% ADR Capture',
      occPace: '92% Peak Occupancy',
      strategy: 'Dynamic Length-of-Stay restrictions and peak pricing fences prevent premature cheap sell-outs.',
      trendPath: 'M 10 90 Q 40 80, 80 50 T 160 30 T 240 18 T 310 8'
    },
    mid: {
      label: 'Weekday Business Pace',
      adrImpact: '+18% Corporate Yield',
      occPace: '78% Sustained Pace',
      strategy: 'Tiered corporate rates and multi-channel availability maintain strong mid-week occupancy.',
      trendPath: 'M 10 90 Q 50 75, 100 60 T 180 48 T 250 38 T 310 28'
    },
    low: {
      label: 'Shoulder Season Strategy',
      adrImpact: '+35% Base Protection',
      occPace: '68% Floor Defense',
      strategy: 'Strategic OTA mobile promotions and long-stay packages defend cashflow without crashing ADR.',
      trendPath: 'M 10 90 Q 60 85, 120 72 T 200 62 T 270 52 T 310 44'
    }
  };

  const currentSim = simulationData[activeSimulation];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* Subtle modern mesh gradient background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-80 h-80 bg-[#0052FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-sm text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-ping" />
              <span className="text-xs font-bold text-[#0052FF] tracking-wider uppercase">
                REVMAX DIGITAL HOSPITALITY
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-600 font-medium">
                Addis Ababa & Global OTAs
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.14]">
              Grow Your Hotel or Apartment Revenue with{' '}
              <span className="text-revmax-gradient block sm:inline">
                Expert OTA & Revenue Management
              </span>{' '}
              Support
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Helping accommodation businesses increase bookings, improve visibility, optimize pricing, and strengthen their online presence.
            </p>

            {/* Tagline confirmation */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 font-semibold flex items-center justify-center lg:justify-start gap-2.5 max-w-xl">
              <div className="w-2 h-2 rounded-full bg-[#00D4FF]" />
              <span>Helping Hotels & Apartments Grow Revenue, Visibility, and Profitability.</span>
            </div>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-blue-500/25 active:scale-98 transition-all group"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#00D4FF]" />
              </button>

              <a
                href="https://wa.me/251985447873?text=Hello%20RevMax%20Hospitality%2C%20I%20would%20like%20to%20discuss%20my%20property%20revenue%20and%20OTA%20management."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 hover:border-[#00D4FF] flex items-center justify-center gap-2.5 shadow-sm transition-all"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
                <span>WhatsApp Us</span>
                <span className="text-xs text-slate-500 font-mono">+251 985 447 873</span>
              </a>
            </div>

            {/* Core Operational Checks */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-[#0052FF] shrink-0" />
                <span>Booking.com & Expedia Pro</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-[#00D4FF] shrink-0" />
                <span>Daily Dynamic Yield Desk</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-[#0052FF] shrink-0" />
                <span>Kazanchis, Addis Ababa HQ</span>
              </div>
            </div>

          </div>

          {/* Interactive Motion Graphic: Dynamic Yield & Revenue Simulator (Right 5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer soft glow border */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#0052FF]/20 via-[#00D4FF]/30 to-blue-200/40 blur-xl opacity-80" />

              {/* Main Card */}
              <div className="relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
                
                {/* Header of interactive graphic */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0052FF]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-extrabold text-[#0052FF]">
                        Interactive Yield Engine
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        Dynamic Revenue Simulation
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                    Live Matrix
                  </span>
                </div>

                {/* Scenario Tabs (Interactive) */}
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {(['high', 'mid', 'low'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSimulation(tab)}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                        activeSimulation === tab
                          ? 'bg-white text-[#0052FF] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab === 'high' ? 'High Demand' : tab === 'mid' ? 'Base Midweek' : 'Shoulder'}
                    </button>
                  ))}
                </div>

                {/* Motion Graphic SVG Trend Chart */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">{currentSim.label}</span>
                    <span className="font-extrabold text-[#0052FF]">{currentSim.adrImpact}</span>
                  </div>

                  {/* Dynamic SVG curve with animating ascending path */}
                  <div className="h-28 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 320 100">
                      {/* Grid background lines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="320" y2="50" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="320" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />

                      {/* Smooth trend curve */}
                      <path
                        d={currentSim.trendPath}
                        fill="none"
                        stroke="url(#blueCyanGradient)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                      />

                      {/* Spark dot at head of trend */}
                      <circle cx="310" cy={activeSimulation === 'high' ? 8 : activeSimulation === 'mid' ? 28 : 44} r="4.5" fill="#00D4FF" className="animate-pulse" />

                      <defs>
                        <linearGradient id="blueCyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0052FF" />
                          <stop offset="100%" stopColor="#00D4FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed italic border-t border-slate-200/60 pt-2">
                    {currentSim.strategy}
                  </p>
                </div>

                {/* Channels Managed */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="font-bold text-slate-800">OTA Channels Managed:</span>
                    <span className="text-[#0052FF] font-bold">100% Rate Parity</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
                      Booking.com
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
                      Airbnb Pro
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                      Expedia
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800">
                      Agoda YCS
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800">
                      Trip.com
                    </span>
                  </div>
                </div>

                {/* Quick Action in Card */}
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-[#0052FF] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <BarChart3 className="w-4 h-4 text-[#00D4FF]" />
                  <span>Request Free 40-Point Property Audit</span>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
