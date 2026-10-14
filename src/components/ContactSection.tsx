import React, { useState } from 'react';
import { 
  Phone, 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ContactInquiry } from '../types';

interface ContactSectionProps {
  initialService?: string;
  initialPropertyType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialService = '', 
  initialPropertyType = '' 
}) => {
  const [formData, setFormData] = useState<ContactInquiry>({
    fullName: '',
    phone: '',
    email: '',
    propertyName: '',
    propertyType: initialPropertyType || 'Hotels',
    roomCount: '',
    serviceInterest: initialService || 'OTA Setup for New Properties',
    message: '',
    preferredContactMethod: 'whatsapp'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hello RevMax Hospitality!
I would like to schedule a consultation / request an audit:
- Name: ${formData.fullName || 'Property Owner'}
- Property: ${formData.propertyName || 'Hotel / Apartments'} (${formData.propertyType})
- Units / Keys: ${formData.roomCount || 'N/A'}
- Service: ${formData.serviceInterest}
- Contact: ${formData.phone} | ${formData.email}
- Details: ${formData.message || 'Please review our property revenue and OTA setup.'}`;
    return `https://wa.me/251985447873?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-24 bg-slate-50/70 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-[#0052FF]" />
            Direct Communication & Booking
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Connect with <span className="text-revmax-gradient">RevMax Hospitality</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Ready to increase your bookings, fix rate parity, and elevate your property’s online standing? Reach our commercial desk directly or send us an inquiry below.
          </p>
        </div>

        {/* Contact Info Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/251985447873?text=Hello%20RevMax%20Hospitality%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#25D366] transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#25D366] mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-bold text-slate-400">Instant Chat</div>
              <div className="text-base font-bold text-slate-900 mt-1 group-hover:text-emerald-700">
                WhatsApp Us
              </div>
              <div className="text-sm font-mono text-[#25D366] font-bold mt-1">
                +251 985 447 873
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Replies within 15 minutes</span>
            </div>
          </a>

          {/* Telegram Card */}
          <a
            href="https://t.me/+251910680141"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#229ED9] transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#229ED9] mb-4 group-hover:scale-110 transition-transform">
                <Send className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-bold text-slate-400">Direct Messenger</div>
              <div className="text-base font-bold text-slate-900 mt-1 group-hover:text-sky-700">
                Telegram Desk
              </div>
              <div className="text-sm font-mono text-[#229ED9] font-bold mt-1">
                +251 910 680 141
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              <span>Fast direct messaging</span>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:kederarebo@gmail.com?subject=RevMax%20Hospitality%20Consultation%20Inquiry"
            className="bg-white hover:bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#0052FF] transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0052FF] mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-bold text-slate-400">Formal Inquiries</div>
              <div className="text-base font-bold text-slate-900 mt-1 group-hover:text-[#0052FF]">
                Official Email
              </div>
              <div className="text-xs font-mono text-slate-700 font-bold mt-1 break-all">
                kederarebo@gmail.com
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              <span>Detailed RFPs & Proposals</span>
            </div>
          </a>

          {/* Physical Location Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-4">
                <MapPin className="w-5 h-5 text-[#0052FF]" />
              </div>
              <div className="text-xs uppercase font-bold text-slate-400">Office Location</div>
              <div className="text-base font-bold text-slate-900 mt-1">
                Kazanchis, Tito Street
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Addis Ababa, Ethiopia
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#0052FF]" />
              <span>Mon - Sat: 8:30 AM - 6:30 PM</span>
            </div>
          </div>

        </div>

        {/* Main Consultation Request Form & Map Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0052FF] mb-1">
                  <Calendar className="w-4 h-4" />
                  Free 30-Minute Consultation & Audit
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Schedule Your Property Review
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Fill in your property details below. Our hospitality director will review your online footprint and contact you within 2 hours.
                </p>
              </div>

              {submitted ? (
                <div className="bg-blue-50/60 p-8 rounded-2xl border border-blue-200 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {formData.fullName || 'Partner'}. Our team is preparing your preliminary {formData.propertyType} audit.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all"
                    >
                      <span>Send via WhatsApp Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:text-black hover:bg-slate-200"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Keder Arebo"
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 985 447 873"
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="manager@yourproperty.com"
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Property Name & Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.propertyName}
                        onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                        placeholder="e.g. Kazanchis Residency, Addis Ababa"
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Property Category
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                      >
                        <option value="Hotels">Hotel (City / Boutique)</option>
                        <option value="Apartments">Serviced Apartments</option>
                        <option value="Guesthouses">Guesthouse / B&B</option>
                        <option value="Resorts">Resort / Retreat</option>
                        <option value="Lodges">Eco-Lodge / Safari Camp</option>
                        <option value="Independent Property Owners">Independent Owner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Number of Keys / Units
                      </label>
                      <input
                        type="text"
                        value={formData.roomCount}
                        onChange={(e) => setFormData({ ...formData, roomCount: e.target.value })}
                        placeholder="e.g. 24 rooms"
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Channel
                      </label>
                      <select
                        value={formData.preferredContactMethod}
                        onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value as any })}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                      >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telegram">Telegram</option>
                        <option value="phone">Phone Call</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Service Focus
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-[#0052FF] focus:outline-none"
                    >
                      <option value="OTA Setup for New Properties">1. OTA Setup for New Properties</option>
                      <option value="Daily OTA Management">2. Daily OTA Management</option>
                      <option value="Revenue Management & Dynamic Pricing">3. Revenue Management & Dynamic Pricing</option>
                      <option value="Distribution & Rate Parity Management">4. Distribution Management</option>
                      <option value="Hotel & Apartment Commercial Consulting">5. Hotel & Apartment Consulting</option>
                      <option value="Guest Review & Reputation Management">6. Reputation Management</option>
                      <option value="Hospitality Branding & Direct Booking Website">7. Branding & Digital Presence</option>
                      <option value="Hospitality Digital Marketing & Ads">8. Digital Marketing</option>
                      <option value="Comprehensive 40-Point Hospitality Audit">9. Hospitality Audits</option>
                      <option value="Team Revenue & Reservations Training">10. Training & Coaching</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Notes / Current Challenges (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Need assistance setting up Booking.com and Expedia, or auditing our channel rate parity."
                      className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:border-[#0052FF] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <span>Submit & Schedule Free Consultation</span>
                          <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Location & Desk Info (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Addis Ababa Location Card */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF]">
                    Headquarters
                  </span>
                  <span className="text-xs bg-white text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200 font-bold">
                    Addis Ababa, Ethiopia
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900">
                  Kazanchis Commercial Hub
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Located on Tito Street in Kazanchis, within minutes of diplomatic missions, UNECA, and prime international business hotels.
                </p>

                {/* Stylized Visual Location Map Blueprint */}
                <div className="w-full h-44 rounded-xl bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white p-4 relative overflow-hidden flex flex-col justify-between shadow-md">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4FF]/20 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-mono text-[10px]">9.0192° N, 38.7610° E</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Desk Active
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0052FF] text-white flex items-center justify-center font-bold shadow-md">
                      <Building2 className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">RevMax Digital Hospitality</div>
                      <div className="text-[11px] text-slate-300">Tito Street, Kazanchis</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2 font-medium">
                    <span>In-person meetings by appointment</span>
                    <span className="text-[#00D4FF] font-bold">Kazanchis</span>
                  </div>
                </div>
              </div>

              {/* Direct Access Quick Actions */}
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-2xl border border-blue-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0052FF]">
                  <Sparkles className="w-4 h-4" />
                  Direct Founder & Desk Access
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need immediate assistance with an urgent OTA issue, overbooking conflict, or room rate setup? Connect directly:
                </p>
                <div className="pt-1 flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://wa.me/251985447873"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Desk</span>
                  </a>
                  <a
                    href="https://t.me/+251910680141"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#229ED9] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram Desk</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
