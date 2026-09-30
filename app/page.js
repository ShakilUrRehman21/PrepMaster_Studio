import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Mic, 
  Sparkles, 
  Terminal, 
  Video, 
  Award, 
  Layers, 
  Volume2, 
  Cpu,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navbar */}
      <nav className="w-full border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo href="/" />

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/instruction"
              className="hidden sm:inline-flex text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-3 py-1.5"
            >
              How It Works
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white transition-all shadow-sm shadow-white/10 hover:shadow-md"
            >
              Open Studio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-zinc-800/60">
        {/* Subtle Background Glow Mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 mb-8 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Modern Interview Simulation & Speech Evaluation
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Ace your next technical interview with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">precision practice</span>.
          </h1>

          {/* Subhead */}
          <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Replicate realistic hiring rounds for software engineering, system design, and product leadership. Speak your answers naturally, refine your delivery, and receive rigorous rubric feedback.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              Start Free Simulation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard/instruction"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-7 py-3.5 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all"
            >
              Explore Preparation Guide
            </Link>
          </div>

          {/* Live Mockup Preview Card */}
          <div className="mt-16 sm:mt-20 max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 sm:p-4 backdrop-blur-xl shadow-2xl shadow-black/80">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/90 overflow-hidden">
              {/* Studio Window Chrome */}
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 bg-zinc-900/40">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-500">Live Mock Session — Senior Full Stack Engineer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                    Recording 01:24
                  </span>
                </div>
              </div>

              {/* Simulation Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 text-left">
                {/* Left Side: Question Pane */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                        Question 3 of 5
                      </span>
                      <span className="text-xs text-zinc-500">System Architecture & Scalability</span>
                    </div>
                    <h3 className="text-lg font-medium text-zinc-100 leading-snug">
                      "How would you design a distributed caching layer for high-throughput API endpoints while handling cache invalidation and stampede issues?"
                    </h3>
                  </div>

                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                      <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                      Live Speech Transcription Stream
                    </div>
                    <p className="text-xs text-zinc-300 font-mono italic leading-relaxed">
                      "To mitigate cache stampede, I would implement probabilistic early expiration or mutual exclusion locking via Redis mutexes. Furthermore, using a two-tier cache with local in-memory L1..."
                    </p>
                  </div>
                </div>

                {/* Right Side: Camera & Audio Pane */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 relative overflow-hidden">
                  <div className="h-28 w-28 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center bg-blue-500/5 mb-4">
                    <Video className="h-10 w-10 text-blue-400" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium mb-3">Webcam & Microphone Active</span>
                  
                  {/* Animated Waveform Simulation */}
                  <div className="flex items-center gap-1.5 h-8">
                    <div className="w-1 bg-blue-500 rounded-full soundwave-bar" />
                    <div className="w-1 bg-blue-400 rounded-full soundwave-bar" />
                    <div className="w-1 bg-indigo-500 rounded-full soundwave-bar" />
                    <div className="w-1 bg-blue-500 rounded-full soundwave-bar" />
                    <div className="w-1 bg-indigo-400 rounded-full soundwave-bar" />
                    <div className="w-1 bg-blue-500 rounded-full soundwave-bar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="border-b border-zinc-800/80 bg-zinc-950/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">50+</div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1">Tech & Engineering Roles</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">100%</div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1">Voice Recognition Ready</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">STAR</div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1">Method Behavioral Scoring</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Instant</div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1">Diagnostic Rubric Feedback</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">
            Engineered for Job Seekers
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything you need to practice under realistic pressure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-all hover:-translate-y-1">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
              <Cpu className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Role-Tailored Questions</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Generate scenario-specific questions tuned to your exact tech stack, years of experience, and target position seniority.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-all hover:-translate-y-1">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <Mic className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Speech Recognition Studio</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Answer aloud using your microphone and optional webcam to simulate authentic live video conference technical loops.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-all hover:-translate-y-1">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Award className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Constructive Scorecards</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Receive concise ratings, candidate answer transcriptions, benchmark solutions, and tactical improvement notes.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Step Flow */}
      <section className="py-20 border-t border-zinc-800/80 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">Three steps to interview readiness</h2>
            <p className="text-sm text-zinc-400 mt-2">A clean, focused workflow designed without unnecessary distractions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20">
              <div className="text-4xl font-mono font-bold text-zinc-700 mb-4">01</div>
              <h4 className="text-base font-semibold text-white mb-2">Configure Your Profile</h4>
              <p className="text-sm text-zinc-400">
                Specify your target position, technology stack (e.g. Next.js, Go, AWS), and years of experience.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20">
              <div className="text-4xl font-mono font-bold text-zinc-700 mb-4">02</div>
              <h4 className="text-base font-semibold text-white mb-2">Live Speech Simulation</h4>
              <p className="text-sm text-zinc-400">
                Listen to questions spoken aloud, activate your camera if desired, and articulate your answers verbally.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20">
              <div className="text-4xl font-mono font-bold text-zinc-700 mb-4">03</div>
              <h4 className="text-base font-semibold text-white mb-2">Review Benchmarks</h4>
              <p className="text-sm text-zinc-400">
                Inspect your ratings, compare your wording against the recommended response, and address specific weak points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalist CTA Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo href="/" />
            <span className="text-xs text-zinc-500 hidden sm:inline">— Career Preparation Studio</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/dashboard/instruction" className="hover:text-white transition-colors">Guide</Link>
            <Link href="/dashboard/question" className="hover:text-white transition-colors">Question Bank</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
