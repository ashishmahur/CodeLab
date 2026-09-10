"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useParams } from "next/navigation";
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

export default function FeedbackPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [problemSlug, setProblemSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFeedback() {
      try {
        const supabase = createClient();

        // Load feedback
        const { data: feedbackData, error: feedbackError } = await supabase
          .from("feedback")
          .select("*")
          .eq("attempt_id", attemptId)
          .single();

        if (feedbackError) {
          throw feedbackError;
        }

        setFeedback(feedbackData);

        // Load problem associated with this attempt
        const { data: attemptData, error: attemptError } = await supabase
          .from("attempts")
          .select(`
            problem_id,
            problems (
              slug
            )
          `)
          .eq("id", attemptId)
          .single();

        if (attemptError) {
          throw attemptError;
        }

        const problem = Array.isArray(attemptData.problems)
          ? attemptData.problems[0]
          : attemptData.problems;

        setProblemSlug(problem?.slug || null);
      } catch (error) {
        console.error("Feedback loading error:", error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : JSON.stringify(error);

        setError(`Unable to load feedback: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    }

    if (attemptId) {
      loadFeedback();
    }
  }, [attemptId]);

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
          <p className="text-zinc-400">Loading feedback...</p>
        </div>
      </main>
    );
  }

  if (error || !feedback) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
          <h1 className="text-3xl font-bold text-white">
            Feedback not found
          </h1>

          <p className="mt-2 text-zinc-400">
            {error || "No feedback was found for this attempt."}
          </p>

          <Link
            href="/problems"
            className="mt-5 inline-flex items-center gap-2 text-orange-400 transition hover:text-orange-300"
          >
            <ArrowLeft size={18} />
            Back to Problems
          </Link>
        </div>
      </main>
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

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-10">

        {/* Back */}
        <Link
          href="/problems"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-orange-400"
        >
          <ArrowLeft size={16} />
          Back to Problems
        </Link>

        {/* Header */}
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            Review
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Your Design Feedback
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Review your submission and identify areas where your design can
            improve.
          </p>
        </div>

        {/* Overall Score */}
        <section className="mt-5 rounded-xl border border-zinc-600 bg-zinc-800 px-5 py-4">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Overall Score
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Based on the structure and design concepts in your submission.
              </p>
            </div>

            <div className="flex shrink-0 items-baseline gap-2">
              <span className="text-4xl font-bold text-orange-400">
                {feedback.overall_score}
              </span>

              <span className="text-sm text-zinc-500">
                / 10
              </span>
            </div>
          </div>
        </section>

        {/* Score Breakdown */}
        <section className="mt-5">
          <h2 className="text-lg font-semibold text-white">
            Score Breakdown
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {scoreItems.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3"
              >
                <p className="text-xs text-zinc-400">
                  {item.label}
                </p>

                <p className="mt-1 text-xl font-bold text-white">
                  {item.score}
                  <span className="ml-1 text-xs font-normal text-zinc-500">
                    / {item.max}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Sections */}
        <div className="mt-5 grid gap-4 lg:grid-cols-3">

          {/* Strengths */}
          <section className="rounded-xl border border-zinc-600 bg-zinc-800 p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />

              <h2 className="text-lg font-semibold text-white">
                Strengths
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {feedback.strengths.map((strength, index) => (
                <div
                  key={`${strength}-${index}`}
                  className="flex gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />

                  <p className="text-sm leading-5 text-zinc-300">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Areas to Improve */}
          <section className="rounded-xl border border-zinc-600 bg-zinc-800 p-5">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />

              <h2 className="text-lg font-semibold text-white">
                Areas to Improve
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {feedback.weaknesses.map((weakness, index) => (
                <div
                  key={`${weakness}-${index}`}
                  className="flex gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />

                  <p className="text-sm leading-5 text-zinc-300">
                    {weakness}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Suggestions */}
          <section className="rounded-xl border border-zinc-600 bg-zinc-800 p-5">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-orange-400" />

              <h2 className="text-lg font-semibold text-white">
                Suggestions
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {feedback.suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion}-${index}`}
                  className="flex gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5"
                >
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />

                  <p className="text-sm leading-5 text-zinc-300">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-3">

          {/* Try Again */}
          {problemSlug && (
            <Link
              href={`/problems/${problemSlug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-600"
            >
              <RotateCcw size={16} />
              Try Again
            </Link>
          )}

          {/* Try Another Problem */}
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition duration-200 hover:border-orange-400 hover:text-orange-400"
          >
            Try Another Problem
            <ArrowRight size={16} />
          </Link>

          {/* History */}
          <Link
            href="/history"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition duration-200 hover:border-orange-400 hover:text-orange-400"
          >
            View History
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}