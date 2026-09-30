"use client";
import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap, ArrowRight, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function Upgrade() {
  const tiers = [
    {
      name: "Starter Studio",
      price: "$0",
      period: "forever free",
      desc: "Essential mock interview practice for aspiring developers and engineers.",
      features: [
        "Unlimited role-tailored mock interview sessions",
        "Browser-based speech recognition and live transcription",
        "STAR framework question guidance and hints",
        "Immediate diagnostic scoring and benchmark answers",
        "Persistent session history and feedback reviews",
      ],
      current: true,
      buttonText: "Current Plan",
    },
    {
      name: "Executive Pro",
      price: "$19",
      period: "per month",
      desc: "Advanced simulations and deep rubrics for senior engineers and engineering leads.",
      features: [
        "Everything in Starter Studio",
        "Upload specific company job descriptions & JD parsing",
        "Multi-round simulated hiring loops (Technical + Behavioral + System Design)",
        "Advanced rubric scoring (Clarity, Depth, Edge-Case Handling)",
        "Downloadable PDF diagnostic performance scorecards",
        "Priority Gemini 1.5 Pro processing speeds",
      ],
      highlight: true,
      buttonText: "Upgrade to Pro",
    },
    {
      name: "Team & Enterprise",
      price: "$49",
      period: "per seat / mo",
      desc: "For bootcamps, universities, and engineering organizations.",
      features: [
        "Everything in Executive Pro",
        "Custom company rubric templates (e.g. FAANG bars)",
        "Centralized team analytics and candidate readiness tracking",
        "Dedicated onboarding & custom API integrations",
        "SOC2 compliant data handling guarantees",
      ],
      current: false,
      buttonText: "Contact Sales",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
          <CreditCard className="h-3.5 w-3.5" />
          Studio Membership & Plans
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Invest in your career readiness
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Transparent plans designed for self-directed engineers preparing for high-stakes interviews.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
              tier.highlight
                ? "bg-gradient-to-b from-blue-950/40 via-zinc-900/60 to-zinc-950 border-blue-500/50 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/30"
                : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white">{tier.name}</h3>
                {tier.highlight && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    Recommended
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {tier.price}
                </span>
                <span className="text-xs text-zinc-500">{tier.period}</span>
              </div>

              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{tier.desc}</p>

              <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Button
                disabled={tier.current}
                className={`w-full text-xs font-semibold rounded-xl py-2.5 transition-all ${
                  tier.current
                    ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700"
                    : tier.highlight
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                }`}
              >
                {tier.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Guarantee & Privacy Strip */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">100% Private Practice</h4>
            <p className="text-xs text-zinc-400">
              Camera feeds never leave your browser. Speech transcripts are strictly private to your account.
            </p>
          </div>
        </div>

        <Link href="/dashboard">
          <Button variant="outline" className="text-xs border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Upgrade;