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
  User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name.trim(),
        },
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(
      "Account created successfully. Please check your email to verify your account."
    );

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setLoading(false);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080808] text-white">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Orange glow */}
      <div className="pointer-events-none absolute right-[8%] top-[30%] h-[420px] w-[420px] rounded-full bg-orange-500/[0.035] blur-[120px]" />

      {/* Top-left orbit */}
      <div className="pointer-events-none absolute -left-24 -top-28 h-[350px] w-[350px] rounded-full border border-orange-500/20" />

      <div className="pointer-events-none absolute left-10 top-20 h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.9)]" />

      {/* Back to Home */}
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

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 items-center gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-16 lg:py-12">
        {/* LEFT SIDE */}
        <section className="hidden lg:block">
          <div className="animate-[slideIn_0.8s_ease-out]">
            <div className="mb-10 flex items-center gap-2 text-xl font-bold">
              <Code2 className="h-6 w-6 text-orange-500" />
              <span>
                Code<span className="text-orange-500">Lab</span>
              </span>
            </div>

            <p className="mb-6 text-xs font-medium tracking-[0.5em] text-zinc-500">
              PRACTICE · DESIGN · IMPROVE
            </p>

            <h1 className="max-w-[650px] text-[64px] font-bold leading-[0.95] tracking-[-0.045em] xl:text-[76px]">
              Start
              <br />
              Your Next
              <br />
              <span className="text-orange-500">Chapter.</span>
            </h1>

            <p className="mt-8 max-w-[570px] text-lg leading-7 text-zinc-500">
              Create an account and start building better development skills,
              one problem at a time.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-16 bg-orange-500" />
              <span className="text-xs tracking-[0.4em] text-orange-500">
                LEARN · PRACTICE · SOLVE · GROW
              </span>
            </div>
          </div>
        </section>

        {/* SIGNUP CARD */}
        <section className="flex w-full justify-center lg:justify-end">
          <div className="w-full max-w-[520px] rounded-[28px] border border-orange-500/70 bg-[#111111] p-6 shadow-[0_0_35px_rgba(249,115,22,0.12)] transition-transform duration-500 hover:scale-[1.015] sm:p-8">
            {/* Card header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-orange-500">
                  Create your account
                </p>

                <div className="mt-3 h-[3px] w-12 bg-orange-500" />
              </div>

              <Code2 className="h-7 w-7 text-orange-500/50" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-[34px]">
              Join CodeLab
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Start your journey and become a better developer.
            </p>

            <form onSubmit={handleSignup} className="mt-7 space-y-4">
              {/* Full name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Full name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-zinc-600" />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="h-12 w-full rounded-xl border border-zinc-800 bg-[#09090b] pl-11 pr-4 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-700 focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/20"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-zinc-600" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-zinc-800 bg-[#09090b] pl-11 pr-4 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-700 focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/20"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-zinc-600" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="h-12 w-full rounded-xl border border-zinc-800 bg-[#09090b] pl-11 pr-12 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-700 focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/20"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors hover:text-orange-400"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Confirm password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-zinc-600" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="h-12 w-full rounded-xl border border-zinc-800 bg-[#09090b] pl-11 pr-12 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-700 focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/20"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors hover:text-orange-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 px-4 py-3 text-sm leading-5 text-orange-400">
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-bold text-black shadow-[0_0_22px_rgba(249,115,22,0.16)] transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-xs text-zinc-600">OR</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            {/* Login */}
            <p className="text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-orange-500 transition-colors hover:text-orange-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}