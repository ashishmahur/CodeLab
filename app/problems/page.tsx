"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Building2,
  CupSoda,
  Ticket,
  CreditCard,
  BookOpen,
  Utensils,
  CarFront,
  Hotel,
  WalletCards,
} from "lucide-react";
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

const icons = [
  Car,
  Building2,
  CupSoda,
  Ticket,
  CreditCard,
  BookOpen,
  Utensils,
  CarFront,
  Hotel,
  WalletCards,
];

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProblems() {
      try {
        const supabase = createClient();

        const { data, error: problemsError } = await supabase
          .from("problems")
          .select("*")
          .order("created_at", { ascending: true });

        if (problemsError) {
          throw problemsError;
        }
        console.log("PROBLEMS FROM SUPABASE:", data);
        setProblems(data || []);
      } catch (error) {
        console.error("Problems loading error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load problems."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProblems();
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-[1500px] px-8 py-6 lg:px-14">

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Practice Problems
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
            Choose an LLD problem
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Pick a problem, design your solution, and get feedback on your
            approach.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-10">
            <p className="text-sm text-zinc-400">
              Loading problems...
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="mt-10 rounded-lg border border-red-900 bg-red-950/30 px-5 py-4">
            <p className="text-sm text-red-400">
              Unable to load problems: {error}
            </p>
          </div>
        )}

        {/* Problem Cards */}
        {!isLoading && !error && (
          <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {problems.map((problem, index) => {
              const Icon = icons[index % icons.length];

              return (
                <div
                  key={problem.id}
                  className="group flex flex-col rounded-xl border border-zinc-600 bg-zinc-800 p-6 transition duration-200 hover:-translate-y-2 hover:border-orange-400"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-600 bg-zinc-900 transition duration-200 group-hover:border-orange-400">
                    <Icon className="h-6 w-6 text-orange-400 transition duration-200 group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h2 className="mt-5 text-xl font-semibold text-white">
                    {problem.title}
                  </h2>

                  {/* Difficulty */}
                  <span
                    className={`mt-3 w-fit rounded-md border px-3 py-1 text-xs ${
                      problem.difficulty === "Hard"
                        ? "border-red-900 bg-red-950/30 text-red-400"
                        : problem.difficulty === "Medium"
                        ? "border-yellow-900 bg-yellow-950/20 text-yellow-400"
                        : "border-green-900 bg-green-950/20 text-green-400"
                    }`}
                  >
                    {problem.difficulty}
                  </span>

                  {/* Description */}
                  <p className="mt-4 flex-1 text-sm leading-6 text-zinc-400">
                    {problem.description}
                  </p>

                  {/* Topics */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {problem.requirements
                      ?.slice(0, 3)
                      .map((requirement, requirementIndex) => (
                        <span
                          key={`${problem.id}-${requirementIndex}`}
                          className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-400"
                        >
                          LLD
                        </span>
                      ))}
                  </div>

                  {/* View Problem */}
                  <Link
                    href={`/problems/${problem.slug}`}
                    className="mt-6 flex items-center justify-between rounded-lg border border-zinc-500 px-4 py-3 text-sm font-medium text-zinc-200 transition duration-200 hover:border-orange-400 hover:bg-zinc-900 hover:text-orange-400"
                  >
                    View Problem

                    <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* No Problems */}
        {!isLoading && !error && problems.length === 0 && (
          <div className="mt-10 rounded-lg border border-zinc-700 bg-zinc-800 px-5 py-6">
            <p className="text-zinc-400">
              No problems found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}