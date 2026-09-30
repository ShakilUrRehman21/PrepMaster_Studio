import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Page() {
  return (
    <section className="bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Visual Column */}
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col justify-between p-12 bg-zinc-900/60 border-r border-zinc-800/80 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo */}
          <Logo href="/" />

          {/* Testimonial / Value prop */}
          <div className="relative z-10 space-y-6 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium">
              <Zap className="h-3.5 w-3.5" />
              Executive Interview Simulation
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Prepare for high-stakes interviews with authentic practice rounds.
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Step into realistic technical and leadership simulations. Record your responses, analyze your delivery, and review hiring-manager grade benchmarks.
            </p>

            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Tailored question sets for 50+ software engineering roles</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Microphone voice capture & real-time speech transcription</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Comprehensive STAR method rubric breakdowns</span>
              </div>
            </div>
          </div>

          {/* Bottom attribution */}
          <div className="relative z-10 text-xs text-zinc-500 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-zinc-400" />
            <span>Encrypted & confidential mock session records</span>
          </div>
        </section>

        {/* Right Clerk Auth Column */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-12 lg:col-span-7 xl:col-span-7">
          <div className="w-full max-w-md flex flex-col items-center">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center mb-8">
              <Logo href="/" />
            </div>

            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}