"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  Search, 
  Layers, 
  Code2, 
  Cpu, 
  Users, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SAMPLE_QUESTION_BANK = [
  {
    category: "System Design",
    difficulty: "Senior / Staff",
    role: "Backend Architect",
    question: "How would you architect a distributed rate-limiting service capable of handling 500k RPS with multi-datacenter consistency?",
    keyFocus: "Sliding window log vs token bucket, Redis cluster, clock skew, eventual consistency",
  },
  {
    category: "System Design",
    difficulty: "Staff",
    role: "Infrastructure Lead",
    question: "Explain the trade-offs between write-through, write-behind, and cache-aside caching strategies when architecting a high-concurrency payment gateway.",
    keyFocus: "Data consistency, stale reads, network partitioning, ACID guarantees",
  },
  {
    category: "Frontend",
    difficulty: "Senior",
    role: "Senior Frontend Engineer",
    question: "How do React 19 Server Components and Suspense boundaries alter hydration performance and data fetching waterfalls?",
    keyFocus: "RSC payload streaming, selective hydration, bundle reduction, server/client boundaries",
  },
  {
    category: "Frontend",
    difficulty: "Senior",
    role: "Frontend Architect",
    question: "Walk through how you profile and eliminate long tasks and layout thrashing in an interactive web application to optimize INP (Interaction to Next Paint).",
    keyFocus: "Chrome DevTools performance profiler, requestAnimationFrame, debounce/throttle, virtualized lists",
  },
  {
    category: "Backend",
    difficulty: "Mid / Senior",
    role: "Backend Engineer",
    question: "Describe how database indexing (B-Tree vs Hash vs GIN) impacts query latency and write throughput in relational databases like PostgreSQL.",
    keyFocus: "Index write overhead, composite indexes, query planner EXPLAIN ANALYZE, page fragmentation",
  },
  {
    category: "Backend",
    difficulty: "Senior",
    role: "Distributed Systems",
    question: "How do you achieve idempotent API requests for financial transactions across unreliable distributed microservices?",
    keyFocus: "Idempotency keys, distributed locks, database unique constraints, replay attacks",
  },
  {
    category: "Behavioral",
    difficulty: "Lead / Manager",
    role: "Engineering Leadership",
    question: "Describe a situation where you had a strong technical disagreement with a principal architect or product stakeholder. How did you resolve it?",
    keyFocus: "Empathy, data-driven prototypes, trade-off matrix, disagree and commit principle",
  },
  {
    category: "Behavioral",
    difficulty: "Senior",
    role: "Senior Staff",
    question: "Tell me about a high-severity production outage you led the response for. How did you triage, resolve, and conduct the blameless post-mortem?",
    keyFocus: "Incident triage, status updates, root cause analysis (5 Whys), preventative action items",
  },
];

const CATEGORIES = ["All", "System Design", "Frontend", "Backend", "Behavioral"];

function QuestionBank() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = SAMPLE_QUESTION_BANK.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyFocus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20 mb-2">
            <HelpCircle className="h-3.5 w-3.5" />
            Curated Question Repository
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Interview Question Library
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Explore battle-tested technical and behavioral questions across engineering specializations.
          </p>
        </div>

        <Link href="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-medium px-4 py-2 flex items-center gap-1.5 shadow-md shadow-blue-600/20">
            Launch Simulation Studio
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-zinc-800 bg-zinc-900/30 text-zinc-400 text-xs">
            No questions match your filter. Try adjusting your search query.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3 hover:border-zinc-700 transition-all hover:bg-zinc-900/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {q.category}
                  </span>
                  <span className="text-xs text-zinc-500">Target: {q.role}</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                  {q.difficulty}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                "{q.question}"
              </h3>

              <div className="flex items-center gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                <BookmarkCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Hiring Panel Evaluates:</strong> {q.keyFocus}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default QuestionBank;