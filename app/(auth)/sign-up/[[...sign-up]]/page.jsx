import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Page() {
  return (
    <section className="bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Visual Column */}
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col justify-between p-12 bg-zinc-900/60 border-r border-zinc-800/80 overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo */}
          <Logo href="/" />

          {/* Value Prop */}
          <div className="relative z-10 space-y-6 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-medium">
              <Zap className="h-3.5 w-3.5" />
              Create Your Free Account
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Start mastering technical interviews today.
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Create an account to run personalized mock interviews, practice with realistic speech recognition, and track your ongoing growth across multiple target positions.
            </p>

            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Unlimited mock practice simulations</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Real-time voice-to-text recording</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Persistent session history and feedback reviews</span>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="relative z-10 text-xs text-zinc-500 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-zinc-400" />
            <span>Private sessions — your camera feed is never uploaded</span>
          </div>
        </section>

        {/* Right Clerk Auth Column */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-12 lg:col-span-7 xl:col-span-7">
          <div className="w-full max-w-md flex flex-col items-center">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center mb-8">
              <Logo href="/" />
            </div>

            <SignUp />
          </div>
        </main>
      </div>
    </section>
  );
}