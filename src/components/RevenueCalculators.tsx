import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  Scale, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Copy,
  Check,
  ArrowLeftRight,
  Coins,
  RefreshCw,
  Receipt
} from 'lucide-react';

interface RevenueCalculatorsProps {
  onOpenConsultation: (prefilledService?: string) => void;
}

export const RevenueCalculators: React.FC<RevenueCalculatorsProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'adr' | 'occupancy' | 'revpar' | 'parity' | 'opportunity' | 'forex'>('opportunity');
  const [currency, setCurrency] = useState<'USD' | 'ETB'>('USD');
  const [copied, setCopied] = useState(false);
  const [forexCopied, setForexCopied] = useState(false);

  // --- Birr (ETB) Forex Calculator State ---
  const BASE_CURRENCIES = {
    USD: { code: 'USD', name: 'US Dollar', symbol: '$', fallbackRate: 161.5, flag: '🇺🇸' },
    EUR: { code: 'EUR', name: 'Euro', symbol: '€', fallbackRate: 180.4, flag: '🇪🇺' },
    GBP: { code: 'GBP', name: 'British Pound', symbol: '£', fallbackRate: 213.4, flag: '🇬🇧' },
    AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED ', fallbackRate: 44.0, flag: '🇦🇪' },
    SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR ', fallbackRate: 43.1, flag: '🇸🇦' },
    CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', fallbackRate: 24.1, flag: '🇨🇳' },
    CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', fallbackRate: 113.1, flag: '🇨🇦' },
  };

  type CurrencyCode = keyof typeof BASE_CURRENCIES;

  const [liveRates, setLiveRates] = useState<Record<CurrencyCode, number>>({
    USD: 161.5,
    EUR: 180.4,
    GBP: 213.4,
    AED: 44.0,
    SAR: 43.1,
    CNY: 24.1,
    CAD: 113.1,
  });

  const [lastUpdateDate, setLastUpdateDate] = useState<string>('Auto-updated today');
  const [nextUpdateDate, setNextUpdateDate] = useState<string>('Daily at 00:00 UTC');
  const [isUpdatingRates, setIsUpdatingRates] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [forexDirection, setForexDirection] = useState<'foreign_to_etb' | 'etb_to_foreign'>('foreign_to_etb');
  const [foreignAmount, setForeignAmount] = useState<number>(120);
  const [etbAmount, setEtbAmount] = useState<number>(19380);
  const [customRate, setCustomRate] = useState<number>(161.5);
  const [ratePreset, setRatePreset] = useState<'official' | 'hotel_desk' | 'custom'>('official');

  // Daily auto-update fetch function
  const fetchDailyExchangeRates = async (force: boolean = false) => {
    try {
      setIsUpdatingRates(true);

      // Check localStorage cache unless force refreshed
      const cached = localStorage.getItem('revmax_forex_daily_cache_v2');
      if (cached && !force) {
        try {
          const parsed = JSON.parse(cached);
          const cacheAgeMs = Date.now() - (parsed.timestamp || 0);
          const oneDayMs = 24 * 60 * 60 * 1000;

          // If cache is less than 24 hours old, use it
          if (cacheAgeMs < oneDayMs && parsed.rates) {
            setLiveRates(parsed.rates);
            if (parsed.lastUpdated) setLastUpdateDate(parsed.lastUpdated);
            if (parsed.nextUpdated) setNextUpdateDate(parsed.nextUpdated);
            setIsUpdatingRates(false);
            return;
          }
        } catch (e) {
          // ignore corrupted cache
        }
      }

      // Fetch fresh live rates from public exchange rate API
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error('Failed to fetch daily rates');
      const data = await res.json();

      if (data && data.rates && data.rates.ETB) {
        const etbPerUsd = Number(data.rates.ETB);
        const updated: Record<CurrencyCode, number> = {
          USD: Number(etbPerUsd.toFixed(2)),
          EUR: Number((etbPerUsd / (data.rates.EUR || 0.895)).toFixed(2)),
          GBP: Number((etbPerUsd / (data.rates.GBP || 0.756)).toFixed(2)),
          AED: Number((etbPerUsd / (data.rates.AED || 3.67)).toFixed(2)),
          SAR: Number((etbPerUsd / (data.rates.SAR || 3.75)).toFixed(2)),
          CNY: Number((etbPerUsd / (data.rates.CNY || 6.70)).toFixed(2)),
          CAD: Number((etbPerUsd / (data.rates.CAD || 1.42)).toFixed(2)),
        };

        const updateString = data.time_last_update_utc 
          ? new Date(data.time_last_update_utc).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const nextString = data.time_next_update_utc
          ? new Date(data.time_next_update_utc).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : 'Tomorrow';

        setLiveRates(updated);
        setLastUpdateDate(updateString);
        setNextUpdateDate(nextString);

        // Save to cache for today
        localStorage.setItem('revmax_forex_daily_cache_v2', JSON.stringify({
          rates: updated,
          lastUpdated: updateString,
          nextUpdated: nextString,
          timestamp: Date.now()
        }));
      }
    } catch (err) {
      console.warn('Using baseline daily exchange rates:', err);
    } finally {
      setIsUpdatingRates(false);
    }
  };

  // Auto-fetch on mount & set up daily check
  React.useEffect(() => {
    fetchDailyExchangeRates();

    // Check every hour if 24 hours have elapsed
    const interval = setInterval(() => {
      fetchDailyExchangeRates();
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Update custom rate input when currency changes
  React.useEffect(() => {
    if (ratePreset === 'official') {
      setCustomRate(liveRates[selectedCurrency]);
    }
  }, [selectedCurrency, liveRates, ratePreset]);

  // Hotel Desk spread (e.g. +2.5% service/cashier buffer)
  const baseSelectedRate = liveRates[selectedCurrency] || BASE_CURRENCIES[selectedCurrency].fallbackRate;
  const effectiveRate = ratePreset === 'official' 
    ? baseSelectedRate
    : ratePreset === 'hotel_desk' 
      ? Number((baseSelectedRate * 1.025).toFixed(2))
      : customRate;

  // OTA Reconciliation State in Forex Tool
  const [otaGrossAmount, setOtaGrossAmount] = useState<number>(1000);
  const [otaCommissionPct, setOtaCommissionPct] = useState<number>(18); // 18% standard
  const [includeTaxes, setIncludeTaxes] = useState<boolean>(false); // 10% SC + 15% VAT for Ethiopian hotel billing

  const copyForexResult = () => {
    const resultText = forexDirection === 'foreign_to_etb'
      ? `${BASE_CURRENCIES[selectedCurrency].symbol}${foreignAmount.toLocaleString()} ${BASE_CURRENCIES[selectedCurrency].code} = ETB ${(foreignAmount * effectiveRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Daily Rate: 1 ${selectedCurrency} = ${effectiveRate} ETB, Updated: ${lastUpdateDate}) - RevMax Hospitality`
      : `ETB ${etbAmount.toLocaleString()} = ${BASE_CURRENCIES[selectedCurrency].symbol}${(etbAmount / (effectiveRate || 1)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${BASE_CURRENCIES[selectedCurrency].code} (Daily Rate: 1 ${selectedCurrency} = ${effectiveRate} ETB, Updated: ${lastUpdateDate}) - RevMax Hospitality`;
    navigator.clipboard.writeText(resultText);
    setForexCopied(true);
    setTimeout(() => setForexCopied(false), 3000);
  };



  const currencySymbol = currency === 'USD' ? '$' : 'ETB ';

  // --- ADR Calculator State ---
  const [adrRevenue, setAdrRevenue] = useState<number>(14500);
  const [adrRoomsSold, setAdrRoomsSold] = useState<number>(160);
  const calculatedAdr = adrRoomsSold > 0 ? adrRevenue / adrRoomsSold : 0;

  // --- Occupancy Calculator State ---
  const [occRoomsSold, setOccRoomsSold] = useState<number>(540);
  const [occAvailableRooms, setOccAvailableRooms] = useState<number>(900);
  const calculatedOccupancy = occAvailableRooms > 0 ? (occRoomsSold / occAvailableRooms) * 100 : 0;

  // --- RevPAR Calculator State ---
  const [revparMethod, setRevparMethod] = useState<'direct' | 'adr-occ'>('adr-occ');
  const [revparTotalRevenue, setRevparTotalRevenue] = useState<number>(25000);
  const [revparTotalRoomsAvailable, setRevparTotalRoomsAvailable] = useState<number>(300);
  const [revparAdrInput, setRevparAdrInput] = useState<number>(95);
  const [revparOccInput, setRevparOccInput] = useState<number>(68);

  const calculatedRevPar = revparMethod === 'direct'
    ? (revparTotalRoomsAvailable > 0 ? revparTotalRevenue / revparTotalRoomsAvailable : 0)
    : (revparAdrInput * (revparOccInput / 100));

  // --- Rate Parity Checker State ---
  const [directRate, setDirectRate] = useState<number>(100);
  const [bookingComRate, setBookingComRate] = useState<number>(100);
  const [expediaRate, setExpediaRate] = useState<number>(92);
  const [agodaRate, setAgodaRate] = useState<number>(95);
  const otaCommissionRate = 18; // standard 18%

  // Parity checks
  const rates = [
    { name: 'Direct Website', rate: directRate, channel: 'direct' },
    { name: 'Booking.com', rate: bookingComRate, channel: 'ota' },
    { name: 'Expedia', rate: expediaRate, channel: 'ota' },
    { name: 'Agoda', rate: agodaRate, channel: 'ota' },
  ];
  const lowestRate = Math.min(...rates.map(r => r.rate));
  const hasParityLeak = lowestRate < directRate;
  const parityGap = directRate - lowestRate;

  // --- Revenue Opportunity Calculator State ---
  const [oppRooms, setOppRooms] = useState<number>(35);
  const [oppCurrentAdr, setOppCurrentAdr] = useState<number>(75);
  const [oppCurrentOcc, setOppCurrentOcc] = useState<number>(55);
  const [oppStrategy, setOppStrategy] = useState<'conservative' | 'balanced' | 'accelerated'>('balanced');

  const upliftMultipliers = {
    conservative: { occGain: 10, adrGainPercent: 8, label: 'Conservative Optimization' },
    balanced: { occGain: 15, adrGainPercent: 14, label: 'Balanced Yield Strategy' },
    accelerated: { occGain: 22, adrGainPercent: 20, label: 'Full Commercial Optimization' }
  };

  const currentMultiplier = upliftMultipliers[oppStrategy];
  const daysInMonth = 30.5;

  const currentAvailableRoomNights = oppRooms * daysInMonth;
  const currentRoomsSold = currentAvailableRoomNights * (oppCurrentOcc / 100);
  const currentMonthlyRevenue = currentRoomsSold * oppCurrentAdr;
  const currentAnnualRevenue = currentMonthlyRevenue * 12;

  const targetOcc = Math.min(95, oppCurrentOcc + currentMultiplier.occGain);
  const targetAdr = oppCurrentAdr * (1 + currentMultiplier.adrGainPercent / 100);
  const targetRoomsSold = currentAvailableRoomNights * (targetOcc / 100);
  const targetMonthlyRevenue = targetRoomsSold * targetAdr;
  const targetAnnualRevenue = targetMonthlyRevenue * 12;

  const monthlyGain = Math.max(0, targetMonthlyRevenue - currentMonthlyRevenue);
  const annualGain = Math.max(0, targetAnnualRevenue - currentAnnualRevenue);
  const revparCurrent = (oppCurrentAdr * oppCurrentOcc) / 100;
  const revparTarget = (targetAdr * targetOcc) / 100;
  const revparUpliftPct = revparCurrent > 0 ? ((revparTarget - revparCurrent) / revparCurrent) * 100 : 0;

  const copySnapshot = () => {
    const text = `RevMax Hospitality Revenue Estimate:
Property Scale: ${oppRooms} Rooms
Current Performance: ADR: ${currencySymbol}${oppCurrentAdr} | Occ: ${oppCurrentOcc}% | RevPAR: ${currencySymbol}${revparCurrent.toFixed(1)}
Target Performance (${currentMultiplier.label}): ADR: ${currencySymbol}${targetAdr.toFixed(1)} | Occ: ${targetOcc}% | RevPAR: ${currencySymbol}${revparTarget.toFixed(1)}
Estimated Monthly Opportunity: +${currencySymbol}${Math.round(monthlyGain).toLocaleString()}
Estimated Annual Opportunity: +${currencySymbol}${Math.round(annualGain).toLocaleString()} (+${revparUpliftPct.toFixed(1)}% RevPAR expansion)
Contact RevMax Digital Hospitality (WhatsApp: +251 985 447 873) for a tailored audit.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="calculators" className="py-24 bg-slate-50/70 relative border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4 text-[#0052FF]" />
            Hospitality Intelligence Tools
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Interactive <span className="text-revmax-gradient">Revenue Calculator</span> Suite
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Test your property’s commercial indicators. Calculate key metrics, evaluate rate parity across booking channels, and simulate potential revenue optimizations.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#0052FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('ETB')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'ETB'
                  ? 'bg-[#0052FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              ETB (Ethiopian Birr)
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {[
            { id: 'opportunity', label: 'Revenue Opportunity', icon: Sparkles },
            { id: 'forex', label: 'Birr (ETB) Exchange', icon: ArrowLeftRight },
            { id: 'adr', label: 'ADR Calculator', icon: DollarSign },
            { id: 'occupancy', label: 'Occupancy %', icon: Percent },
            { id: 'revpar', label: 'RevPAR Calculator', icon: TrendingUp },
            { id: 'parity', label: 'Rate Parity Checker', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0052FF] text-white shadow-lg shadow-blue-500/20 scale-102'
                    : 'bg-white text-slate-700 hover:text-black hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00D4FF]' : 'text-[#0052FF]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- CALCULATOR DISPLAY CONTENT --- */}

        {/* 1. REVENUE OPPORTUNITY CALCULATOR */}
        {activeTab === 'opportunity' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Controls (Left 6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider block mb-1">
                    Property Configuration
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Your Current Hotel / Apartment Scale
                  </h3>
                </div>

                {/* Total Rooms Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-slate-700 font-bold">Total Available Rooms / Units:</label>
                    <span className="text-base font-extrabold text-[#0052FF] bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                      {oppRooms} keys
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="1"
                    value={oppRooms}
                    onChange={(e) => setOppRooms(Number(e.target.value))}
                    className="w-full accent-[#0052FF] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>5 keys (Boutique/Apts)</span>
                    <span>75 keys (Midscale)</span>
                    <span>150 keys (Large Hotel)</span>
                  </div>
                </div>

                {/* Current ADR */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-slate-700 font-bold">Current Average Daily Rate (ADR):</label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-bold">{currencySymbol}</span>
                      <input
                        type="number"
                        min="10"
                        max="2000"
                        value={oppCurrentAdr}
                        onChange={(e) => setOppCurrentAdr(Math.max(1, Number(e.target.value)))}
                        className="w-24 text-right bg-slate-50 text-slate-900 font-bold px-2 py-1 rounded border border-slate-300 text-sm focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    step="5"
                    value={oppCurrentAdr}
                    onChange={(e) => setOppCurrentAdr(Number(e.target.value))}
                    className="w-full accent-[#0052FF] cursor-pointer"
                  />
                </div>

                {/* Current Occupancy % */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-slate-700 font-bold">Current Average Occupancy %:</label>
                    <span className="text-base font-extrabold text-[#0052FF] bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                      {oppCurrentOcc}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    step="1"
                    value={oppCurrentOcc}
                    onChange={(e) => setOppCurrentOcc(Number(e.target.value))}
                    className="w-full accent-[#0052FF] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>15% (Low base)</span>
                    <span>55% (Typical baseline)</span>
                    <span>90% (Sold out)</span>
                  </div>
                </div>

                {/* Strategy Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    RevMax Optimization Horizon:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['conservative', 'balanced', 'accelerated'] as const).map((strat) => (
                      <button
                        key={strat}
                        onClick={() => setOppStrategy(strat)}
                        className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                          oppStrategy === strat
                            ? 'bg-blue-50 border-2 border-[#0052FF] text-[#0052FF] shadow-sm'
                            : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-black'
                        }`}
                      >
                        <div className="capitalize">{strat}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-normal">
                          +{upliftMultipliers[strat].occGain}% Occ / +{upliftMultipliers[strat].adrGainPercent}% ADR
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Opportunity Results Card (Right 6 cols) */}
              <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl relative">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00D4FF] text-slate-900">
                    +{revparUpliftPct.toFixed(0)}% RevPAR Lift
                  </span>
                </div>

                <div className="text-xs uppercase font-bold tracking-wider text-[#00D4FF] mb-1">
                  Estimated Optimization Potential
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-6">
                  {currentMultiplier.label}
                </h4>

                {/* Big Metric Display */}
                <div className="bg-slate-800/90 p-5 rounded-xl border border-slate-700 mb-6">
                  <div className="text-xs text-slate-300 mb-1">Estimated Monthly Revenue Uplift</div>
                  <div className="text-3xl sm:text-4xl font-black text-[#00D4FF] tracking-tight">
                    +{currencySymbol}{Math.round(monthlyGain).toLocaleString()}
                    <span className="text-sm font-normal text-slate-300 ml-2">/ month</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-700">
                    <span>Annualized Growth:</span>
                    <span className="font-bold text-emerald-400">
                      +{currencySymbol}{Math.round(annualGain).toLocaleString()} / year
                    </span>
                  </div>
                </div>

                {/* Comparative Breakdown Table */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700 text-slate-300">
                    <span className="text-xs uppercase text-slate-400 font-bold">Metric</span>
                    <span className="text-xs uppercase text-slate-400 font-bold">Current</span>
                    <span className="text-xs uppercase text-[#00D4FF] font-bold">With RevMax</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-300">Occupancy</span>
                    <span className="text-slate-400">{oppCurrentOcc}%</span>
                    <span className="text-white font-bold">{targetOcc}%</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-300">Average Daily Rate (ADR)</span>
                    <span className="text-slate-400">{currencySymbol}{oppCurrentAdr}</span>
                    <span className="text-white font-bold">{currencySymbol}{Math.round(targetAdr)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-300">RevPAR</span>
                    <span className="text-slate-400">{currencySymbol}{revparCurrent.toFixed(1)}</span>
                    <span className="text-emerald-400 font-bold">{currencySymbol}{revparTarget.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 font-semibold">
                    <span className="text-slate-200">Monthly Gross Room Rev</span>
                    <span className="text-slate-400">{currencySymbol}{Math.round(currentMonthlyRevenue).toLocaleString()}</span>
                    <span className="text-[#00D4FF]">{currencySymbol}{Math.round(targetMonthlyRevenue).toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onOpenConsultation('Revenue Management')}
                    className="flex-1 bg-[#0052FF] hover:bg-[#0042cc] text-white font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <span>Claim Free Revenue Audit</span>
                    <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
                  </button>

                  <button
                    onClick={copySnapshot}
                    className="bg-slate-800 text-slate-200 hover:text-white px-4 py-3 rounded-xl text-xs font-bold border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    title="Copy calculation summary"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ETHIOPIAN BIRR (ETB) FOREX & CURRENCY EXCHANGE CALCULATOR */}
        {activeTab === 'forex' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-5 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-bold uppercase tracking-wider">
                  <Coins className="w-3.5 h-3.5" />
                  Hospitality Forex Desk • Addis Ababa
                </div>
                
                {/* Daily Auto-update Status & Refresh Button */}
                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Auto-updated daily: <strong className="text-emerald-800">{lastUpdateDate}</strong></span>
                  </div>

                  <button
                    onClick={() => fetchDailyExchangeRates(true)}
                    disabled={isUpdatingRates}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                    title="Force refresh live daily exchange rates"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#0052FF] ${isUpdatingRates ? 'animate-spin' : ''}`} />
                    <span>{isUpdatingRates ? 'Syncing...' : 'Refresh'}</span>
                  </button>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Ethiopian Birr (ETB) Currency Exchange Calculator
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Automatically updates every day with live commercial exchange rates. Convert foreign room rates, guest folios, and international OTA payouts into Ethiopian Birr with commercial benchmarks, hotel cashier spreads, and local taxes (10% Service Charge + 15% VAT).
              </p>
            </div>

            {/* Currency Selector Strip */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Foreign Currency to Convert with Birr (ETB):
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  Live Market Rates vs 1 {selectedCurrency}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {(Object.keys(BASE_CURRENCIES) as CurrencyCode[]).map((cCode) => {
                  const curr = BASE_CURRENCIES[cCode];
                  const isSelected = selectedCurrency === cCode;
                  const currentLiveRate = liveRates[cCode] || curr.fallbackRate;
                  return (
                    <button
                      key={cCode}
                      onClick={() => {
                        setSelectedCurrency(cCode);
                        if (ratePreset === 'official') {
                          setCustomRate(currentLiveRate);
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/90 border-[#0052FF] shadow-sm ring-2 ring-[#0052FF]/20'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{curr.flag}</span>
                        <span className={`text-xs font-extrabold ${isSelected ? 'text-[#0052FF]' : 'text-slate-800'}`}>
                          {curr.code}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-1">{curr.name}</div>
                      <div className="text-[11px] font-bold text-slate-900 mt-0.5">
                        {currentLiveRate} <span className="text-[9px] text-slate-500">ETB</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exchange Rate Mode / Spread Setting */}
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/90 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#0052FF]" />
                  <span>Exchange Rate Applied (1 {selectedCurrency} in ETB)</span>
                </div>
                <div className="text-xs text-slate-500">
                  Active conversion rate: <strong className="text-[#0052FF] font-extrabold">{effectiveRate} ETB</strong> per 1 {selectedCurrency}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRatePreset('official')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    ratePreset === 'official'
                      ? 'bg-[#0052FF] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Daily commercial bank benchmark rate"
                >
                  Live Daily Rate ({baseSelectedRate} ETB)
                </button>
                <button
                  onClick={() => setRatePreset('hotel_desk')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    ratePreset === 'hotel_desk'
                      ? 'bg-[#0052FF] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Adds standard +2.5% hotel front-desk cashier spread"
                >
                  Cashier Rate (+2.5%)
                </button>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold">Custom:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={effectiveRate}
                    onChange={(e) => {
                      setRatePreset('custom');
                      setCustomRate(Math.max(1, Number(e.target.value)));
                    }}
                    className="w-18 text-xs font-bold text-slate-900 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 font-bold">ETB</span>
                </div>
              </div>
            </div>

            {/* Main Conversion Section (Two Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Conversion Inputs & Presets (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Direction Switch Bar */}
                <div className="flex items-center justify-between p-1.5 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setForexDirection('foreign_to_etb')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      forexDirection === 'foreign_to_etb'
                        ? 'bg-white text-[#0052FF] shadow-sm'
                        : 'text-slate-600 hover:text-black'
                    }`}
                  >
                    <span>{BASE_CURRENCIES[selectedCurrency].code} → Ethiopian Birr (ETB)</span>
                  </button>
                  <button
                    onClick={() => setForexDirection(forexDirection === 'foreign_to_etb' ? 'etb_to_foreign' : 'foreign_to_etb')}
                    className="p-2 text-slate-500 hover:text-[#0052FF] transition-colors cursor-pointer"
                    title="Swap Conversion Direction"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setForexDirection('etb_to_foreign')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      forexDirection === 'etb_to_foreign'
                        ? 'bg-white text-[#0052FF] shadow-sm'
                        : 'text-slate-600 hover:text-black'
                    }`}
                  >
                    <span>Ethiopian Birr (ETB) → {BASE_CURRENCIES[selectedCurrency].code}</span>
                  </button>
                </div>

                {/* Amount Input */}
                {forexDirection === 'foreign_to_etb' ? (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-bold text-slate-800">
                        Amount in {BASE_CURRENCIES[selectedCurrency].name} ({BASE_CURRENCIES[selectedCurrency].code}):
                      </label>
                      <span className="text-xs text-slate-500 font-semibold">
                        Symbol: {BASE_CURRENCIES[selectedCurrency].symbol}
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">
                        {BASE_CURRENCIES[selectedCurrency].symbol}
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={foreignAmount}
                        onChange={(e) => setForeignAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-xl text-xl font-extrabold focus:border-[#0052FF] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-bold text-slate-800">
                        Amount in Ethiopian Birr (ETB):
                      </label>
                      <span className="text-xs text-slate-500 font-semibold">
                        Symbol: ETB
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                        ETB
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={etbAmount}
                        onChange={(e) => setEtbAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full pl-16 pr-4 py-3.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-xl text-xl font-extrabold focus:border-[#0052FF] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Quick Presets for Hotels */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Common Hotel Billing Presets ({selectedCurrency}):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: 'Standard Night', amount: 85 },
                      { label: 'Deluxe Suite', amount: 150 },
                      { label: 'Weekly Stay', amount: 600 },
                      { label: 'Monthly Corporate', amount: 1800 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setForexDirection('foreign_to_etb');
                          setForeignAmount(preset.amount);
                        }}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-left transition-colors cursor-pointer"
                      >
                        <div className="text-[10px] text-slate-500 font-semibold">{preset.label}</div>
                        <div className="text-xs font-bold text-[#0052FF]">
                          {BASE_CURRENCIES[selectedCurrency].symbol}{preset.amount}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Ethiopian Hotel Folio Tax Breakdown Toggle */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-[#0052FF]" />
                      <span className="text-xs font-bold text-slate-800">
                        Add Ethiopia Hotel Folio Taxes (10% SC + 15% VAT)
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeTaxes}
                        onChange={(e) => setIncludeTaxes(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0052FF]" />
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Helps front desk agents calculate the total Ethiopian Birr billing amount for guests paying in foreign currency including standard 10% Service Charge and 15% VAT.
                  </p>
                </div>

              </div>

              {/* Right Column: Calculated Results & OTA Payout Card (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Result Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-7 rounded-2xl border border-slate-700 shadow-xl relative">
                  <div className="text-xs uppercase font-bold tracking-wider text-[#00D4FF] mb-1">
                    Converted Currency Total
                  </div>

                  {forexDirection === 'foreign_to_etb' ? (
                    <div>
                      <div className="text-xs text-slate-400 mb-1">
                        {BASE_CURRENCIES[selectedCurrency].symbol}{foreignAmount.toLocaleString()} {selectedCurrency} equals:
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-1">
                        ETB {(foreignAmount * effectiveRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-[#00D4FF] font-semibold mt-1">
                        Ethiopian Birr (Rate: 1 {selectedCurrency} = {effectiveRate} ETB)
                      </div>

                      {/* Tax breakdown if enabled */}
                      {includeTaxes && (
                        <div className="mt-4 pt-3 border-t border-slate-700 text-xs space-y-1.5 text-slate-300">
                          <div className="flex justify-between">
                            <span>Base Room Amount:</span>
                            <span className="font-bold">ETB {(foreignAmount * effectiveRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>+ 10% Service Charge:</span>
                            <span className="font-bold text-slate-200">ETB {(foreignAmount * effectiveRate * 0.10).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>+ 15% VAT:</span>
                            <span className="font-bold text-slate-200">ETB {((foreignAmount * effectiveRate * 1.10) * 0.15).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between pt-1.5 border-t border-slate-700/80 font-black text-white text-sm">
                            <span className="text-[#00D4FF]">Total Guest Invoice:</span>
                            <span className="text-[#00D4FF]">
                              ETB {((foreignAmount * effectiveRate * 1.10) * 1.15).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs text-slate-400 mb-1">
                        ETB {etbAmount.toLocaleString()} Birr equals:
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-1">
                        {BASE_CURRENCIES[selectedCurrency].symbol}
                        {(effectiveRate > 0 ? etbAmount / effectiveRate : 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-[#00D4FF] font-semibold mt-1">
                        {BASE_CURRENCIES[selectedCurrency].name} ({selectedCurrency})
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-slate-700 flex gap-2">
                    <button
                      onClick={copyForexResult}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-600 transition-colors cursor-pointer"
                    >
                      {forexCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{forexCopied ? 'Copied to Clipboard!' : 'Copy Calculation'}</span>
                    </button>
                  </div>
                </div>

                {/* Special OTA Payout Reconciliation Mini-Calculator */}
                <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0052FF] uppercase tracking-wider">
                      OTA Payout Net Estimator
                    </span>
                    <span className="text-slate-500 font-semibold">{selectedCurrency} → ETB</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-normal">
                    Reconcile international payouts from Booking.com or Expedia after OTA commission:
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">Gross Booking ({BASE_CURRENCIES[selectedCurrency].symbol}):</label>
                      <input
                        type="number"
                        min="1"
                        value={otaGrossAmount}
                        onChange={(e) => setOtaGrossAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-white text-slate-900 font-bold px-2.5 py-1.5 rounded-lg border border-slate-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">OTA Commission %:</label>
                      <select
                        value={otaCommissionPct}
                        onChange={(e) => setOtaCommissionPct(Number(e.target.value))}
                        className="w-full bg-white text-slate-900 font-bold px-2.5 py-1.5 rounded-lg border border-slate-300 focus:outline-none"
                      >
                        <option value="15">15% (Booking Standard)</option>
                        <option value="18">18% (Expedia / Preferred)</option>
                        <option value="20">20% (Agoda / Promotion)</option>
                        <option value="12">12% (Corporate Contract)</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-blue-100 text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Net Foreign Payout:</span>
                      <span className="font-bold text-slate-900">
                        {BASE_CURRENCIES[selectedCurrency].symbol}{(otaGrossAmount * (1 - otaCommissionPct / 100)).toFixed(2)} {selectedCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-100">
                      <span className="text-[#0052FF]">Net In Ethiopian Birr:</span>
                      <span className="text-emerald-600 font-extrabold">
                        ETB {((otaGrossAmount * (1 - otaCommissionPct / 100)) * effectiveRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenConsultation('OTA Payout & Revenue Management')}
                    className="w-full py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042cc] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Optimize Channel Commission Rates</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF]" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 3. ADR CALCULATOR */}
        {activeTab === 'adr' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl max-w-4xl mx-auto">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <div className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Formula: ADR = Room Revenue ÷ Rooms Sold</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Average Daily Rate (ADR) Calculator</h3>
              <p className="text-sm text-slate-600 mt-1">
                ADR measures the average rental revenue earned for an occupied room per day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Total Room Revenue ({currency}):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={adrRevenue}
                    onChange={(e) => setAdrRevenue(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold focus:border-[#0052FF] focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 mt-1 block">Exclude F&B, taxes, and service charges.</span>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Number of Rooms Sold / Occupied:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={adrRoomsSold}
                    onChange={(e) => setAdrRoomsSold(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold focus:border-[#0052FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* ADR Output Box */}
              <div className="bg-blue-50/60 p-6 sm:p-8 rounded-2xl border border-blue-200 text-center relative">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Your Property’s ADR</div>
                <div className="text-4xl sm:text-5xl font-black text-[#0052FF] tracking-tight my-2">
                  {currencySymbol}{calculatedAdr.toFixed(2)}
                </div>
                <div className="text-xs text-slate-500 mb-6 font-medium">
                  {adrRevenue.toLocaleString()} ÷ {adrRoomsSold} rooms sold
                </div>

                <div className="bg-white p-4 rounded-xl text-left border border-blue-100 text-xs space-y-1.5 text-slate-600">
                  <div className="flex items-center gap-2 text-[#0052FF] font-bold">
                    <Info className="w-4 h-4 text-[#0052FF]" />
                    ADR Optimization Insight
                  </div>
                  <p>
                    A low ADR often points to unsegmented room types, lack of dynamic convention/weekend surcharges, or excessive OTA discounting. RevMax establishes premium room differentials to elevate ADR.
                  </p>
                </div>

                <button
                  onClick={() => onOpenConsultation('ADR Optimization')}
                  className="mt-6 w-full bg-[#0052FF] hover:bg-[#0042cc] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Optimize My ADR with RevMax
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. OCCUPANCY CALCULATOR */}
        {activeTab === 'occupancy' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl max-w-4xl mx-auto">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <div className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Formula: Occupancy % = (Rooms Sold ÷ Available Rooms) × 100</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Occupancy Percentage Calculator</h3>
              <p className="text-sm text-slate-600 mt-1">
                Occupancy tracks how effectively your available inventory is being filled over a specified period.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Rooms Sold During Period:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={occRoomsSold}
                    onChange={(e) => setOccRoomsSold(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold focus:border-[#0052FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Total Available Room Nights:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={occAvailableRooms}
                    onChange={(e) => setOccAvailableRooms(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold focus:border-[#0052FF] focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 mt-1 block">e.g. 30 rooms × 30 days = 900 room nights.</span>
                </div>
              </div>

              {/* Occupancy Output Box */}
              <div className="bg-blue-50/60 p-6 sm:p-8 rounded-2xl border border-blue-200 text-center relative">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Calculated Occupancy</div>
                <div className="text-4xl sm:text-5xl font-black text-[#0052FF] tracking-tight my-2">
                  {calculatedOccupancy.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-500 mb-6 font-medium">
                  {occRoomsSold} sold ÷ {occAvailableRooms} available
                </div>

                <div className="bg-white p-4 rounded-xl text-left border border-blue-100 text-xs space-y-1.5 text-slate-600">
                  <div className="flex items-center gap-2">
                    {calculatedOccupancy < 50 ? (
                      <span className="text-amber-700 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-amber-600" /> Below Average Velocity (&lt;50%)
                      </span>
                    ) : calculatedOccupancy < 75 ? (
                      <span className="text-blue-700 font-bold flex items-center gap-1">
                        <Info className="w-4 h-4 text-[#0052FF]" /> Healthy Baseline (50% - 75%)
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strong Occupancy (&gt;75%)
                      </span>
                    )}
                  </div>
                  <p>
                    {calculatedOccupancy < 50
                      ? 'Room nights are being lost to empty beds. RevMax optimizes your OTA discovery and sets tactical promotional fences.'
                      : 'You have solid volume! The next commercial step is lifting ADR without sacrificing occupancy.'}
                  </p>
                </div>

                <button
                  onClick={() => onOpenConsultation('Occupancy & Demand Strategy')}
                  className="mt-6 w-full bg-[#0052FF] hover:bg-[#0042cc] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Improve My Occupancy with RevMax
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. RevPAR CALCULATOR */}
        {activeTab === 'revpar' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl max-w-4xl mx-auto">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <div className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">
                Formula: RevPAR = Room Revenue ÷ Available Rooms | OR | RevPAR = ADR × Occupancy %
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">RevPAR (Revenue Per Available Room)</h3>
              <p className="text-sm text-slate-600 mt-1">
                RevPAR measures how effectively you monetize your total inventory, occupied and unoccupied.
              </p>
            </div>

            {/* Method Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setRevparMethod('adr-occ')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  revparMethod === 'adr-occ'
                    ? 'bg-[#0052FF] text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-black'
                }`}
              >
                Method A: ADR × Occupancy %
              </button>
              <button
                onClick={() => setRevparMethod('direct')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  revparMethod === 'direct'
                    ? 'bg-[#0052FF] text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-black'
                }`}
              >
                Method B: Room Revenue ÷ Available Rooms
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                {revparMethod === 'adr-occ' ? (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">
                        Average Daily Rate (ADR in {currency}):
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={revparAdrInput}
                        onChange={(e) => setRevparAdrInput(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">
                        Occupancy Percentage (%):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={revparOccInput}
                        onChange={(e) => setRevparOccInput(Math.max(1, Math.min(100, Number(e.target.value))))}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">
                        Total Room Revenue ({currency}):
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={revparTotalRevenue}
                        onChange={(e) => setRevparTotalRevenue(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">
                        Total Available Rooms:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={revparTotalRoomsAvailable}
                        onChange={(e) => setRevparTotalRoomsAvailable(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* RevPAR Output Box */}
              <div className="bg-blue-50/60 p-6 sm:p-8 rounded-2xl border border-blue-200 text-center relative">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Your Property’s RevPAR</div>
                <div className="text-4xl sm:text-5xl font-black text-[#0052FF] tracking-tight my-2">
                  {currencySymbol}{calculatedRevPar.toFixed(2)}
                </div>
                <div className="text-xs text-slate-500 mb-6 font-medium">
                  {revparMethod === 'adr-occ' 
                    ? `${currencySymbol}${revparAdrInput} ADR × ${revparOccInput}% Occ` 
                    : `${currencySymbol}${revparTotalRevenue.toLocaleString()} ÷ ${revparTotalRoomsAvailable} Available Rooms`}
                </div>

                <div className="bg-white p-4 rounded-xl text-left border border-blue-100 text-xs space-y-1.5 text-slate-600">
                  <div className="text-[#0052FF] font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#0052FF]" />
                    Why RevPAR is Decisive
                  </div>
                  <p>
                    A hotel with $100 ADR at 40% occupancy has a RevPAR of $40. A hotel with $80 ADR at 75% occupancy achieves a RevPAR of $60. RevMax manages this exact balance to maximize your net operating profit.
                  </p>
                </div>

                <button
                  onClick={() => onOpenConsultation('RevPAR Growth Strategy')}
                  className="mt-6 w-full bg-[#0052FF] hover:bg-[#0042cc] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Grow My RevPAR with RevMax
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. RATE PARITY CHECKER */}
        {activeTab === 'parity' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl max-w-5xl mx-auto">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <div className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Distribution Integrity Tool</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Multi-Channel Rate Parity Checker</h3>
              <p className="text-sm text-slate-600 mt-1">
                When OTAs undercut your direct rate or display lower prices on metasearch, your direct bookings plummet and commission costs rise.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Rate Inputs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-sm font-bold text-slate-700 mb-2">
                  Enter Current Room Rates for the Same Room Type:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-blue-50/80 border-2 border-[#0052FF]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF]">Direct Website Rate</span>
                      <span className="text-[10px] bg-[#0052FF] text-white px-2 py-0.5 rounded-full font-bold">Base</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-slate-500 font-bold">{currencySymbol}</span>
                      <input
                        type="number"
                        value={directRate}
                        onChange={(e) => setDirectRate(Number(e.target.value))}
                        className="w-full bg-white text-slate-900 font-bold px-3 py-1.5 rounded border border-slate-300 text-lg focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-700">Booking.com</span>
                      <span className="text-[10px] text-slate-400">OTA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-slate-500 font-bold">{currencySymbol}</span>
                      <input
                        type="number"
                        value={bookingComRate}
                        onChange={(e) => setBookingComRate(Number(e.target.value))}
                        className="w-full bg-white text-slate-900 font-bold px-3 py-1.5 rounded border border-slate-300 text-lg focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-700">Expedia</span>
                      <span className="text-[10px] text-slate-400">OTA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-slate-500 font-bold">{currencySymbol}</span>
                      <input
                        type="number"
                        value={expediaRate}
                        onChange={(e) => setExpediaRate(Number(e.target.value))}
                        className="w-full bg-white text-slate-900 font-bold px-3 py-1.5 rounded border border-slate-300 text-lg focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-700">Agoda</span>
                      <span className="text-[10px] text-slate-400">OTA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-slate-500 font-bold">{currencySymbol}</span>
                      <input
                        type="number"
                        value={agodaRate}
                        onChange={(e) => setAgodaRate(Number(e.target.value))}
                        className="w-full bg-white text-slate-900 font-bold px-3 py-1.5 rounded border border-slate-300 text-lg focus:border-[#0052FF] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#0052FF] shrink-0 mt-0.5" />
                  <span>
                    OTAs often apply automated promotions or geo-targeted cuts that create parity leaks without hotel owner permission.
                  </span>
                </div>
              </div>

              {/* Parity Status Audit Result */}
              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <div className="text-xs uppercase font-bold text-slate-500 mb-2">Parity Audit Status</div>

                {hasParityLeak ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Rate Parity Breach Detected
                    </div>

                    <div className="text-3xl font-black text-rose-600">
                      {currencySymbol}{parityGap.toFixed(2)} Leakage
                    </div>
                    <p className="text-xs text-slate-600">
                      An OTA is selling your room cheaper than your direct website. You risk losing direct guests and paying unnecessary {otaCommissionRate}% commissions.
                    </p>

                    <div className="bg-white p-3.5 rounded-xl text-left border border-slate-200 text-xs space-y-1.5 text-slate-600">
                      <div className="text-rose-700 font-bold">Direct Consequences:</div>
                      <div>• Guests bypass direct reservations</div>
                      <div>• Estimated {currencySymbol}{((directRate * otaCommissionRate) / 100).toFixed(1)} commission loss per room night</div>
                      <div>• Decreased direct brand authority</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Rate Parity Protected
                    </div>

                    <div className="text-3xl font-black text-emerald-600">
                      Direct Rate Parity Intact
                    </div>
                    <p className="text-xs text-slate-600">
                      Your direct website rate is equal to or lower than OTA listings. Guests have complete incentive to book direct.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => onOpenConsultation('Distribution & Parity Audit')}
                  className="mt-6 w-full bg-[#0052FF] hover:bg-[#0042cc] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Request Full Channel Parity Audit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
