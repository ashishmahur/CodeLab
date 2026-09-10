import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

const steps = [
  "Choose Problem",
  "Design Solution",
  "Submit",
  "Get Feedback",
  "Improve",
];

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1500px] px-8 py-14 lg:px-14 lg:py-16">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-orange-500" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                Low Level Design Practice
              </p>
            </div>

            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Practice better.
              <br />
              <span className="text-zinc-400">Design smarter.</span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
              CodeLab helps you practice real-world Low Level Design problems,
              build your own approach, and improve through structured feedback
              after every attempt.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/problems"
                className="group flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-600"
              >
                Explore Problems
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/history"
                className="rounded-lg border border-zinc-600 bg-zinc-800 px-6 py-3 font-semibold text-zinc-200 transition duration-200 hover:-translate-y-1 hover:border-orange-400 hover:text-orange-400"
              >
                View History
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <div className="group rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 py-5 transition duration-200 hover:border-orange-400/60">
              <p className="text-3xl font-bold text-white transition-colors group-hover:text-orange-400">
                10
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Practice Problems
              </p>
            </div>

            <div className="group rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 py-5 transition duration-200 hover:border-orange-400/60">
              <p className="text-3xl font-bold text-white transition-colors group-hover:text-orange-400">
                5
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Supported Languages
              </p>
            </div>

            <div className="group rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 py-5 transition duration-200 hover:border-orange-400/60">
              <p className="text-3xl font-bold text-orange-400">AI</p>
              <p className="mt-1 text-sm text-zinc-500">
                Powered Feedback
              </p>
            </div>
          </div>

          {/* How It Works */}
          <section className="mt-16">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                How It Works
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  From problem to better design
                </h2>

                <span className="hidden text-sm text-zinc-600 sm:block">
                  Simple. Focused. Practical.
                </span>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-5">
              {steps.map((step, index) => (
                <div key={step} className="relative">
                  <div className="group rounded-xl border border-zinc-700 bg-zinc-800 p-5 transition duration-200 hover:-translate-y-1 hover:border-orange-400/70 hover:bg-zinc-800/90">
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-bold text-orange-400 group-hover:border-orange-400/50">
                        0{index + 1}
                      </span>

                      {index < steps.length - 1 && (
                        <ChevronRight className="h-4 w-4 text-zinc-700 md:hidden" />
                      )}
                    </div>

                    <p className="mt-5 text-sm font-semibold text-zinc-200">
                      {step}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-zinc-700 md:block" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="group rounded-xl border border-zinc-700 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
              <BookOpen className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

              <h2 className="mt-5 text-xl font-semibold text-white">
                Practice
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Work through real-world Low Level Design problems and design
                your own solution.
              </p>
            </div>

            <div className="group rounded-xl border border-zinc-700 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
              <BrainCircuit className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

              <h2 className="mt-5 text-xl font-semibold text-white">
                Get Feedback
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Receive structured feedback on your classes, relationships,
                responsibilities, and design decisions.
              </p>
            </div>

            <div className="group rounded-xl border border-zinc-700 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
              <RotateCcw className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

              <h2 className="mt-5 text-xl font-semibold text-white">
                Improve
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Review your attempts, understand your mistakes, and improve
                your design thinking over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5 text-xs lg:px-14">
          <p className="text-zinc-500">
            © 2026 CodeLab. All rights reserved.
          </p>

          <p className="text-zinc-500">Author: Ashish Mahur</p>
        </div>
      </footer>
    </main>
  );
}