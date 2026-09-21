"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Menu,
  MessageCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardUserMenu from "@/components/DashboardUserMenu";

type ProblemRelation =
  | {
      title: string;
      slug: string;
      difficulty?: string;
    }
  | {
      title: string;
      slug: string;
      difficulty?: string;
    }[]
  | null;

type FeedbackRelation =
  | {
      overall_score: number;
    }
  | {
      overall_score: number;
    }[]
  | null;

type Attempt = {
  id: string;
  solution: string;
  language: string;
  status: string;
  created_at: string;
  problems: ProblemRelation;
  feedback: FeedbackRelation;
};

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [fullName, setFullName] = useState("Developer");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setError("Please sign in to view your history.");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();

        const name =
          profile?.full_name ||
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "Developer";

        setFullName(name);

        const { data, error: historyError } = await supabase
          .from("attempts")
          .select(`
            id,
            solution,
            language,
            status,
            created_at,
            problems (
              title,
              slug,
              difficulty
            ),
            feedback (
              overall_score
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (historyError) {
          throw historyError;
        }

        setAttempts((data as Attempt[]) || []);
      } catch (error) {
        console.error("History loading error:", error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : JSON.stringify(error);

        setError(`Unable to load history: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, []);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getProblem(problem: ProblemRelation) {
    if (!problem) {
      return null;
    }

    return Array.isArray(problem) ? problem[0] || null : problem;
  }

  function getFeedback(feedback: FeedbackRelation) {
    if (!feedback) {
      return null;
    }

    return Array.isArray(feedback) ? feedback[0] || null : feedback;
  }

  const solvedCount = attempts.filter(
    (attempt) => attempt.status === "submitted"
  ).length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080909] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />

        <div className="absolute -left-32 top-20 h-[450px] w-[450px] rounded-full bg-orange-500/[0.025] blur-[120px]" />

        <div className="absolute right-[-180px] top-[30%] h-[500px] w-[500px] rounded-full bg-orange-500/[0.025] blur-[140px]" />

        <div className="absolute left-[17%] top-[46%] h-1 w-1 rounded-full bg-orange-500 shadow-[0_0_18px_6px_rgba(249,115,22,0.35)]" />

        <div className="absolute right-[25%] top-[18%] h-1 w-1 rounded-full bg-orange-500 shadow-[0_0_18px_6px_rgba(249,115,22,0.3)]" />

        <div className="absolute right-[8%] top-[58%] h-1 w-1 rounded-full bg-orange-500 shadow-[0_0_18px_6px_rgba(249,115,22,0.25)]" />
      </div>

      <DashboardSidebar />

      <div className="relative z-10 lg:ml-[244px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-zinc-800/70 bg-[#080909]/85 px-5 backdrop-blur-xl sm:px-8 xl:px-10">
          <div className="relative hidden w-full max-w-[495px] sm:block">
            <Activity className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

            <input
              type="text"
              placeholder="Search problems, topics, or anything..."
              className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 pl-11 pr-20 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-orange-500/50"
            />

            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
              <kbd className="rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 text-[10px] text-zinc-600">
                Ctrl
              </kbd>

              <kbd className="rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 text-[10px] text-zinc-600">
                K
              </kbd>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold sm:hidden"
          >
            <Code2 className="h-6 w-6 text-orange-500" />

            <span>
              Code<span className="text-orange-500">Lab</span>
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <button
              type="button"
              className="relative text-zinc-500 transition hover:text-zinc-200"
              aria-label="Notifications"
            >
              <MessageCircle size={20} />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-500" />
            </button>

            <div className="hidden sm:flex">
              <DashboardUserMenu name={fullName} />
            </div>

            <button
              type="button"
              className="text-zinc-500 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 xl:px-10">
          <section className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-orange-500/70">
                Your activity
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Attempt History
              </h1>

              <p className="mt-2 text-sm text-zinc-500 sm:text-base">
                Review your previous submissions and AI feedback.
              </p>
            </div>

            <div className="hidden text-right xl:block">
              <p className="text-sm text-zinc-500">
                {solvedCount} submission
                {solvedCount === 1 ? "" : "s"}
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Keep improving, one problem at a time.
              </p>

              <div className="ml-auto mt-3 h-px w-8 bg-orange-500" />
            </div>
          </section>

          {isLoading ? (
            <section className="rounded-2xl border border-zinc-800/80 bg-[#0e1112]/90 p-10">
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-800 border-t-orange-500" />

                  <p className="mt-4 text-sm text-zinc-500">
                    Loading attempt history...
                  </p>
                </div>
              </div>
            </section>
          ) : error ? (
            <section className="rounded-2xl border border-red-500/20 bg-[#0e1112]/90 p-10">
              <div className="mx-auto max-w-lg text-center">
                <FileText className="mx-auto h-10 w-10 text-red-400/70" />

                <h2 className="mt-4 text-xl font-semibold text-zinc-100">
                  Unable to load history
                </h2>

                <p className="mt-2 text-sm leading-6 text-red-400/80">
                  {error}
                </p>

                <Link
                  href="/problems"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
                >
                  Go to Problems
                  <ArrowRight size={16} />
                </Link>
              </div>
            </section>
          ) : attempts.length === 0 ? (
            <section className="rounded-2xl border border-zinc-800/80 bg-[#0e1112]/90 p-10">
              <div className="flex min-h-[330px] items-center justify-center">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/[0.06]">
                    <FileText className="h-7 w-7 text-orange-500" />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold text-zinc-100">
                    No attempts yet
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Your submissions and AI evaluations will appear here once
                    you start solving problems.
                  </p>

                  <Link
                    href="/problems"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-orange-400"
                  >
                    Explore Problems
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <section className="space-y-3">
              {attempts.map((attempt) => {
                const problem = getProblem(attempt.problems);
                const feedback = getFeedback(attempt.feedback);

                const score = feedback?.overall_score;

                return (
                  <article
                    key={attempt.id}
                    className="group rounded-2xl border border-zinc-800/80 bg-[#0e1112]/90 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-[#101314]"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="truncate text-base font-semibold text-zinc-100 sm:text-lg">
                            {problem?.title || "Unknown Problem"}
                          </h2>

                          {problem?.difficulty && (
                            <span
                              className={`rounded-md border px-2.5 py-1 text-[10px] font-medium ${
                                problem.difficulty === "Easy"
                                  ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400"
                                  : problem.difficulty === "Medium"
                                    ? "border-orange-500/20 bg-orange-500/[0.06] text-orange-400"
                                    : "border-red-500/20 bg-red-500/[0.06] text-red-400"
                              }`}
                            >
                              {problem.difficulty}
                            </span>
                          )}

                          <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2.5 py-1 text-[10px] capitalize text-zinc-500">
                            {attempt.status}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-600">
                          <span className="flex items-center gap-1.5">
                            <Clock3 size={13} />
                            {formatDate(attempt.created_at)}
                          </span>

                          <span className="capitalize">
                            Language: {attempt.language}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                          {feedback ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                              <span className="text-xs text-zinc-500">
                                AI evaluation completed
                              </span>
                            </>
                          ) : (
                            <span className="text-xs text-zinc-600">
                              AI feedback unavailable
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-5 border-t border-zinc-800/70 pt-4 lg:min-w-[240px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                            AI Score
                          </p>

                          <p className="mt-1 text-2xl font-bold text-orange-400">
                            {typeof score === "number" ? score : "—"}

                            <span className="ml-1 text-sm font-normal text-zinc-600">
                              / 10
                            </span>
                          </p>
                        </div>

                        {feedback ? (
                          <Link
                            href={`/feedback/${attempt.id}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-2.5 text-xs font-medium text-zinc-300 transition hover:border-orange-500/40 hover:text-orange-400"
                          >
                            View Feedback
                            <ArrowRight size={14} />
                          </Link>
                        ) : (
                          <span className="text-xs text-zinc-700">
                            No feedback
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}

          {!isLoading && !error && attempts.length > 0 && (
            <div className="mt-8 flex items-center justify-between border-t border-zinc-800/70 pt-5">
              <Link
                href="/problems"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-orange-400"
              >
                Explore more problems
                <ArrowRight size={15} />
              </Link>

              <span className="text-xs text-zinc-700">
                {attempts.length} total attempt
                {attempts.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}