"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardUserMenu from "@/components/DashboardUserMenu";
import { createClient } from "@/lib/supabase/client";

type Example = {
  input: string;
  output: string;
};

type Problem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  topic: string | null;
  companies: string[];
  tags: string[];
  examples: Example[];
  constraints: string[];
};

const languages = [
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "TypeScript", value: "typescript" },
];

export default function ProblemPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.id as string;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [solution, setSolution] = useState("");
  const [language, setLanguage] = useState("python");
  const [userName, setUserName] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProblem() {
      try {
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth/login");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        setUserName(profile?.full_name || "Developer");

        const { data, error: problemError } = await supabase
          .from("problems")
          .select(
            "id, slug, title, description, difficulty, topic, companies, tags, examples, constraints"
          )
          .eq("slug", slug)
          .single();

        if (problemError) {
          throw problemError;
        }

        setProblem(data as Problem);
      } catch (error) {
        console.error("Problem loading error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load problem."
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      loadProblem();
    }
  }, [slug, router]);

  async function handleSubmit() {
    if (!problem) {
      return;
    }

    if (!solution.trim()) {
      setError("Please write a solution before submitting.");
      return;
    }

    if (solution.trim().length < 30) {
      setError("Please provide a more detailed solution before submitting.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: attemptData, error: attemptError } = await supabase
        .from("attempts")
        .insert({
          user_id: user.id,
          problem_id: problem.id,
          solution: solution.trim(),
          language,
          status: "submitted",
        })
        .select("id")
        .single();

      if (attemptError) {
        throw attemptError;
      }

      const evaluationResponse = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemTitle: problem.title,
          problemDescription: problem.description,
          requirements: [
            ...(problem.constraints || []),
            ...(problem.tags || []),
          ],
          solution: solution.trim(),
        }),
      });

      const evaluationData = await evaluationResponse.json();

      if (!evaluationResponse.ok || !evaluationData.success) {
        throw new Error(
          evaluationData.error || "AI evaluation failed."
        );
      }

      const evaluation = evaluationData.evaluation;

      const { error: feedbackError } = await supabase
  .from("feedback")
  .insert({
    attempt_id: attemptData.id,
    overall_score: evaluation.overallScore,
    correctness_score: evaluation.correctnessScore,
    approach_score: evaluation.approachScore,
    time_complexity_score: evaluation.timeComplexityScore,
    space_complexity_score: evaluation.spaceComplexityScore,
    code_quality_score: evaluation.codeQualityScore,
    strengths: evaluation.strengths,
    weaknesses: evaluation.weaknesses,
    suggestions: evaluation.suggestions,
  });

      if (feedbackError) {
        throw feedbackError;
      }

      router.push(`/feedback/${attemptData.id}`);
    } catch (error) {
      console.error("Submission error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setError(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090909] text-zinc-100">
        <DashboardSidebar />

        <main className="ml-[244px] flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
            Loading problem...
          </div>
        </main>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#090909] text-zinc-100">
        <DashboardSidebar />

        <main className="ml-[244px] min-h-screen px-8 py-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold">Problem not found</h1>

            <p className="mt-3 text-sm text-zinc-500">
              {error || "This problem does not exist."}
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
      </div>
    );
  }

  const difficultyClass =
    problem.difficulty === "Hard"
      ? "border-red-500/20 bg-red-500/10 text-red-400"
      : problem.difficulty === "Medium"
        ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
        : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <DashboardSidebar />

      <main className="ml-[244px] min-h-screen">
        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-zinc-800/80 bg-[#090909]/90 px-8 backdrop-blur-xl">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
              Practice
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Solve and improve your DSA skills
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-zinc-500 transition hover:text-zinc-200">
              <Bell size={19} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-500" />
            </button>

            <DashboardUserMenu
              name={userName || "Loading..."}
            />
          </div>
        </header>

        <div
          className="relative min-h-[calc(100vh-72px)] overflow-hidden px-8 py-7"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        >
          <div className="pointer-events-none absolute right-20 top-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-[1600px]">
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-orange-400"
            >
              <ArrowLeft size={16} />
              Back to Problems
            </Link>

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-md border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${difficultyClass}`}
                >
                  {problem.difficulty}
                </span>

                {problem.topic && (
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-[11px] text-zinc-500">
                    {problem.topic}
                  </span>
                )}

                {problem.companies?.map((company) => (
                  <span
                    key={company}
                    className="rounded-md border border-orange-500/15 bg-orange-500/5 px-3 py-1 text-[11px] text-orange-400"
                  >
                    {company}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {problem.title}
              </h1>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-500">
                {problem.description}
              </p>
            </div>

            <div className="mt-7 grid min-h-[650px] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80">
                <div className="shrink-0 border-b border-zinc-800 px-6 py-5">
                  <h2 className="text-lg font-semibold">
                    Problem
                  </h2>

                  <p className="mt-1 text-xs text-zinc-600">
                    Understand the problem before writing your solution.
                  </p>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
                  {problem.examples?.length > 0 && (
                    <section>
                      <h3 className="text-sm font-semibold text-zinc-200">
                        Examples
                      </h3>

                      <div className="mt-4 space-y-4">
                        {problem.examples.map((example, index) => (
                          <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60"
                          >
                            <div className="border-b border-zinc-800 px-4 py-3">
                              <span className="text-xs font-medium text-zinc-500">
                                Example {index + 1}
                              </span>
                            </div>

                            <div className="space-y-4 p-4">
                              <div>
                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                                  Input
                                </p>

                                <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 text-xs leading-6 text-zinc-300">
                                  {example.input}
                                </pre>
                              </div>

                              <div>
                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                                  Output
                                </p>

                                <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 text-xs leading-6 text-orange-300">
                                  {example.output}
                                </pre>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {problem.constraints?.length > 0 && (
                    <section className="mt-8 border-t border-zinc-800 pt-7">
                      <h3 className="text-sm font-semibold text-zinc-200">
                        Constraints
                      </h3>

                      <ul className="mt-4 space-y-3">
                        {problem.constraints.map(
                          (constraint, index) => (
                            <li
                              key={`${constraint}-${index}`}
                              className="flex gap-3 text-sm leading-6 text-zinc-500"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              {constraint}
                            </li>
                          )
                        )}
                      </ul>
                    </section>
                  )}

                  {problem.tags?.length > 0 && (
                    <section className="mt-8 border-t border-zinc-800 pt-7">
                      <h3 className="text-sm font-semibold text-zinc-200">
                        Topics
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {problem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-[11px] text-zinc-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </section>

              <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80">
                <div className="shrink-0 border-b border-zinc-800 px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        Solution
                      </h2>

                      <p className="mt-1 text-xs text-zinc-600">
                        Write your solution and submit it for AI review.
                      </p>
                    </div>

                    <div className="relative shrink-0">
                      <select
                        value={language}
                        onChange={(event) => {
                          setLanguage(event.target.value);
                          setError("");
                        }}
                        className="h-10 appearance-none rounded-lg border border-zinc-800 bg-zinc-900 pl-3 pr-9 text-sm text-zinc-300 outline-none transition focus:border-orange-500/40"
                      >
                        {languages.map((item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden bg-[#050505]">
                  <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={solution}
                    onChange={(value) => {
                      setSolution(value ?? "");
                      setError("");
                    }}
                    options={{
                      minimap: {
                        enabled: false,
                      },
                      fontSize: 14,
                      lineHeight: 22,
                      wordWrap: "on",
                      padding: {
                        top: 18,
                        bottom: 18,
                      },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                    }}
                  />
                </div>

                <div className="shrink-0 border-t border-zinc-800 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-600">
                      {solution.length} characters
                    </span>

                    <button
                      onClick={handleSubmit}
                      disabled={!solution.trim() || isSubmitting}
                      className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Evaluating...
                        </>
                      ) : (
                        "Submit Solution"
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-sm text-red-400">
                      {error}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}