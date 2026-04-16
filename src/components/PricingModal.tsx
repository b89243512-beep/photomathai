"use client";

import { useEffect, useState } from "react";
import { X, Check, Sparkles, Crown, Infinity as InfinityIcon, BookOpen, Zap, Camera, Brain, Star, Loader2 } from "lucide-react";

type Plan = "weekly" | "yearly";

const PLANS = {
  weekly: {
    id: "weekly",
    label: "Weekly",
    price: 6.99,
    period: "week",
    days: 7,
    savings: null as string | null,
  },
  yearly: {
    id: "yearly",
    label: "Yearly",
    price: 39.99,
    period: "year",
    days: 365,
    savings: "Save 89%",
  },
} as const;

const features = [
  { icon: InfinityIcon, label: "Unlimited math problem solving", free: false, pro: true },
  { icon: Camera, label: "Photo + handwritten input support", free: true, pro: true },
  { icon: Brain, label: "Advanced AI with step-by-step reasoning", free: false, pro: true },
  { icon: BookOpen, label: "Solution history & saved problems", free: false, pro: true },
  { icon: Zap, label: "Priority processing, 5x faster", free: false, pro: true },
  { icon: Sparkles, label: "AI chat follow-up questions", free: "Limited", pro: true },
];

const testimonials = [
  { name: "Sarah M.", text: "Saved my calculus grade!" },
  { name: "Alex K.", text: "Every student needs this." },
  { name: "Jordan T.", text: "Worth every penny." },
];

function dailyPrice(plan: typeof PLANS.weekly | typeof PLANS.yearly) {
  const cents = (plan.price / plan.days);
  return cents < 1 ? `${(cents * 100).toFixed(0)}¢` : `$${cents.toFixed(2)}`;
}

export function PricingModal({ open, onClose, userName }: { open: boolean; onClose: () => void; userName?: string | null }) {
  const [selected, setSelected] = useState<Plan>("yearly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleCheckout = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to start checkout.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const weekly = PLANS.weekly;
  const yearly = PLANS.yearly;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{ background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all z-20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-5 gap-0">
          {/* Left: Social proof + features */}
          <div className="md:col-span-3 p-6 md:p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Social proof badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">12,988 students joined today</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">4.9 · 700k+ users</span>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              {userName ? `Welcome, ${userName.split(" ")[0]}!` : "Welcome!"}{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Unlock Pro</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">Get unlimited access to every feature</p>

            {/* Features table */}
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Features</span>
                <span className="text-center w-12">Free</span>
                <span className="text-center w-12">Pro</span>
              </div>
              {/* Rows */}
              {features.map((f) => (
                <div key={f.label} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center px-4 py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center gap-2.5">
                    <f.icon className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-sm text-slate-700">{f.label}</span>
                  </div>
                  <div className="w-12 flex justify-center">
                    {f.free === true ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : f.free === false ? (
                      <X className="w-4 h-4 text-slate-300" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">{f.free}</span>
                    )}
                  </div>
                  <div className="w-12 flex justify-center">
                    <Check className="w-4 h-4 text-indigo-500" strokeWidth={3} />
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="mt-5 flex flex-wrap gap-2">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-xl border border-slate-200 px-3 py-2">
                  <p className="text-xs text-slate-600">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">— {t.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pricing */}
          <div className="md:col-span-2 p-6 md:p-8 bg-white border-l border-slate-100">
            <div className="flex items-center gap-2 mb-5">
              <Crown className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-extrabold text-slate-900">Choose your plan</h3>
            </div>

            {/* Plan selector */}
            <div className="space-y-3">
              {/* Weekly */}
              <button
                onClick={() => setSelected("weekly")}
                className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                  selected === "weekly"
                    ? "border-indigo-500 bg-indigo-50/50 ring-4 ring-indigo-100"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected === "weekly" ? "border-indigo-500" : "border-slate-300"
                    }`}>
                      {selected === "weekly" && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
                    </div>
                    <span className="font-bold text-slate-900">Weekly</span>
                  </div>
                  <span className="font-bold text-slate-900">${weekly.price}</span>
                </div>
                <div className="ml-7 flex items-center justify-between">
                  <p className="text-xs text-slate-500">{dailyPrice(weekly)}/day · billed weekly</p>
                </div>
              </button>

              {/* Yearly — recommended */}
              <button
                onClick={() => setSelected("yearly")}
                className={`relative w-full text-left rounded-2xl border-2 p-4 transition-all ${
                  selected === "yearly"
                    ? "border-indigo-500 bg-indigo-50/50 ring-4 ring-indigo-100"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                {/* Save badge */}
                <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {yearly.savings}
                </span>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected === "yearly" ? "border-indigo-500" : "border-slate-300"
                    }`}>
                      {selected === "yearly" && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
                    </div>
                    <span className="font-bold text-slate-900">Yearly</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-600 font-bold px-2 py-0.5 rounded-full">BEST VALUE</span>
                  </div>
                  <span className="font-bold text-slate-900">${yearly.price}</span>
                </div>
                <div className="ml-7 flex items-center justify-between">
                  <p className="text-xs text-slate-500">{dailyPrice(yearly)}/day · billed yearly</p>
                </div>
              </button>
            </div>

            {/* Total */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Total due today</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  ${PLANS[selected].price}
                </span>
              </div>
              {selected === "yearly" && (
                <p className="text-[11px] text-green-600 font-semibold mt-0.5 text-right">Save ${(weekly.price * 52 - yearly.price).toFixed(2)}/year</p>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-5 py-3.5 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all text-base flex items-center justify-center gap-2 disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
            >
              {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Loading...</>) : "Continue to Checkout"}
            </button>

            {error && <p className="text-xs text-red-500 text-center mt-2">{error}</p>}

            {/* Skip */}
            <button onClick={onClose} className="w-full mt-2 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">
              Maybe later
            </button>

            {/* Trust */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                <span>Secure payment · Cancel anytime</span>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-2 leading-relaxed">
                By continuing, you agree to our{" "}
                <a href="/terms" className="text-indigo-500 hover:underline">Terms</a> and{" "}
                <a href="/privacy" className="text-indigo-500 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
