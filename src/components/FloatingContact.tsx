import React, { useState } from 'react';
import { Phone, Send, MessageSquare, X } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Expanded quick buttons */}
      {open && (
        <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xl space-y-2 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-200 min-w-[210px]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-1 border-b border-slate-100">
            Quick Commercial Desk
          </div>

          <a
            href="https://wa.me/251985447873?text=Hello%20RevMax%20Hospitality%2C%20I%20have%20an%20inquiry%20regarding%20our%20hotel%2Fapartment."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#25D366] flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-900 font-bold">WhatsApp</div>
              <div className="text-[10px] text-emerald-600 font-bold">+251 985 447 873</div>
            </div>
          </a>

          <a
            href="https://t.me/+251910680141"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-[#229ED9] flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-900 font-bold">Telegram</div>
              <div className="text-[10px] text-sky-600 font-bold">+251 910 680 141</div>
            </div>
          </a>
        </div>
      )}

      {/* Main floating trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-13 h-13 rounded-full bg-[#0052FF] hover:bg-[#0042cc] text-white flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all relative border-2 border-white cursor-pointer"
        aria-label="Contact RevMax"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#00D4FF] rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
};
