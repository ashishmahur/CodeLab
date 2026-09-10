"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Problem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  requirements: string[];
  submit_points: string[];
};

const languages = [
  { label: "Python", value: "python" },
  { label: "C", value: "c" },
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Load problem from Supabase
  useEffect(() => {
    async function loadProblem() {
      try {
        const supabase = createClient();

        const { data, error: problemError } = await supabase
          .from("problems")
          .select(
            "id, slug, title, description, difficulty, requirements, submit_points"
          )
          .eq("slug", slug)
          .single();

        if (problemError) {
          throw problemError;
        }

        setProblem(data);
      } catch (error) {
        console.error("Problem loading error:", error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Unable to load problem.";

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      loadProblem();
    }
  }, [slug]);

  async function handleSubmit() {
    if (!problem) {
      return;
    }

    if (!solution.trim()) {
      setError("Please write a solution before submitting.");
      return;
    }

    if (solution.trim().length < 30) {
      setError(
        "Please provide a more detailed solution before submitting."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);
    setError("");

    try {
      const supabase = createClient();

      // Step 1: Save the attempt
      const { data: attemptData, error: attemptError } = await supabase
        .from("attempts")
        .insert({
          problem_id: problem.id,
          solution: solution.trim(),
          language: language,
          status: "submitted",
        })
        .select("id")
        .single();

      if (attemptError) {
        throw attemptError;
      }

      // Step 2: Send solution to AI evaluator
      const evaluationResponse = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemTitle: problem.title,
          problemDescription: problem.description,
          requirements: problem.requirements || [],
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

      // Step 3: Save feedback
      const { error: feedbackError } = await supabase
        .from("feedback")
        .insert({
          attempt_id: attemptData.id,
          overall_score: evaluation.overallScore,
          design_score: evaluation.designScore,
          extensibility_score: evaluation.extensibilityScore,
          code_quality_score: evaluation.codeQualityScore,
          edge_case_score: evaluation.edgeCaseScore,
          strengths: evaluation.strengths,
          weaknesses: evaluation.weaknesses,
          suggestions: evaluation.suggestions,
        });

      if (feedbackError) {
        throw feedbackError;
      }

      // Step 4: Open feedback page
      setSubmitted(true);

      router.push(`/feedback/${attemptData.id}`);
    } catch (error) {
      console.error("Submission error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : JSON.stringify(error);

      setError(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Loading
  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
        <div className="mx-auto max-w-[1500px] px-8 py-16 lg:px-14">
          <p className="text-sm text-zinc-400">
            Loading problem...
          </p>
        </div>
      </main>
    );
  }

  // Problem not found
  if (!problem) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 px-8 py-16 text-zinc-100">
        <div className="mx-auto max-w-[1500px]">
          <h1 className="text-3xl font-bold text-white">
            Problem not found
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {error || "This problem does not exist."}
          </p>

          <Link
            href="/problems"
            className="mt-6 inline-flex items-center gap-2 text-orange-400 transition hover:text-orange-300"
          >
            <ArrowLeft size={18} />
            Back to Problems
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-[1600px] px-6 py-6 lg:px-10">

        {/* Back */}
        <Link
          href="/problems"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition duration-200 hover:text-orange-400"
        >
          <ArrowLeft size={16} />
          Back to Problems
        </Link>

        {/* Header */}
        <div className="mt-5">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Practice
            </p>

            <span
              className={`rounded-md border px-3 py-1 text-xs ${
                problem.difficulty === "Hard"
                  ? "border-red-900 bg-red-950/30 text-red-400"
                  : problem.difficulty === "Medium"
                  ? "border-yellow-900 bg-yellow-950/20 text-yellow-400"
                  : "border-green-900 bg-green-950/20 text-green-400"
              }`}
            >
              {problem.difficulty}
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            {problem.title}
          </h1>

          <p className="mt-2 max-w-4xl text-base text-zinc-400">
            {problem.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-6 grid h-[calc(100vh-220px)] min-h-[520px] gap-5 lg:grid-cols-2">

          {/* Problem */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-600 bg-zinc-800">

            <div className="shrink-0 border-b border-zinc-600 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">
                Problem
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Understand the requirements before writing your solution.
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">

              {/* Requirements */}
              <div>
                <h3 className="text-base font-semibold text-white">
                  Requirements
                </h3>

                <ul className="mt-3 space-y-2.5">
                  {problem.requirements?.map(
                    (requirement, index) => (
                      <li
                        key={`${requirement}-${index}`}
                        className="flex gap-3 text-sm leading-6 text-zinc-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />

                        {requirement}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Submit Points */}
              <div className="mt-7 border-t border-zinc-700 pt-6">
                <h3 className="text-base font-semibold text-white">
                  What you should submit
                </h3>

                <ul className="mt-3 space-y-2.5">
                  {problem.submit_points?.map(
                    (item, index) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex gap-3 text-sm leading-6 text-zinc-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />

                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Think About */}
              <div className="mt-7 border-t border-zinc-700 pt-6">
                <h3 className="text-base font-semibold text-white">
                  Think about
                </h3>

                <ul className="mt-3 space-y-2.5 text-sm leading-6 text-zinc-400">
                  <li>• What classes do you need?</li>
                  <li>• What are their responsibilities?</li>
                  <li>• How should the classes interact?</li>
                  <li>• Which interfaces are useful?</li>
                  <li>• How can the design be extended?</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Solution */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-600 bg-zinc-800">

            {/* Editor Header */}
            <div className="shrink-0 border-b border-zinc-600 px-5 py-4">
              <div className="flex items-center justify-between gap-4">

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Solution Here
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Write your classes, interfaces, relationships, and design
                    decisions.
                  </p>
                </div>

                {/* Language Selector */}
                <div className="shrink-0">
                  <label
                    htmlFor="language"
                    className="mb-1.5 block text-xs font-medium text-zinc-500"
                  >
                    Language
                  </label>

                  <select
                    id="language"
                    value={language}
                    onChange={(event) => {
                      setLanguage(event.target.value);
                      setSubmitted(false);
                      setError("");
                    }}
                    className="rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none transition focus:border-orange-400"
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
                </div>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="min-h-0 flex-1 overflow-hidden bg-zinc-950">
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={solution}
                onChange={(value) => {
                  setSolution(value ?? "");
                  setSubmitted(false);
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
                    top: 16,
                    bottom: 16,
                  },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                }}
              />
            </div>

            {/* Submit */}
            <div className="shrink-0 border-t border-zinc-600 px-5 py-3">

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  {solution.length} characters
                </span>

                <button
                  onClick={handleSubmit}
                  disabled={!solution.trim() || isSubmitting}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
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

              {/* Success */}
              {submitted && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-700 bg-green-950/40 px-3 py-2 text-sm text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Solution submitted and evaluated successfully!
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-3 rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}