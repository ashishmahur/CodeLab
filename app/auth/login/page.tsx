"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  useState(() => {
    searchParams.then((params) => {
      if (params.message) {
        setMessage(params.message);
      }
    });
  });

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#090909] text-zinc-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full border border-orange-500/20" />

          <div className="absolute -bottom-56 -left-32 h-[520px] w-[520px] rounded-full border border-orange-500/20" />

          <div className="absolute right-[-180px] top-[-120px] h-[500px] w-[500px] rounded-full border border-orange-500/10" />

          <div className="absolute left-[8%] top-[25%] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_18px_6px_rgba(249,115,22,0.35)]" />

          <div className="absolute left-[32%] top-[15%] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_18px_6px_rgba(249,115,22,0.3)]" />

          <div className="absolute bottom-[20%] left-[5%] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_18px_6px_rgba(249,115,22,0.25)]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <Link
          href="/"
          className="group absolute left-6 top-6 z-50 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-2 text-sm font-medium text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400 md:left-10 md:top-8"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Home
        </Link>

        <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center px-6 py-10 lg:px-12">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_0.9fr] xl:gap-20">
            <section className="relative flex min-h-[620px] flex-col justify-center px-2 sm:px-8 lg:px-10">
              <div className="animate-login-content">
                <Link
                  href="/"
                  className="mb-12 inline-flex w-fit items-center gap-2 text-xl font-semibold tracking-tight"
                >
                  <Code2 className="h-7 w-7 text-orange-500" />

                  <span>
                    Code<span className="text-orange-500">Lab</span>
                  </span>
                </Link>

                <p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-zinc-500">
                  Practice · Design · Improve
                </p>

                <h1 className="max-w-2xl text-6xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-7xl xl:text-8xl">
                  <span className="block text-zinc-100">Practice</span>
                  <span className="block text-zinc-100">Better.</span>
                  <span className="block text-orange-500">Build Better.</span>
                </h1>

                <p className="mt-8 max-w-md text-base leading-7 text-zinc-400 sm:text-lg">
                  A developer practice platform built for real growth.
                </p>

                <div className="mt-10 h-px w-16 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.7)]" />

                <p className="mt-5 text-xs font-medium uppercase tracking-[0.35em] text-orange-400/80">
                  Learn · Practice · Solve · Grow
                </p>
              </div>
            </section>

            <section className="flex items-center justify-center px-2 sm:px-8 lg:px-0">
              <div className="login-card relative w-full max-w-[520px]">
                <div className="pointer-events-none absolute -inset-3 rounded-[30px] bg-orange-500/10 blur-2xl" />

                <div className="login-card-inner relative rounded-[28px] border border-orange-500/80 bg-[#111214]/95 p-7 shadow-[0_0_25px_rgba(249,115,22,0.18),0_0_80px_rgba(249,115,22,0.08)] backdrop-blur-xl sm:p-10">
                  <div className="absolute right-7 top-7 text-orange-500/30">
                    <Code2 className="h-7 w-7" />
                  </div>

                  <div className="mb-8">
                    <p className="mb-4 text-sm font-medium text-orange-400">
                      Welcome back
                    </p>

                    <div className="mb-5 h-0.5 w-10 bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.7)]" />

                    <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                      Sign in to CodeLab
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-zinc-500">
                      Continue your journey and keep building.
                    </p>
                  </div>

                  {message && (
                    <div className="mb-6 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-center">
                      <p className="text-sm font-medium text-orange-400">
                        {message}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-zinc-300"
                      >
                        Email address
                      </label>

                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                          className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950/80 pl-11 pr-4 text-sm text-zinc-100 outline-none transition duration-200 placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium text-zinc-300"
                        >
                          Password
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            setError(
                              "Password reset will be added next."
                            )
                          }
                          className="text-xs font-medium text-orange-400 transition hover:text-orange-300"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) =>
                            setPassword(event.target.value)
                          }
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          required
                          className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950/80 pl-11 pr-12 text-sm text-zinc-100 outline-none transition duration-200 placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-orange-400"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm leading-5 text-red-400">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-semibold text-zinc-950 shadow-[0_0_25px_rgba(249,115,22,0.2)] transition duration-200 hover:bg-orange-400 hover:shadow-[0_0_35px_rgba(249,115,22,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Signing in..." : "Sign in"}

                      {!loading && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      )}
                    </button>
                  </form>

                  <div className="my-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-xs text-zinc-600">OR</span>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>

                  <p className="text-center text-sm text-zinc-500">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="font-medium text-orange-400 transition hover:text-orange-300"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes contentJump {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes cardFloat {
          0%,
          100% {
            transform: rotate(2.5deg) translateY(0);
          }

          50% {
            transform: rotate(2.5deg) translateY(-8px);
          }
        }

        .animate-login-content {
          animation: contentJump 4s ease-in-out infinite;
        }

        .login-card {
          animation: cardFloat 5s ease-in-out infinite;
          transform-origin: center;
        }

        @media (max-width: 1023px) {
          .login-card {
            animation: none;
            transform: rotate(0deg);
          }

          .animate-login-content {
            animation: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-card,
          .animate-login-content {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}