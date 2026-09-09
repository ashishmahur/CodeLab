import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  RotateCcw,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
      <section className="mx-auto max-w-[1500px] px-8 py-16 lg:px-14">
        {/* Hero */}
        <div className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Low Level Design Practice
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Practice better.
            <br />
            Design smarter.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            CodeLab helps you practice real-world Low Level Design problems,
            build your own approach, and improve through structured feedback
            after every attempt.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/problems"
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-600"
            >
              Explore Problems
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/history"
              className="rounded-lg border border-zinc-600 bg-zinc-800 px-6 py-3 font-semibold text-zinc-200 transition duration-200 hover:-translate-y-1 hover:border-orange-400 hover:text-orange-400"
            >
              View History
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="group rounded-xl border border-zinc-600 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
            <BookOpen className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

            <h2 className="mt-5 text-xl font-semibold text-white">
              Practice
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Work through real-world Low Level Design problems and design your
              own solution.
            </p>
          </div>

          <div className="group rounded-xl border border-zinc-600 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
            <BrainCircuit className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

            <h2 className="mt-5 text-xl font-semibold text-white">
              Get Feedback
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Receive structured feedback on your classes, relationships,
              responsibilities, and design decisions.
            </p>
          </div>

          <div className="group rounded-xl border border-zinc-600 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
            <RotateCcw className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

            <h2 className="mt-5 text-xl font-semibold text-white">
              Improve
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Review previous attempts, understand your mistakes, and improve
              your design thinking over time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}