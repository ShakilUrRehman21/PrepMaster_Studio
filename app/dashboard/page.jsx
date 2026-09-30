import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import Link from "next/link";
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Activity,
  ArrowUpRight
} from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Dashboard Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 mb-2">
            <Activity className="h-3 w-3" />
            Interview Simulation Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Candidate Workspace
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Configure tailored interview sessions, articulate your answers verbally, and inspect detailed diagnostic scorecards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/instruction"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-blue-400" />
            Interview Strategy Guide
          </Link>
          <Link
            href="/dashboard/question"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            Question Library
          </Link>
        </div>
      </div>

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <AddNewInterview />

        {/* Informative Guidance Card 1 */}
        <Link
          href="/dashboard/instruction"
          className="group relative flex flex-col justify-between p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all hover:shadow-xl min-h-[190px]"
        >
          <div className="flex items-start justify-between">
            <div className="h-11 w-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <BookOpen className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
              STAR Method Framework
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Master the Situation, Task, Action, Result framework used by FAANG & top tech hiring bars.
            </p>
          </div>
        </Link>

        {/* Informative Guidance Card 2 */}
        <Link
          href="/dashboard/question"
          className="group relative flex flex-col justify-between p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all hover:shadow-xl min-h-[190px]"
        >
          <div className="flex items-start justify-between">
            <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <HelpCircle className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
              Curated Question Bank
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Browse top system design, algorithmic trade-off, and behavioral questions across tech disciplines.
            </p>
          </div>
        </Link>
      </div>

      {/* Previous Sessions */}
      <InterviewList />
    </div>
  );
}

export default Dashboard;