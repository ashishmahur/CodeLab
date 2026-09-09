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

      {/* Hero */}
      <section className="mx-auto max-w-[1500px] px-8 py-10 lg:px-14 lg:py-12">
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

          {/* Button */}
        <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/problems"
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-600" >
              Explore Problems
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/history"
              className="rounded-lg border border-zinc-600 bg-zinc-800 px-6 py-3 font-semibold text-zinc-200 transition duration-200 hover:-translate-y-1 hover:border-orange-400 hover:text-orange-400">
              View History
             </Link>
         </div>

        </div>

        {/* Features */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">

          <div className="group rounded-xl border border-zinc-600 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
            <BookOpen className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

            <h2 className="mt-5 text-xl font-semibold text-white">
              Practice
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Work through real-world Low Level Design problems and design
              your own solution.
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
              Review your attempts, understand your mistakes, and improve
              your design thinking over time.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-6 border-t border-zinc-600 bg-zinc-950">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5 text-xs lg:px-14">

          <p className="text-zinc-500">
            © 2026 CodeLab. All rights reserved.
          </p>

          <p className="text-zinc-500 ">
            Author: Ashish Mahur
          </p>

        </div>
      </footer>

    </main>
  );
}