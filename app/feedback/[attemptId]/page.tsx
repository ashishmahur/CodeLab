"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock3,
  Code2,
  Lightbulb,
  RotateCcw,
  Search,
  Trophy,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardUserMenu from "@/components/DashboardUserMenu";
import { createClient } from "@/lib/supabase/client";

type Feedback = {
  id: string;
  attempt_id: string;
  overall_score: number;
  design_score: number;
  extensibility_score: number;
  code_quality_score: number;
  edge_case_score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  created_at: string;
};

type AttemptInfo = {
  problemSlug: string | null;
  problemTitle: string | null;
  difficulty: string | null;
  language: string | null;
  createdAt: string | null;
};

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params.attemptId as string;

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [attempt, setAttempt] = useState<AttemptInfo>({
    problemSlug: null,
    problemTitle: null,
    difficulty: null,
    language: null,
    createdAt: null,
  });
  const [userName, setUserName] = useState("Developer");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFeedback() {
      try {
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth/login");
          return;
        }

        const [feedbackResult, attemptResult, profileResult] =
          await Promise.all([
            supabase
              .from("feedback")
              .select("*")
              .eq("attempt_id", attemptId)
              .single(),

            supabase
              .from("attempts")
              .select(`
                language,
                created_at,
                problem_id,
                problems (
                  slug,
                  title,
                  difficulty
                )
              `)
              .eq("id", attemptId)
              .eq("user_id", user.id)
              .single(),

            supabase
              .from("profiles")
              .select("full_name")
              .eq("id", user.id)
              .single(),
          ]);

        if (feedbackResult.error) {
          throw feedbackResult.error;
        }

        if (attemptResult.error) {
          throw attemptResult.error;
        }

        setFeedback(feedbackResult.data);

        const problem = Array.isArray(attemptResult.data.problems)
          ? attemptResult.data.problems[0]
          : attemptResult.data.problems;

        setAttempt({
          problemSlug: problem?.slug || null,
          problemTitle: problem?.title || null,
          difficulty: problem?.difficulty || null,
          language: attemptResult.data.language || null,
          createdAt: attemptResult.data.created_at || null,
        });

        if (profileResult.data?.full_name) {
          setUserName(profileResult.data.full_name);
        } else if (user.user_metadata?.full_name) {
          setUserName(user.user_metadata.full_name);
        } else {
          setUserName(user.email?.split("@")[0] || "Developer");
        }
      } catch (error) {
        console.error("Feedback loading error:", error);

        const errorMessage =
          error instanceof Error ? error.message : JSON.stringify(error);

        setError(`Unable to load feedback: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    }

    if (attemptId) {
      loadFeedback();
    }
  }, [attemptId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080a0b] text-zinc-100">
        <DashboardSidebar />

        <main className="min-h-screen lg:pl-[244px]">
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-orange-500" />
              <p className="mt-4 text-sm text-zinc-500">
                Loading your feedback...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div
        className="min-h-screen bg-[#080a0b] text-zinc-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      >
        <DashboardSidebar />

        <main className="min-h-screen lg:pl-[244px]">
          <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10">
       <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-orange-400"
          >
            <ArrowLeft size={16} />
            Back
          </button>

            <div className="mt-12 rounded-2xl border border-zinc-800 bg-[#0d1011] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                <AlertCircle className="text-red-400" size={22} />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-white">
                Feedback not found
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                {error || "No feedback was found for this attempt."}
              </p>

              <Link
                href="/problems"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
              >
                Browse Problems
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const scoreItems = [
    {
      label: "Design",
      score: feedback.design_score,
      max: 4,
    },
    {
      label: "Extensibility",
      score: feedback.extensibility_score,
      max: 3,
    },
    {
      label: "Code Quality",
      score: feedback.code_quality_score,
      max: 2,
    },
    {
      label: "Edge Cases",
      score: feedback.edge_case_score,
      max: 1,
    },
  ];

  const overallPercentage = Math.min(
    Math.max((feedback.overall_score / 10) * 100, 0),
    100
  );

  const formattedDate = attempt.createdAt
    ? new Date(attempt.createdAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-[#080a0b] text-zinc-100">
      <DashboardSidebar />

      <main
        className="min-h-screen lg:pl-[244px]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 82% 12%, rgba(249,115,22,0.07), transparent 18%),
            radial-gradient(circle at 72% 78%, rgba(249,115,22,0.035), transparent 22%),
            linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, 42px 42px, 42px 42px",
        }}
      >
        <span className="pointer-events-none fixed right-[8%] top-[13%] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_14px_5px_rgba(249,115,22,0.4)]" />
        <span className="pointer-events-none fixed right-[23%] top-[52%] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_13px_5px_rgba(249,115,22,0.3)]" />
        <span className="pointer-events-none fixed bottom-[12%] left-[28%] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_14px_5px_rgba(249,115,22,0.3)]" />

        <header className="sticky top-0 z-30 border-b border-zinc-800/70 bg-[#080a0b]/90 backdrop-blur-xl">
          <div className="flex h-[72px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
            <div className="relative hidden w-full max-w-[470px] md:block">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="text"
                placeholder="Search problems, topics, or concepts..."
                className="h-10 w-full rounded-lg border border-zinc-800 bg-[#0d1011] pl-11 pr-16 text-sm text-zinc-300 outline-none placeholder:text-zinc-600 transition focus:border-orange-500/40"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-600">
                ⌘ K
              </span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200">
                <Bell size={18} />
                <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_7px_rgba(249,115,22,0.8)]" />
              </button>

              <div className="h-6 w-px bg-zinc-800" />

              <DashboardUserMenu name={userName} />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1200px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-orange-400"
        >
          <ArrowLeft size={16} />
          Back
        </button>

          <div className="mt-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-500">
                Review
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your Design{" "}
                <span className="text-orange-500">Feedback</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                Review your submission and identify areas where your design can
                improve.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#0d1011]/90 px-5 py-4 xl:min-w-[310px]">
              <div className="flex items-center justify-between gap-6">
                <span className="text-xs text-zinc-600">Problem</span>
                <span className="text-sm font-semibold text-zinc-200">
                  {attempt.problemTitle || "Design Problem"}
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-6">
                <span className="text-xs text-zinc-600">Submitted on</span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Clock3 size={13} />
                  {formattedDate}
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-6">
                <span className="text-xs text-zinc-600">Language</span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Code2 size={13} />
                  {attempt.language || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          <section className="relative mt-7 overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d1011]/95 p-6 sm:p-7">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/[0.055] blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                  Overall Score
                </p>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Your submission has been reviewed
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                  Based on the structure, extensibility, code quality, and
                  edge-case handling in your submission.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div
                  className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#f97316 ${overallPercentage}%, #272b2d ${overallPercentage}% 100%)`,
                  }}
                >
                  <div className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full bg-[#0d1011]">
                    <span className="text-4xl font-bold text-white">
                      {feedback.overall_score}
                    </span>
                    <span className="text-xs text-zinc-600">/ 10</span>
                  </div>
                </div>

                <div className="hidden h-20 w-px bg-zinc-800 sm:block" />

                <div className="hidden min-w-[180px] sm:block">
                  <div className="flex items-center gap-2">
                    <Trophy size={17} className="text-orange-400" />
                    <span className="text-sm font-semibold text-orange-400">
                      Review Complete
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-zinc-600">
                    Use the feedback below to improve your next submission.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
                Evaluation
              </p>

              <h2 className="mt-1.5 text-xl font-bold text-white">
                Score Breakdown
              </h2>

              <p className="mt-1 text-sm text-zinc-600">
                See how you performed across different evaluation criteria.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {scoreItems.map((item) => {
                const percentage =
                  item.max > 0 ? (item.score / item.max) * 100 : 0;

                return (
                  <div
                    key={item.label}
                    className="group rounded-xl border border-zinc-800 bg-[#0d1011] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-orange-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-zinc-400">
                        {item.label}
                      </p>

                      <span className="text-xs text-zinc-600">
                        {Math.round(percentage)}%
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-white">
                        {item.score}
                      </span>

                      <span className="text-xs text-zinc-600">
                        / {item.max}
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-orange-500 transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            <FeedbackCard
              title="Strengths"
              subtitle="What you did well."
              icon={<CheckCircle2 size={20} />}
              iconClass="border-green-500/20 bg-green-500/10 text-green-400"
              items={feedback.strengths}
              itemIcon={<CheckCircle2 size={14} />}
              itemIconClass="text-green-400"
            />

            <FeedbackCard
              title="Areas for Improvement"
              subtitle="Where you can do better."
              icon={<AlertCircle size={20} />}
              iconClass="border-red-500/20 bg-red-500/10 text-red-400"
              items={feedback.weaknesses}
              itemIcon={<AlertCircle size={14} />}
              itemIconClass="text-red-400"
            />

            <FeedbackCard
              title="Suggestions"
              subtitle="Tips to enhance your design."
              icon={<Lightbulb size={20} />}
              iconClass="border-orange-500/20 bg-orange-500/10 text-orange-400"
              items={feedback.suggestions}
              itemIcon={<Lightbulb size={14} />}
              itemIconClass="text-orange-400"
            />
          </section>

          <section className="mt-8 flex flex-col gap-3 border-t border-zinc-900 pt-7 sm:flex-row">
            {attempt.problemSlug && (
              <Link
                href={`/problems/${attempt.problemSlug}`}
                className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-bold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-orange-400"
              >
                <RotateCcw size={17} />
                Try Again
              </Link>
            )}

            <Link
              href="/problems"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#0d1011] px-5 text-sm font-semibold text-zinc-300 transition duration-200 hover:-translate-y-0.5 hover:border-orange-500/50 hover:text-orange-400"
            >
              Try Another Problem
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/history"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#0d1011] px-5 text-sm font-semibold text-zinc-300 transition duration-200 hover:-translate-y-0.5 hover:border-orange-500/50 hover:text-orange-400"
            >
              View History
              <ArrowRight size={17} />
            </Link>
          </section>

          <div className="py-8 text-center">
            <p className="text-xs italic text-zinc-700">
              “Every review is a step towards a better design.”
            </p>

            <div className="mx-auto mt-4 h-px w-10 bg-orange-500" />
          </div>
        </div>
      </main>
    </div>
  );
}

type FeedbackCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconClass: string;
  items: string[];
  itemIcon: React.ReactNode;
  itemIconClass: string;
};

function FeedbackCard({
  title,
  subtitle,
  icon,
  iconClass,
  items,
  itemIcon,
  itemIconClass,
}: FeedbackCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#0d1011] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${iconClass}`}
        >
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-white">{title}</h2>
          <p className="mt-1 text-xs text-zinc-600">{subtitle}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex gap-3 text-sm leading-6 text-zinc-400"
            >
              <span className={`mt-1.5 shrink-0 ${itemIconClass}`}>
                {itemIcon}
              </span>

              <p>{item}</p>
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-zinc-800 bg-[#090b0c] px-3 py-3 text-sm text-zinc-600">
            No feedback available for this section.
          </p>
        )}
      </div>
    </section>
  );
}