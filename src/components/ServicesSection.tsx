import React, { useState } from 'react';
import { 
  SERVICES_DATA 
} from '../data/servicesData';
import { ServiceItem } from '../types';
import { 
  Globe, 
  LayoutDashboard, 
  TrendingUp, 
  Network, 
  Compass, 
  Award, 
  Sparkles, 
  Megaphone, 
  FileSearch, 
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  X,
  Layers
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  LayoutDashboard,
  TrendingUp,
  Network,
  Compass,
  Award,
  Sparkles,
  Megaphone,
  FileSearch,
  GraduationCap
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = ['All', 'OTA & Distribution', 'Revenue Strategy', 'Consulting & Brand', 'Audits & Training'];

  const filteredServices = activeFilter === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeFilter);

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Full-Spectrum Hospitality Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our 10 Core <span className="text-revmax-gradient">Hospitality Services</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From new OTA onboarding to daily dynamic yield management and commercial staff coaching, we cover every lever of lodging profitability.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#0052FF] text-white shadow-md shadow-blue-500/20 scale-102'
                    : 'bg-slate-100 text-slate-700 hover:text-black hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid (10 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Globe;
            return (
              <div
                key={service.id}
                className="group relative bg-white hover:bg-slate-50/70 rounded-2xl border border-slate-200 hover:border-[#00D4FF] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  {/* Top Header: Number and Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-[#0052FF] border border-blue-200">
                      0{service.number}. {service.category}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0052FF] group-hover:scale-110 group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0052FF] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs font-bold text-[#0052FF] mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Subservices Checklist */}
                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                      Included Capabilities:
                    </span>
                    <ul className="space-y-1.5">
                      {service.subServices.map((sub, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0052FF] shrink-0 mt-0.5" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-200 text-center transition-all cursor-pointer"
                  >
                    View Deliverables
                  </button>
                  <button
                    onClick={() => onOpenConsultation(service.title)}
                    className="py-2.5 px-3.5 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
                    title={`Inquire about ${service.title}`}
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Consultation Banner under services */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-sky-50 border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-extrabold text-slate-900">
              Not sure which service fits your current property stage?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              We provide a complimentary 40-point OTA & distribution audit to identify your biggest revenue leaks first.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation('Comprehensive Diagnostic Audit')}
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
          >
            Claim Free Audit & Diagnostic
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-black hover:bg-slate-200 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge & Title */}
            <div className="text-xs font-bold text-[#0052FF] uppercase tracking-wider mb-1">
              Service 0{selectedService.number} • {selectedService.category}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              {selectedService.title}
            </h3>
            <p className="text-sm text-[#0052FF] font-semibold mb-4">
              {selectedService.tagline}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {selectedService.description}
            </p>

            {/* Sub-services breakdown */}
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                Key Components:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.subServices.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tangible Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0052FF] mb-3">
                Tangible RevMax Deliverables:
              </h4>
              <ul className="space-y-2">
                {selectedService.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0052FF] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Benefits */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
                Commercial Benefits:
              </h4>
              <ul className="space-y-1.5">
                {selectedService.benefits.map((ben, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenConsultation(title);
                }}
                className="flex-1 py-3 px-6 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request {selectedService.title}</span>
                <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="py-3 px-6 rounded-xl bg-slate-100 text-slate-700 hover:text-black text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
