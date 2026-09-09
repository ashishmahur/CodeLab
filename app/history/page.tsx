"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  FileText,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Attempt = {
  id: string;
  solution: string;
  language: string;
  status: string;
  created_at: string;
  problems: {
    title: string;
    slug: string;
  } | null;
  feedback: {
    overall_score: number;
  } | null;
};

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        const supabase = createClient();

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
              slug
            ),
            feedback (
              overall_score
            )
          `)
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

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10">
          <p className="text-zinc-400">
            Loading attempt history...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10">
          <h1 className="text-3xl font-bold text-white">
            Unable to load history
          </h1>

          <p className="mt-3 text-sm text-red-400">
            {error}
          </p>

          <Link
            href="/problems"
            className="mt-6 inline-flex items-center gap-2 text-sm text-orange-400 transition hover:text-orange-300"
          >
            <ArrowLeft size={16} />
            Back to Problems
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-[1200px] px-6 py-8 lg:px-10">

        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            History
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            Attempt History
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Review your previous submissions and feedback.
          </p>
        </div>

        {/* Empty State */}
        {attempts.length === 0 ? (
          <section className="mt-8 rounded-xl border border-zinc-600 bg-zinc-800 px-6 py-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-zinc-500" />

            <h2 className="mt-4 text-xl font-semibold text-white">
              No attempts yet
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Solve your first LLD problem to see it here.
            </p>

            <Link
              href="/problems"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-600"
            >
              Explore Problems
              <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          /* Attempts */
          <div className="mt-8 space-y-4">
            {attempts.map((attempt) => (
              <article
                key={attempt.id}
                className="rounded-xl border border-zinc-600 bg-zinc-800 p-5 transition duration-200 hover:border-orange-400"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  {/* Attempt Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h2 className="truncate text-lg font-semibold text-white">
                        {attempt.problems?.title || "Unknown Problem"}
                      </h2>

                      <span className="rounded-md border border-zinc-600 bg-zinc-900 px-2.5 py-1 text-xs capitalize text-zinc-400">
                        {attempt.status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {formatDate(attempt.created_at)}
                      </span>

                      <span>
                        Language: {attempt.language}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-5 text-zinc-400">
                      {attempt.solution}
                    </p>
                  </div>

                  {/* Score + Action */}
                  <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end">

                    <div>
                      <p className="text-xs text-zinc-500">
                        Score
                      </p>

                      <p className="mt-1 text-2xl font-bold text-orange-400">
                        {attempt.feedback?.overall_score ?? "—"}
                        <span className="ml-1 text-sm font-normal text-zinc-500">
                          / 10
                        </span>
                      </p>
                    </div>

                    {attempt.feedback ? (
                      <Link
                        href={`/feedback/${attempt.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-200 transition duration-200 hover:border-orange-400 hover:text-orange-400"
                      >
                        View Feedback
                        <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <span className="text-xs text-zinc-500">
                        Feedback unavailable
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Back */}
        <div className="mt-6">
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-orange-400"
          >
            <ArrowLeft size={16} />
            Back to Problems
          </Link>
        </div>

      </div>
    </main>
  );
}