"use client";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Code2,
  GitBranch,
  Layers3,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Terminal,
  TreePine,
  Network,
  Braces,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    title: "DSA Practice",
    description: "Handpicked problems across major topics.",
    icon: Code2,
    accent: "orange",
  },
  {
    title: "LLD Problems",
    description: "Real-world design problems to sharpen your thinking.",
    icon: Layers3,
    accent: "purple",
  },
  {
    title: "AI Code Review",
    description: "Instant feedback with detailed scoring.",
    icon: Bot,
    accent: "cyan",
  },
  {
    title: "Track Progress",
    description: "See your growth and stay consistent.",
    icon: BarChart3,
    accent: "pink",
  },
];

const topics = [
  { name: "Arrays", icon: Braces },
  { name: "Strings", icon: Terminal },
  { name: "Linked Lists", icon: GitBranch },
  { name: "Trees", icon: TreePine },
  { name: "Graphs", icon: Network },
  { name: "Dynamic Programming", icon: BrainCircuit },
  { name: "LLD", icon: Layers3 },
];

const steps = [
  {
    number: "01",
    title: "Choose a Problem",
    description: "Pick DSA or LLD based on your goal.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Write Your Solution",
    description: "Code inside the online editor.",
    icon: Terminal,
  },
  {
    number: "03",
    title: "Get AI Feedback",
    description: "Receive detailed feedback and scores.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Improve & Repeat",
    description: "Learn from mistakes and get better.",
    icon: BarChart3,
  },
];

const codeLines = [
  "function twoSum(nums, target) {",
  "  const map = new Map();",
  "  for (let i = 0; i < nums.length; i++) {",
  "    const complement = target - nums[i];",
  "    if (map.has(complement)) {",
  "      return [map.get(complement), i];",
  "    }",
  "    map.set(nums[i], i);",
  "  }",
  "}",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090a] text-zinc-100">
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(2deg);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.12);
          }
        }

        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 80px 80px;
          }
        }

        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes borderGlow {
          0%,
          100% {
            box-shadow:
              0 0 0 rgba(249, 115, 22, 0),
              inset 0 0 0 rgba(249, 115, 22, 0);
          }
          50% {
            box-shadow:
              0 0 35px rgba(249, 115, 22, 0.1),
              inset 0 0 25px rgba(249, 115, 22, 0.03);
          }
        }

        @keyframes barOne {
          0% {
            width: 0%;
          }
          100% {
            width: 92%;
          }
        }

        @keyframes barTwo {
          0% {
            width: 0%;
          }
          100% {
            width: 78%;
          }
        }

        @keyframes barThree {
          0% {
            width: 0%;
          }
          100% {
            width: 96%;
          }
        }

        @keyframes barFour {
          0% {
            width: 0%;
          }
          100% {
            width: 84%;
          }
        }

        @keyframes barFive {
          0% {
            width: 0%;
          }
          100% {
            width: 90%;
          }
        }

        @keyframes revealUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow 7s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .animate-grid {
          animation: gridMove 12s linear infinite;
        }

        .animate-border-glow {
          animation: borderGlow 4s ease-in-out infinite;
        }

        .animate-reveal {
          animation: revealUp 0.8s ease-out both;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-600 {
          animation-delay: 600ms;
        }

        .code-scan {
          animation: scan 4s ease-in-out infinite;
        }

        .bar-one {
          animation: barOne 1.2s ease-out 0.3s both;
        }

        .bar-two {
          animation: barTwo 1.2s ease-out 0.45s both;
        }

        .bar-three {
          animation: barThree 1.2s ease-out 0.6s both;
        }

        .bar-four {
          animation: barFour 1.2s ease-out 0.75s both;
        }

        .bar-five {
          animation: barFive 1.2s ease-out 0.9s both;
        }

        .shimmer {
          position: relative;
          overflow: hidden;
        }

        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 45%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          transform: translateX(-120%);
          animation: shimmer 4s ease-in-out infinite;
        }
      `}</style>

      {/* Hero */}
      <section className="relative isolate min-h-[680px] border-b border-zinc-900">
        {/* Animated grid */}
        <div
          className="animate-grid pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Background glow */}
        <div className="pointer-events-none absolute left-[45%] top-20 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[120px] animate-pulse-glow" />
        <div className="pointer-events-none absolute right-[-100px] top-32 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px] animate-pulse-glow" />

        <div className="relative mx-auto grid max-w-[1450px] items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-14 lg:py-24">
          {/* Hero content */}
          <div className="animate-reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-4 py-2 text-xs font-medium text-zinc-300 backdrop-blur">
              <span>DSA</span>
              <span className="text-zinc-700">•</span>
              <span>LLD</span>
              <span className="text-zinc-700">•</span>
              <span>AI FEEDBACK</span>
              <span className="ml-1 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
            </div>

            <h1 className="mt-7 text-6xl font-black leading-[0.92] tracking-[-0.05em] text-white sm:text-7xl lg:text-[86px]">
              Solve.
              <br />
              Learn.
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent">
                Level Up.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Practice DSA and Low Level Design with real problems and
              AI-powered feedback.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="group relative overflow-hidden rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Practicing
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/problems"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/70 px-6 py-3.5 font-semibold text-zinc-200 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:text-white"
              >
                Explore Problems
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-zinc-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#08090a] bg-zinc-800 text-[10px] text-zinc-400"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <span>
                Built for developers who want to{" "}
                <span className="text-zinc-300">actually improve.</span>
              </span>
            </div>
          </div>

          {/* Code visual */}
          <div className="relative min-h-[460px] animate-reveal delay-300">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px] animate-pulse-glow" />

            {/* Floating decorative blocks */}
            <div className="animate-float-slow absolute left-0 top-20 hidden h-16 w-16 rotate-[-12deg] rounded-xl border border-orange-500/20 bg-zinc-900/80 backdrop-blur md:flex items-center justify-center text-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.08)]">
              <Code2 size={27} />
            </div>

            <div className="animate-float absolute right-2 top-8 hidden h-16 w-16 rotate-[10deg] rounded-xl border border-purple-500/20 bg-zinc-900/80 backdrop-blur md:flex items-center justify-center text-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.08)]">
              <BrainCircuit size={27} />
            </div>

            {/* Editor */}
            <div className="animate-float-slow relative z-10 mx-auto mt-8 w-full max-w-[650px] rotate-[1deg] rounded-2xl border border-zinc-700/80 bg-[#0d0f11]/95 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur">
              <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#090a0b]">
                <div className="code-scan pointer-events-none absolute left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.8)]" />

                <div className="flex h-12 items-center justify-between border-b border-zinc-800 px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/70" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-md border border-zinc-800 px-3 py-1.5 text-[11px] text-zinc-500">
                      JavaScript
                    </span>
                    <span className="rounded-md bg-orange-500 px-3 py-1.5 text-[11px] font-semibold text-white">
                      Run
                    </span>
                  </div>
                </div>

                <div className="p-5 font-mono text-[11px] leading-6 sm:text-xs">
                  {codeLines.map((line, index) => (
                    <div key={index} className="flex">
                      <span className="mr-5 w-5 select-none text-right text-zinc-700">
                        {index + 1}
                      </span>
                      <span
                        className={
                          index === 0
                            ? "text-orange-300"
                            : index === 2 || index === 4
                              ? "text-purple-300"
                              : "text-zinc-400"
                        }
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI score */}
            <div className="animate-float absolute -bottom-2 right-0 z-20 w-52 rounded-2xl border border-zinc-700 bg-[#111315]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur sm:right-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">
                  AI Review
                </span>
                <Bot size={17} className="text-orange-400" />
              </div>

              <div className="mt-2 text-4xl font-bold text-green-400">
                8.5<span className="text-lg text-zinc-500">/10</span>
              </div>

              <div className="mt-4 space-y-2">
                {[
                  "Correct approach",
                  "Good complexity",
                  "Clean code structure",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[11px] text-zinc-400"
                  >
                    <CheckCircle2 size={13} className="text-green-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative border-b border-zinc-900 py-16">
        <div className="mx-auto grid max-w-[1450px] gap-4 px-6 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:px-14">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`group shimmer animate-reveal delay-${(index + 1) * 100} relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0f11] p-6 transition duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:bg-[#111315]`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                    feature.accent === "orange"
                      ? "border-orange-500/20 bg-orange-500/10 text-orange-400"
                      : feature.accent === "purple"
                        ? "border-purple-500/20 bg-purple-500/10 text-purple-400"
                        : feature.accent === "cyan"
                          ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
                          : "border-pink-500/20 bg-pink-500/10 text-pink-400"
                  } transition duration-300 group-hover:scale-110`}
                >
                  <Icon size={23} />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-white">
                  {feature.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {feature.description}
                </p>

                <ArrowRight
                  size={17}
                  className="absolute bottom-6 right-6 text-zinc-700 transition duration-300 group-hover:translate-x-1 group-hover:text-orange-400"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Topics */}
      <section className="relative border-b border-zinc-900 py-20">
        <div className="mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                Popular Topics
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Practice what you want to master.
              </h2>
            </div>

            <Link
              href="/problems"
              className="hidden items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:border-orange-500/50 hover:text-orange-400 sm:flex"
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {topics.map((topic) => {
              const Icon = topic.icon;

              return (
                <Link
                  key={topic.name}
                  href="/problems"
                  className="group flex shrink-0 items-center gap-3 rounded-xl border border-zinc-800 bg-[#0d0f11] px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-[#111315]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-orange-400 transition group-hover:bg-orange-500/10">
                    <Icon size={18} />
                  </span>

                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                    {topic.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-b border-zinc-900 py-20">
        <div className="mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From problem to progress.
          </h2>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="group relative">
                  <div className="relative rounded-2xl border border-zinc-800 bg-[#0d0f11] p-6 transition duration-500 hover:-translate-y-2 hover:border-orange-500/40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-600">
                        {step.number}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-orange-400 transition duration-300 group-hover:scale-110 group-hover:border-orange-500/30">
                        <Icon size={21} />
                      </div>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {step.description}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-800 bg-[#08090a] text-zinc-600 lg:flex">
                      <ArrowRight size={13} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Review */}
      <section className="relative overflow-hidden border-b border-zinc-900 py-20">
        <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/5 blur-[100px]" />

        <div className="mx-auto grid max-w-[1450px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:px-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              AI Code Review
            </p>

            <h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Detailed feedback.
              <br />
              <span className="text-zinc-500">Not just a score.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
              Your code gets reviewed for correctness, approach, complexity,
              and quality so you know exactly what to improve.
            </p>

            <Link
              href="/auth/signup"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
            >
              Try a Problem
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="animate-border-glow rounded-2xl border border-zinc-800 bg-[#0d0f11] p-4 shadow-2xl">
            <div className="rounded-xl border border-zinc-800 bg-[#090a0b] p-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-4">
                  <span className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-500">
                    Your Code
                  </span>
                  <span className="rounded-md border border-orange-500/20 bg-orange-500/5 px-3 py-1.5 text-xs text-orange-400">
                    AI Feedback
                  </span>
                </div>

                <Bot size={20} className="text-orange-400" />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-[1fr_0.8fr]">
                <div className="space-y-5">
                  {[
                    ["Correctness", "4 / 4", "bar-one"],
                    ["Approach", "2 / 2", "bar-two"],
                    ["Time Complexity", "2 / 2", "bar-three"],
                    ["Space Complexity", "1 / 1", "bar-four"],
                    ["Code Quality", "1 / 1", "bar-five"],
                  ].map(([label, score, bar]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{label}</span>
                        <span className="text-green-400">{score}</span>
                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className={`h-full rounded-full bg-green-400 ${bar}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                  <p className="text-xs font-medium text-zinc-500">
                    Overall Score
                  </p>

                  <div className="mt-2 text-5xl font-bold text-white">
                    10<span className="text-xl text-zinc-600">/10</span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex gap-2 text-xs text-zinc-400">
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-green-400"
                      />
                      Strong approach
                    </div>

                    <div className="flex gap-2 text-xs text-zinc-400">
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-green-400"
                      />
                      Good complexity
                    </div>

                    <div className="flex gap-2 text-xs text-zinc-400">
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-green-400"
                      />
                      Clean implementation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.03] via-transparent to-purple-500/[0.04]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 shadow-[0_0_40px_rgba(249,115,22,0.1)] animate-float">
            <Sparkles size={25} />
          </div>

          <h2 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-6xl">
            Your next problem
            <br />
            <span className="text-orange-500">is waiting.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-500">
            Start practicing today and turn every mistake into progress.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/auth/signup"
              className="group flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.15)] transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/problems"
              className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3.5 font-semibold text-zinc-300 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:text-white"
            >
              Explore Problems
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#060707]">
        <div className="mx-auto flex max-w-[1450px] flex-col gap-4 px-6 py-7 text-sm sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="text-orange-500">&lt;/&gt;</span>
              CodeLab
            </div>
            <p className="mt-1 text-xs text-zinc-600">
              Practice. Code. Improve.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <Link href="/" className="transition hover:text-zinc-300">
              Home
            </Link>
            <Link
              href="/problems"
              className="transition hover:text-zinc-300"
            >
              Problems
            </Link>
            <Link href="/about" className="transition hover:text-zinc-300">
              About
            </Link>
          </div>

          <p className="text-xs text-zinc-700">
            © 2026 CodeLab. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}