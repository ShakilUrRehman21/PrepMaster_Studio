import React from "react";
import Link from "next/link";
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Mic, 
  Video, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  Layers,
  Code,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

function InstructionPage() {
  const steps = [
    {
      num: "01",
      title: "Configure Role & Seniority",
      desc: "Define your target position, years of experience, and primary tech stack (e.g. Next.js, Node, Go, AWS). The simulation dynamically generates real-world scenario questions matched to your exact hiring bar.",
    },
    {
      num: "02",
      title: "Pre-Flight Studio Check",
      desc: "Verify your microphone input and optional camera. While camera feed remains 100% private to your browser, keeping it active helps train your posture, eye contact, and executive delivery under pressure.",
    },
    {
      num: "03",
      title: "Verbal Articulation",
      desc: "Listen to the prompt audio, digest the problem, and click 'Record Speech Answer'. Speak naturally and coherently. Live speech-to-text captures your wording, allowing you to edit or polish technical terms before grading.",
    },
    {
      num: "04",
      title: "Diagnostic Scorecards",
      desc: "Inspect your rating, identify missing technical edge cases, and compare your articulation directly against the recommended exemplar benchmark answer.",
    },
  ];

  const starFramework = [
    {
      letter: "S",
      title: "Situation",
      subtitle: "Set the Scene",
      detail: "Describe the specific context or engineering challenge. Specify scale, constraints, team size, or production incidents.",
    },
    {
      letter: "T",
      title: "Task",
      subtitle: "Identify Responsibility",
      detail: "Clarify what objective you were personally tasked with achieving, the trade-offs involved, and the deadline.",
    },
    {
      letter: "A",
      title: "Action",
      subtitle: "Execute Technical Steps",
      detail: "Detail the architecture, algorithmic approach, technologies, or organizational strategy you personally implemented.",
    },
    {
      letter: "R",
      title: "Result",
      subtitle: "Quantify the Impact",
      detail: "Share measurable outcomes: reduced latency by 35%, lowered AWS bill by $12k/mo, zero downtime migration, or team velocity increase.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-800">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 mb-2">
          <BookOpen className="h-3.5 w-3.5" />
          Candidate Strategy Playbook
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          How to Maximize Your Interview Simulations
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Master the art of concise communication, structured problem solving, and technical confidence for modern engineering hiring loops.
        </p>
      </div>

      {/* Step by Step Workflow */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">The 4-Step Practice Cycle</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all"
            >
              <div>
                <span className="text-3xl font-bold font-mono text-zinc-700 mb-2 block">
                  {s.num}
                </span>
                <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STAR Framework Section */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Gold Standard Behavioral Framework
          </span>
          <h2 className="text-xl font-bold text-white mt-1">The STAR Communication Model</h2>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Hiring managers at FAANG, high-growth startups, and Fortune 500 enterprises evaluate responses based on structure and impact. Structure your stories using this 4-part rubric:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {starFramework.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-5 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 font-mono font-bold text-lg flex items-center justify-center mb-3">
                  {item.letter}
                </div>
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <div className="text-[11px] font-medium text-blue-400">{item.subtitle}</div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tips Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-400" />
          Executive Tips for Remote Interviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-2">
            <h4 className="text-sm font-semibold text-zinc-100">1. Think Out Loud</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Interviewers care more about your thought process than an instant answer. Talk through trade-offs, assumptions, and edge cases before settling on a design.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-2">
            <h4 className="text-sm font-semibold text-zinc-100">2. Ask Clarifying Questions</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Never assume traffic volume, latency budgets, or data consistency models. Clarify whether read-heavy vs write-heavy patterns dominate.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-2">
            <h4 className="text-sm font-semibold text-zinc-100">3. Emphasize Failure Modes</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Senior engineers shine when addressing system resilience: circuit breakers, fallback caches, retry storms, and exponential backoff mechanisms.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">Ready to put theory into practice?</h3>
          <p className="text-xs text-zinc-400">Launch a simulation session now and test your verbal delivery.</p>
        </div>
        <Link href="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold px-6 py-2.5 flex items-center gap-2">
            Go to Simulation Studio
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InstructionPage;
