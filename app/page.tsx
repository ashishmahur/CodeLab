"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Braces,
  Bot,
  CheckCircle2,
  Code2,
  GitBranch,
  Layers3,
  Network,
  Sparkles,
  Terminal,
  TreePine,
} from "lucide-react";

const features = [
  {
    title: "DSA Practice",
    description: "Handpicked problems across major topics.",
    icon: Code2,
    color: "orange",
  },
  {
    title: "LLD Problems",
    description: "Real-world design problems to sharpen your thinking.",
    icon: Layers3,
    color: "purple",
  },
  {
    title: "AI Code Review",
    description: "Instant feedback with detailed scoring.",
    icon: Bot,
    color: "cyan",
  },
  {
    title: "Track Progress",
    description: "See your growth and stay consistent.",
    icon: BarChart3,
    color: "pink",
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
    color: "orange",
  },
  {
    number: "02",
    title: "Write Your Solution",
    description: "Code inside the online editor.",
    icon: Terminal,
    color: "purple",
  },
  {
    number: "03",
    title: "Get AI Feedback",
    description: "Receive detailed feedback and scores.",
    icon: Sparkles,
    color: "pink",
  },
  {
    number: "04",
    title: "Improve & Repeat",
    description: "Learn from mistakes and get better.",
    icon: BarChart3,
    color: "green",
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

const heroDots = [
  ["left-[8%]", "top-[20%]"],
  ["left-[18%]", "top-[38%]"],
  ["left-[28%]", "top-[11%]"],
  ["left-[38%]", "top-[27%]"],
  ["left-[48%]", "top-[16%]"],
  ["left-[58%]", "top-[18%]"],
  ["left-[68%]", "top-[42%]"],
  ["left-[76%]", "top-[30%]"],
  ["left-[84%]", "top-[55%]"],
  ["left-[91%]", "top-[17%]"],
  ["left-[24%]", "top-[72%]"],
  ["left-[45%]", "top-[67%]"],
  ["left-[62%]", "top-[76%]"],
  ["left-[79%]", "top-[68%]"],
];

const purpleDots = [
  ["left-[7%]", "top-[18%]"],
  ["left-[18%]", "top-[42%]"],
  ["left-[31%]", "top-[12%]"],
  ["left-[43%]", "top-[72%]"],
  ["left-[56%]", "top-[25%]"],
  ["left-[67%]", "top-[58%]"],
  ["left-[79%]", "top-[18%]"],
  ["left-[91%]", "top-[70%]"],
  ["left-[24%]", "top-[82%]"],
  ["left-[72%]", "top-[84%]"],
];

const cyanDots = [
  ["left-[6%]", "top-[25%]"],
  ["left-[17%]", "top-[68%]"],
  ["left-[29%]", "top-[16%]"],
  ["left-[41%]", "top-[82%]"],
  ["left-[53%]", "top-[35%]"],
  ["left-[64%]", "top-[12%]"],
  ["left-[76%]", "top-[65%]"],
  ["left-[88%]", "top-[28%]"],
  ["left-[94%]", "top-[82%]"],
  ["left-[34%]", "top-[50%]"],
];

const pinkDots = [
  ["left-[8%]", "top-[70%]"],
  ["left-[19%]", "top-[25%]"],
  ["left-[32%]", "top-[78%]"],
  ["left-[45%]", "top-[18%]"],
  ["left-[57%]", "top-[63%]"],
  ["left-[69%]", "top-[30%]"],
  ["left-[81%]", "top-[76%]"],
  ["left-[92%]", "top-[44%]"],
  ["left-[26%]", "top-[46%]"],
  ["left-[74%]", "top-[12%]"],
];

const greenDots = [
  ["left-[6%]", "top-[34%]"],
  ["left-[18%]", "top-[76%]"],
  ["left-[30%]", "top-[18%]"],
  ["left-[42%]", "top-[62%]"],
  ["left-[55%]", "top-[30%]"],
  ["left-[67%]", "top-[78%]"],
  ["left-[79%]", "top-[20%]"],
  ["left-[91%]", "top-[60%]"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050608] text-zinc-100">
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(2deg);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.12);
          }
        }

        @keyframes gridMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 60px 60px;
          }
        }

        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          85% {
            opacity: 0.7;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
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

        @keyframes barOne {
          from {
            width: 0;
          }
          to {
            width: 92%;
          }
        }

        @keyframes barTwo {
          from {
            width: 0;
          }
          to {
            width: 78%;
          }
        }

        @keyframes barThree {
          from {
            width: 0;
          }
          to {
            width: 96%;
          }
        }

        @keyframes barFour {
          from {
            width: 0;
          }
          to {
            width: 84%;
          }
        }

        @keyframes barFive {
          from {
            width: 0;
          }
          to {
            width: 90%;
          }
        }

        .float {
          animation: float 5s ease-in-out infinite;
        }

        .float-slow {
          animation: floatSlow 7s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .grid-move {
          animation: gridMove 14s linear infinite;
        }

        .reveal {
          animation: reveal 0.8s ease-out both;
        }

        .dot-pulse {
          animation: dotPulse 3s ease-in-out infinite;
        }

        .code-scan {
          animation: scan 4s ease-in-out infinite;
        }

        .bar-one {
          animation: barOne 1.2s ease-out 0.2s both;
        }

        .bar-two {
          animation: barTwo 1.2s ease-out 0.35s both;
        }

        .bar-three {
          animation: barThree 1.2s ease-out 0.5s both;
        }

        .bar-four {
          animation: barFour 1.2s ease-out 0.65s both;
        }

        .bar-five {
          animation: barFive 1.2s ease-out 0.8s both;
        }

        .shimmer {
          position: relative;
          overflow: hidden;
        }

        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 40%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.07),
            transparent
          );
          transform: translateX(-120%);
          animation: shimmer 4s ease-in-out infinite;
        }
      `}</style>

      {/* HERO */}
      <section className="relative isolate min-h-[700px] overflow-hidden border-b border-orange-500/10">
        <div
          className="grid-move pointer-events-none absolute inset-0 opacity-[0.17]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.14) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-500/[0.08] blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-purple-500/[0.08] blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 left-[35%] h-72 w-72 rounded-full bg-orange-500/[0.05] blur-[120px]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_35%,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(168,85,247,0.1),transparent_25%),linear-gradient(180deg,#090909,#050608)]" />

        {heroDots.map(([left, top], index) => (
          <span
            key={index}
            className={`dot-pulse absolute ${left} ${top} h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.9)]`}
            style={{ animationDelay: `${index * 180}ms` }}
          />
        ))}

        <div className="pulse-glow pointer-events-none absolute left-[48%] top-20 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1450px] items-center gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:px-14 lg:py-24">
          <div className="reveal relative z-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.05] px-4 py-2 text-xs font-medium text-zinc-300 backdrop-blur">
              <span>DSA</span>
              <span className="text-orange-500/50">•</span>
              <span>LLD</span>
              <span className="text-orange-500/50">•</span>
              <span>AI FEEDBACK</span>
              <span className="ml-1 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            </div>

            <h1 className="mt-7 text-6xl font-black leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl lg:text-[88px]">
              Solve.
              <br />
              Learn.
              <br />
              <span className="font-serif italic font-black tracking-[-0.07em] text-orange-400 drop-shadow-[0_0_30px_rgba(249,115,22,0.25)]">
                Level Up.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Practice DSA and Low Level Design with real problems,
              AI-powered feedback and a community of learners.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="group flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-[0_0_35px_rgba(249,115,22,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:shadow-[0_0_50px_rgba(249,115,22,0.35)]"
              >
                Start Practicing
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
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

          <div className="relative min-h-[470px] reveal">
            <div className="pulse-glow absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[110px]" />

            <div className="float-slow absolute left-0 top-20 hidden h-16 w-16 rotate-[-12deg] items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/[0.05] text-orange-400 backdrop-blur md:flex">
              <Code2 size={27} />
            </div>

            <div className="float absolute right-2 top-8 hidden h-16 w-16 rotate-[10deg] items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/[0.05] text-purple-400 backdrop-blur md:flex">
              <BrainCircuit size={27} />
            </div>

            <div className="float-slow relative z-10 mx-auto mt-8 w-full max-w-[650px] rotate-[1deg] rounded-2xl border border-orange-500/20 bg-[#0d0f11]/95 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.7),0_0_50px_rgba(249,115,22,0.08)] backdrop-blur">
              <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#090a0b]">
                <div className="code-scan pointer-events-none absolute left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_18px_rgba(249,115,22,0.9)]" />

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

            <div className="float absolute -bottom-2 right-0 z-20 w-52 rounded-2xl border border-green-500/20 bg-[#101415]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur sm:right-2">
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

      {/* FEATURES */}
      <section className="relative overflow-hidden border-b border-purple-500/10 py-16">
        <div
          className="grid-move pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.12) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="pointer-events-none absolute -left-24 -top-20 h-80 w-80 rounded-full bg-purple-500/[0.11] blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-pink-500/[0.08] blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 left-[42%] h-64 w-64 rounded-full bg-purple-500/[0.06] blur-[110px]" />

        {purpleDots.map(([left, top], index) => (
          <span
            key={index}
            className={`dot-pulse absolute ${left} ${top} h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.8)]`}
            style={{ animationDelay: `${index * 220}ms` }}
          />
        ))}

        <div className="relative mx-auto grid max-w-[1450px] gap-4 px-6 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:px-14">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            const colors = {
              orange: "border-orange-500/25 bg-orange-500/10 text-orange-400",
              purple: "border-purple-500/25 bg-purple-500/10 text-purple-400",
              cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-400",
              pink: "border-pink-500/25 bg-pink-500/10 text-pink-400",
            };

            return (
              <div
                key={feature.title}
                style={{ animationDelay: `${index * 100}ms` }}
                className="shimmer group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0d10]/90 p-6 reveal transition duration-500 hover:-translate-y-2 hover:border-zinc-600"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${colors[feature.color as keyof typeof colors]} transition duration-300 group-hover:scale-110`}
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

      {/* POPULAR TOPICS */}
      <section className="relative overflow-visible border-b border-cyan-500/10 py-20">
        <div
          className="grid-move pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-cyan-500/[0.1] blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-blue-500/[0.08] blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-20 right-[30%] h-64 w-64 rounded-full bg-cyan-500/[0.05] blur-[110px]" />

        {cyanDots.map(([left, top], index) => (
          <span
            key={index}
            className={`dot-pulse absolute ${left} ${top} h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.85)]`}
            style={{ animationDelay: `${index * 210}ms` }}
          />
        ))}

        <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                Popular Topics
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Practice what you want to{" "}
                <span className="text-cyan-400">master.</span>
              </h2>
            </div>

            <Link
              href="/problems"
              className="hidden items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-2 text-sm text-zinc-400 transition hover:border-cyan-500/50 hover:text-cyan-400 sm:flex"
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="relative z-10 mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {topics.map((topic, index) => {
              const Icon = topic.icon;

              return (
                <Link
                  key={topic.name}
                  href="/problems"
                  className="group relative flex min-h-[88px] items-center gap-3 rounded-xl border border-zinc-800 bg-[#0b0d10]/95 px-4 py-4 transition-all duration-300 hover:z-20 hover:scale-[1.035] hover:border-cyan-500/50 hover:bg-[#101317] hover:shadow-[0_18px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(34,211,238,0.08)]"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition duration-300 ${
                      index % 3 === 0
                        ? "bg-orange-500/10 text-orange-400"
                        : index % 3 === 1
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-cyan-500/10 text-cyan-400"
                    } group-hover:scale-110`}
                  >
                    <Icon size={18} />
                  </span>

                  <span className="text-sm font-medium text-zinc-300 transition group-hover:text-white">
                    {topic.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden border-b border-pink-500/10 py-20">
        <div
          className="grid-move pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(236,72,153,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.12) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />

        <div className="pointer-events-none absolute -left-24 -top-16 h-80 w-80 rounded-full bg-pink-500/[0.09] blur-[125px]" />
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-purple-500/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 left-[45%] h-64 w-64 rounded-full bg-pink-500/[0.05] blur-[110px]" />

        {pinkDots.map(([left, top], index) => (
          <span
            key={index}
            className={`dot-pulse absolute ${left} ${top} h-1.5 w-1.5 rounded-full bg-pink-400 shadow-[0_0_14px_rgba(236,72,153,0.85)]`}
            style={{ animationDelay: `${index * 200}ms` }}
          />
        ))}

        <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
            How it works
          </p>

          <div className="flex items-end justify-between gap-6">
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From problem to{" "}
              <span className="text-pink-400">progress.</span>
            </h2>

            <span className="hidden text-sm text-zinc-600 sm:block">
              Four simple steps.
            </span>
          </div>

          <div className="relative mt-12 grid gap-4 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              const accent =
                step.color === "orange"
                  ? "text-orange-400 border-orange-500/30 bg-orange-500/10"
                  : step.color === "purple"
                    ? "text-purple-400 border-purple-500/30 bg-purple-500/10"
                    : step.color === "pink"
                      ? "text-pink-400 border-pink-500/30 bg-pink-500/10"
                      : "text-green-400 border-green-500/30 bg-green-500/10";

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-zinc-800 bg-[#0b0d10]/95 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-600"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-bold ${accent}`}
                    >
                      {step.number}
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-500 transition duration-300 group-hover:scale-110 ${
                        step.color === "orange"
                          ? "group-hover:text-orange-400"
                          : step.color === "purple"
                            ? "group-hover:text-purple-400"
                            : step.color === "pink"
                              ? "group-hover:text-pink-400"
                              : "group-hover:text-green-400"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="mt-8 text-lg font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-20 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-800 bg-[#08090a] text-zinc-600 lg:flex">
                      <ArrowRight size={13} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI REVIEW */}
      <section className="relative overflow-hidden border-b border-green-500/10 py-20">
        <div
          className="grid-move pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(74,222,128,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.11) 1px, transparent 1px)",
            backgroundSize: "35px 35px",
          }}
        />

        <div className="pointer-events-none absolute -left-24 -top-16 h-80 w-80 rounded-full bg-green-500/[0.08] blur-[125px]" />
        <div className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-cyan-500/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 right-[35%] h-64 w-64 rounded-full bg-green-500/[0.05] blur-[110px]" />

        {greenDots.map(([left, top], index) => (
          <span
            key={index}
            className={`dot-pulse absolute ${left} ${top} h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,0.85)]`}
            style={{ animationDelay: `${index * 230}ms` }}
          />
        ))}

        <div className="relative mx-auto grid max-w-[1450px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:px-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              AI Code Review
            </p>

            <h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Detailed feedback.
              <br />
              <span className="text-cyan-400">Not just a score.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
              Your code gets reviewed for correctness, approach, complexity,
              and quality so you know exactly what to improve.
            </p>

            <Link
              href="/auth/signup"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.15)] transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
            >
              Try a Problem
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-[#0b0d10]/95 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
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

                <div className="rounded-xl border border-green-500/15 bg-zinc-950 p-5">
                  <p className="text-xs font-medium text-zinc-500">
                    Overall Score
                  </p>

                  <div className="mt-2 text-5xl font-bold text-white">
                    10<span className="text-xl text-zinc-600">/10</span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      "Strong approach",
                      "Good complexity",
                      "Clean implementation",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex gap-2 text-xs text-zinc-400"
                      >
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-green-400"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative min-h-[520px] overflow-hidden">
        <Image
          src="/images/codelab-sunset.png"
          alt="Developer overlooking the city at sunset"
          fill
          priority={false}
          className="scale-[1.01] object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/55 via-[#07080a]/20 to-[#07080a]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/45 via-transparent to-[#07080a]/35" />

        <div
          className="grid-move pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.13) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-orange-500/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-purple-500/[0.08] blur-[120px]" />

        {heroDots.map(([left, top], index) => (
          <span
            key={index}
            className={`dot-pulse absolute ${left} ${top} h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.9)]`}
            style={{ animationDelay: `${index * 180}ms` }}
          />
        ))}

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-4xl items-center justify-center px-6 text-center">
          <div>
            <div className="float mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/15 text-orange-400 shadow-[0_0_40px_rgba(249,115,22,0.2)] backdrop-blur">
              <Sparkles size={25} />
            </div>

            <h2 className="mt-7 text-4xl font-black tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)] sm:text-6xl">
              Ready to become a better
              <br />
              <span className="text-orange-400">problem solver?</span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-200 drop-shadow-lg">
              Start practicing today and take your coding skills to the next
              level.
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <Link
                href="/auth/signup"
                className="group flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-[0_0_35px_rgba(249,115,22,0.3)] transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/problems"
                className="flex items-center gap-2 rounded-xl border border-white/25 bg-black/30 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/50"
              >
                Explore Problems
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-orange-500/10 bg-[#040506]">
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
            <Link href="/" className="transition hover:text-orange-400">
              Home
            </Link>

            <Link
              href="/problems"
              className="transition hover:text-orange-400"
            >
              Problems
            </Link>

            <Link href="/about" className="transition hover:text-orange-400">
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