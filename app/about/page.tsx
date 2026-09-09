import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Lightbulb,
  Target,
  Link2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
      <section className="mx-auto max-w-[1500px] px-8 py-10 lg:px-14 lg:py-12">

        {/* Heading */}
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            About CodeLab
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Practice. Design. Improve.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            CodeLab is a focused Low Level Design practice platform built to
            help developers improve their object-oriented design and problem
            solving skills through practical problems and structured feedback.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="group rounded-xl border border-zinc-600 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
            <Code2 className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

            <h2 className="mt-5 text-xl font-semibold text-white">
              Real-World Problems
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Practice common LLD problems such as Parking Lot, Elevator
              System, Vending Machine, ATM, and Movie Ticket Booking.
            </p>
          </div>

          <div className="group rounded-xl border border-zinc-600 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
            <Lightbulb className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

            <h2 className="mt-5 text-xl font-semibold text-white">
              Structured Feedback
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Submit your design and receive feedback on design quality,
              extensibility, code quality, and edge-case handling.
            </p>
          </div>

          <div className="group rounded-xl border border-zinc-600 bg-zinc-800 p-7 transition duration-200 hover:-translate-y-2 hover:border-orange-400">
            <Target className="h-8 w-8 text-orange-400 transition duration-200 group-hover:scale-110" />

            <h2 className="mt-5 text-xl font-semibold text-white">
              Improve Your Design Skills
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Review your attempts, understand areas for improvement, and
              develop stronger Low Level Design thinking.
            </p>
          </div>
        </div>

        {/* How CodeLab Works */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-white">
            How CodeLab Works
          </h2>

          <div className="mt-7 flex flex-col items-center gap-3 md:flex-row md:justify-between">
            <div className="flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-4 md:w-auto md:min-w-[180px]">
              <span className="text-sm font-semibold text-zinc-200">
                Choose Problem
              </span>
            </div>

            <ArrowRight className="hidden h-5 w-5 shrink-0 text-orange-400 md:block" />

            <div className="flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-4 md:w-auto md:min-w-[180px]">
              <span className="text-sm font-semibold text-zinc-200">
                Design Solution
              </span>
            </div>

            <ArrowRight className="hidden h-5 w-5 shrink-0 text-orange-400 md:block" />

            <div className="flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-4 md:w-auto md:min-w-[180px]">
              <span className="text-sm font-semibold text-zinc-200">
                Submit
              </span>
            </div>

            <ArrowRight className="hidden h-5 w-5 shrink-0 text-orange-400 md:block" />

            <div className="flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-4 md:w-auto md:min-w-[180px]">
              <span className="text-sm font-semibold text-zinc-200">
                AI Evaluation
              </span>
            </div>

            <ArrowRight className="hidden h-5 w-5 shrink-0 text-orange-400 md:block" />

            <div className="flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-4 md:w-auto md:min-w-[180px]">
              <span className="text-sm font-semibold text-zinc-200">
                Improve
              </span>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="mt-24 border-t border-zinc-800 pt-10">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">

            <div className="flex items-center gap-5">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
                    <Image
                        src="/ashish.png"
                        alt="Ashish Mahur"
                        fill
                        className="object-cover"
                    />
                    </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Built by
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  Ashish Mahur
                </p>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/ashish-mahur-473a6234b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-200 transition duration-200 hover:border-orange-400 hover:text-orange-400"
            >
              <Link2 className="h-4 w-4" />
              Connect on LinkedIn
            </a>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="mt-6 border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5 text-xs lg:px-14">
          <p className="text-zinc-500">
            © 2026 CodeLab. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}