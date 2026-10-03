import Link from "next/link";
import { ArrowRight, Code2, Layers3, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0c0d] text-zinc-100">
      {/* Hero */}
      <section
        className="relative border-b border-zinc-800/80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      >
        <div className="pointer-events-none absolute right-[12%] top-24 h-2 w-2 rounded-full bg-orange-500/80 shadow-[0_0_18px_rgba(249,115,22,0.45)]" />

        <div className="pointer-events-none absolute bottom-20 left-[5%] h-1.5 w-1.5 rounded-full bg-orange-500/70 shadow-[0_0_14px_rgba(249,115,22,0.35)]" />

        <div className="mx-auto max-w-[1500px] px-8 py-24 lg:px-14 lg:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.3)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                About CodeLab
              </p>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-[-0.035em] text-zinc-100 sm:text-6xl lg:text-7xl">
              A focused space
              <br />
              for better{" "}
              <span className="text-orange-500">developers.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              CodeLab is built for developers who want to go beyond simply
              solving problems. Practice DSA, explore Low Level Design, and
              use meaningful feedback to understand how you can improve.
            </p>

            <Link
              href="/problems"
              className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-orange-400"
            >
              Start Practicing
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section
        className="relative border-b border-zinc-800/80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      >
        <div className="mx-auto max-w-[1100px] px-8 py-24 lg:py-28">
          {/* Section heading */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.3)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                What We Do
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
              Practice with a purpose.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              CodeLab brings together structured coding practice and design
              problems in one focused workspace. The goal is not just to help
              you complete another problem, but to help you understand your
              approach, recognize weaknesses, and become a better problem
              solver over time.
            </p>
          </div>

          {/* Main cards */}
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {/* DSA */}
            <div className="rounded-2xl border border-zinc-800 bg-[#101112] p-7 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/[0.07]">
                <Code2 size={22} className="text-orange-500" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-zinc-100">
                DSA Practice
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                Build stronger problem-solving skills through carefully
                structured DSA problems covering fundamental and interview
                focused concepts.
              </p>

              <div className="mt-6 space-y-2.5 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Arrays, strings, trees, graphs and more
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Different difficulty levels
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Practice with an in-built code editor
                </div>
              </div>

              <Link
                href="/problems"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-orange-400"
              >
                Explore problems
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* LLD */}
            <div className="rounded-2xl border border-zinc-800 bg-[#101112] p-7 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/[0.07]">
                <Layers3 size={22} className="text-orange-500" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-zinc-100">
                LLD Practice
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                Work through practical Low Level Design problems and learn to
                think about objects, responsibilities, relationships, and
                extensible system structures.
              </p>

              <div className="mt-6 space-y-2.5 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Real-world design scenarios
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Object-oriented design thinking
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Focus on clean and extensible designs
                </div>
              </div>

              <Link
                href="/problems"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-orange-400"
              >
                Explore problems
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* AI Feedback */}
          <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-[#101112] p-6 sm:flex-row sm:items-center sm:p-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/[0.07]">
              <Sparkles size={21} className="text-orange-500" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-zinc-100">
                Learn from your attempts
              </h3>

              <p className="mt-1.5 max-w-3xl text-sm leading-6 text-zinc-500">
                CodeLab uses AI-powered evaluation to give structured feedback
                on your submitted solutions, helping you understand what went
                well, what could be improved, and what to focus on next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goal */}
      <section
        className="relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      >
        <div className="pointer-events-none absolute left-[11%] top-28 h-1.5 w-1.5 rounded-full bg-orange-500/70 shadow-[0_0_14px_rgba(249,115,22,0.35)]" />

        <div className="pointer-events-none absolute right-[13%] bottom-24 h-2 w-2 rounded-full bg-orange-500/70 shadow-[0_0_16px_rgba(249,115,22,0.35)]" />

        <div className="mx-auto max-w-3xl px-8 py-24 text-center lg:py-32">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.3)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
              Our Goal
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
            Help you become a more{" "}
            <span className="text-orange-500">confident developer.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
            Keep solving, keep learning, and take one more step towards the
            developer you want to be.
          </p>

          <Link
            href="/problems"
            className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-orange-400"
          >
            Explore Problems
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#090a0b]">
        <div className="mx-auto max-w-[1500px] px-8 py-5 lg:px-14">
          <p className="text-xs text-zinc-600">
            © 2026 CodeLab. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}