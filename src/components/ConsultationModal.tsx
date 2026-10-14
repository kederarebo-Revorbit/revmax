import React, { useState } from 'react';
import { X, Calendar, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RevMaxLogo } from './RevMaxLogo';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledPropertyType?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefilledService = '',
  prefilledPropertyType = ''
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState(prefilledPropertyType || 'Hotels');
  const [service, setService] = useState(prefilledService || 'Revenue Management & OTA Strategy');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = `Hello RevMax Hospitality!
I would like to schedule a Consultation:
- Name: ${fullName || 'Property Owner'}
- Property: ${propertyName || 'Property'} (${propertyType})
- Service: ${service}
- Contact: ${phone} | ${email}`;
    return `https://wa.me/251985447873?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-black hover:bg-slate-200 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Consultation Scheduled!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Thank you, {fullName}. Our commercial advisory team will reach out to you within 2 hours.
            </p>

            <div className="pt-4 space-y-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Confirm on WhatsApp Instantly</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <RevMaxLogo size="sm" variant="light-bg" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0052FF] mb-1">
              <Calendar className="w-3.5 h-3.5" />
              Complimentary Advisory Session
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
              Book Free Hospitality Consultation
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Discuss your OTA positioning, pricing structure, and distribution health with RevMax specialists.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Keder Arebo"
                  className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 985 447 873"
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kederarebo@gmail.com"
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Property Name
                  </label>
                  <input
                    type="text"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    placeholder="e.g. Kazanchis Luxury Suites"
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                  >
                    <option value="Hotels">Hotels</option>
                    <option value="Apartments">Serviced Apartments</option>
                    <option value="Guesthouses">Guesthouses</option>
                    <option value="Resorts">Resorts</option>
                    <option value="Lodges">Lodges</option>
                    <option value="Independent Property Owners">Independent Owner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Service of Interest
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                >
                  <option value="OTA Setup for New Properties">OTA Setup for New Properties</option>
                  <option value="Daily OTA Management">Daily OTA Management</option>
                  <option value="Revenue Management & Dynamic Pricing">Revenue Management</option>
                  <option value="Distribution & Rate Parity Management">Distribution Management</option>
                  <option value="Hotel & Apartment Commercial Consulting">Hotel & Apartment Consulting</option>
                  <option value="Guest Review & Reputation Management">Reputation Management</option>
                  <option value="Hospitality Branding & Website">Branding & Digital Presence</option>
                  <option value="Hospitality Digital Marketing">Digital Marketing</option>
                  <option value="Hospitality Diagnostic Audit">Hospitality Audits</option>
                  <option value="Staff Training & Coaching">Training & Coaching</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Free Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
