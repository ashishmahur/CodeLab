"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Code2,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardUserMenu from "@/components/DashboardUserMenu";
import { createClient } from "@/lib/supabase/client";

type Problem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  topic: string | null;
  companies: string[];
  tags: string[];
};

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Infosys",
  "TCS",
  "Meta",
  "Adobe",
  "Walmart",
  "Accenture",
  "Wipro",
];

const topics = [
  "Arrays",
  "Strings",
  "Hashing",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Linked List",
  "Stack",
  "Queue",
  "Recursion",
  "Backtracking",
  "Trees",
  "BST",
  "Heap / Priority Queue",
  "Graphs",
  "Greedy",
  "Dynamic Programming",
  "Bit Manipulation",
  "Intervals",
  "Trie",
  "Math",
];

const difficultyTabs = ["All", "Easy", "Medium", "Hard"];

const difficultyStyles: Record<string, string> = {
  Easy: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Hard: "border-red-500/20 bg-red-500/10 text-red-400",
};

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [attemptedIds, setAttemptedIds] = useState<Set<string>>(new Set());
  const [userName, setUserName] = useState("");

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [company, setCompany] = useState("All Companies");
  const [topic, setTopic] = useState("All Topics");
  const [sort, setSort] = useState("Default");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageSize = 10;

  useEffect(() => {
    async function loadProblems() {
      try {
        setLoading(true);
        setError("");

        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = "/auth/login";
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        setUserName(profile?.full_name || "Developer");

        const { data: problemData, error: problemError } = await supabase
          .from("problems")
          .select(
            "id, slug, title, description, difficulty, category, topic, companies, tags"
          )
          .eq("category", "DSA")
          .order("created_at", { ascending: true });

        if (problemError) {
          throw problemError;
        }

        const { data: attemptData, error: attemptError } = await supabase
          .from("attempts")
          .select("problem_id")
          .eq("user_id", user.id);

        if (attemptError) {
          throw attemptError;
        }

        const attempted = new Set(
          (attemptData ?? []).map((attempt) => attempt.problem_id)
        );

        setProblems((problemData ?? []) as Problem[]);
        setAttemptedIds(attempted);
      } catch (err) {
        console.error("Problems loading error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load problems."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProblems();
  }, []);

  const filteredProblems = useMemo(() => {
    let result = [...problems];

    if (difficulty !== "All") {
      result = result.filter(
        (problem) => problem.difficulty === difficulty
      );
    }

    if (company !== "All Companies") {
      result = result.filter((problem) =>
        problem.companies?.includes(company)
      );
    }

    if (topic !== "All Topics") {
      result = result.filter((problem) => problem.topic === topic);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((problem) => {
        return (
          problem.title.toLowerCase().includes(query) ||
          problem.description.toLowerCase().includes(query) ||
          problem.topic?.toLowerCase().includes(query) ||
          problem.companies?.some((item) =>
            item.toLowerCase().includes(query)
          ) ||
          problem.tags?.some((item) =>
            item.toLowerCase().includes(query)
          )
        );
      });
    }

    if (sort === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "Difficulty") {
      const order: Record<string, number> = {
        Easy: 1,
        Medium: 2,
        Hard: 3,
      };

      result.sort(
        (a, b) =>
          (order[a.difficulty] ?? 0) - (order[b.difficulty] ?? 0)
      );
    }

    if (sort === "Attempted") {
      result.sort(
        (a, b) =>
          Number(attemptedIds.has(b.id)) -
          Number(attemptedIds.has(a.id))
      );
    }

    return result;
  }, [
    problems,
    difficulty,
    company,
    topic,
    search,
    sort,
    attemptedIds,
  ]);

  useEffect(() => {
    setPage(1);
  }, [search, difficulty, company, topic, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProblems.length / pageSize)
  );

  const paginatedProblems = filteredProblems.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const solvedCount = attemptedIds.size;
  const totalProblems = problems.length;
  const progress =
    totalProblems > 0
      ? Math.round((solvedCount / totalProblems) * 100)
      : 0;

  const easyCount = problems.filter(
    (problem) => problem.difficulty === "Easy"
  ).length;

  const mediumCount = problems.filter(
    (problem) => problem.difficulty === "Medium"
  ).length;

  const hardCount = problems.filter(
    (problem) => problem.difficulty === "Hard"
  ).length;

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <DashboardSidebar />

      <main className="ml-[244px] min-h-screen">
        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-zinc-800/80 bg-[#090909]/90 px-8 backdrop-blur-xl">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
              Practice
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              DSA Problems
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-zinc-500 transition hover:text-zinc-200">
              <Bell size={19} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-500" />
            </button>

            <DashboardUserMenu name={userName || "Loading..."} />
          </div>
        </header>

        <div
          className="relative min-h-[calc(100vh-72px)] overflow-hidden px-8 py-8"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        >
          <div className="pointer-events-none absolute right-20 top-20 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-[1500px]">
            {/* Hero */}
            <section className="mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7">
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-orange-400">
                    <Code2 size={18} />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                      DSA Practice
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Master Data Structures & Algorithms
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                    Practice problems across core DSA topics and prepare
                    for technical interviews with focused problem solving.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Stat
                    value={totalProblems}
                    label="Problems"
                  />
                  <Stat
                    value={solvedCount}
                    label="Solved"
                  />
                  <Stat
                    value={`${progress}%`}
                    label="Progress"
                  />
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">
                    Overall progress
                  </span>
                  <span className="font-medium text-orange-400">
                    {solvedCount}/{totalProblems}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </section>

            {/* Difficulty */}
            <div className="mb-5 flex flex-wrap gap-2">
              {difficultyTabs.map((item) => (
                <button
                  key={item}
                  onClick={() => setDifficulty(item)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    difficulty === item
                      ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                      : "border-zinc-800 bg-zinc-950/70 text-zinc-500 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Search + Filters */}
            <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="flex flex-col gap-3 xl:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search problems, topics, companies..."
                    className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 pl-11 pr-4 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-orange-500/40"
                  />
                </div>

                <FilterSelect
                  value={company}
                  onChange={setCompany}
                  options={["All Companies", ...companies]}
                />

                <FilterSelect
                  value={topic}
                  onChange={setTopic}
                  options={["All Topics", ...topics]}
                />

                <FilterSelect
                  value={sort}
                  onChange={setSort}
                  options={[
                    "Default",
                    "A-Z",
                    "Difficulty",
                    "Attempted",
                  ]}
                  icon={<SlidersHorizontal size={15} />}
                />
              </div>
            </section>

            {/* Difficulty overview */}
            <div className="mb-6 grid grid-cols-3 gap-3">
              <DifficultyStat
                label="Easy"
                count={easyCount}
                color="text-emerald-400"
              />
              <DifficultyStat
                label="Medium"
                count={mediumCount}
                color="text-amber-400"
              />
              <DifficultyStat
                label="Hard"
                count={hardCount}
                color="text-red-400"
              />
            </div>

            {/* Problems */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Problems
                  </h3>
                  <p className="mt-1 text-xs text-zinc-600">
                    {filteredProblems.length} problems found
                  </p>
                </div>

                <div className="hidden text-xs text-zinc-600 sm:block">
                  Page {page} of {totalPages}
                </div>
              </div>

              {loading ? (
                <LoadingState />
              ) : error ? (
                <EmptyState
                  title="Unable to load problems"
                  description={error}
                />
              ) : paginatedProblems.length === 0 ? (
                <EmptyState
                  title="No problems found"
                  description="Try changing your search or filters."
                />
              ) : (
                <div className="space-y-3">
                  {paginatedProblems.map((problem) => {
                    const attempted = attemptedIds.has(problem.id);

                    return (
                      <Link
                        key={problem.id}
                        href={`/problems/${problem.slug}`}
                        className="group block"
                      >
                        <article className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/75 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-zinc-950">
                          <div className="absolute left-0 top-0 h-full w-px bg-transparent transition group-hover:bg-orange-500" />

                          <div className="flex items-start gap-4">
                            <div
                              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                                attempted
                                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                  : "border-zinc-800 bg-zinc-900 text-zinc-600"
                              }`}
                            >
                              {attempted ? (
                                <CheckCircle2 size={18} />
                              ) : (
                                <span className="h-2 w-2 rounded-full bg-zinc-700" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-wrap items-center gap-3">
                                  <h4 className="font-semibold text-zinc-100 transition group-hover:text-orange-400">
                                    {problem.title}
                                  </h4>

                                  <span
                                    className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                                      difficultyStyles[
                                        problem.difficulty
                                      ] ?? ""
                                    }`}
                                  >
                                    {problem.difficulty}
                                  </span>
                                </div>

                                <ArrowRight
                                  size={17}
                                  className="hidden text-zinc-700 transition group-hover:translate-x-1 group-hover:text-orange-400 sm:block"
                                />
                              </div>

                              <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                                {problem.description}
                              </p>

                              <div className="mt-4 flex flex-wrap items-center gap-2">
                                {problem.topic && (
                                  <Tag>{problem.topic}</Tag>
                                )}

                                {problem.companies?.map((item) => (
                                  <Tag key={item} orange>
                                    {item}
                                  </Tag>
                                ))}

                                {problem.tags
                                  ?.slice(0, 2)
                                  .map((item) => (
                                    <Tag key={item}>{item}</Tag>
                                  ))}

                                {attempted && (
                                  <span className="ml-auto text-xs font-medium text-emerald-400">
                                    Attempted
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {!loading &&
                !error &&
                filteredProblems.length > 0 && (
                  <div className="mt-7 flex items-center justify-center gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() =>
                        setPage((current) => Math.max(1, current - 1))
                      }
                      className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-500 transition hover:border-zinc-700 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Previous
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    )
                      .slice(
                        Math.max(0, page - 3),
                        Math.min(totalPages, page + 2)
                      )
                      .map((number) => (
                        <button
                          key={number}
                          onClick={() => setPage(number)}
                          className={`h-9 min-w-9 rounded-lg border px-3 text-sm transition ${
                            page === number
                              ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                              : "border-zinc-800 bg-zinc-950 text-zinc-600 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          {number}
                        </button>
                      ))}

                    <button
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((current) =>
                          Math.min(totalPages, current + 1)
                        )
                      }
                      className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-500 transition hover:border-zinc-700 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Next
                    </button>
                  </div>
                )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="min-w-[90px] rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-center">
      <p className="text-xl font-bold text-zinc-100">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-600">
        {label}
      </p>
    </div>
  );
}

function DifficultyStat({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${color}`}>
          {label}
        </span>
        <span className="text-sm font-semibold text-zinc-300">
          {count}
        </span>
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative min-w-[170px]">
      {icon ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">
          {icon}
        </span>
      ) : null}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/70 pr-9 text-sm text-zinc-400 outline-none transition focus:border-orange-500/40 ${
          icon ? "pl-9" : "pl-4"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
      />
    </div>
  );
}

function Tag({
  children,
  orange = false,
}: {
  children: React.ReactNode;
  orange?: boolean;
}) {
  return (
    <span
      className={`rounded-md border px-2 py-1 text-[10px] ${
        orange
          ? "border-orange-500/15 bg-orange-500/5 text-orange-400"
          : "border-zinc-800 bg-zinc-900 text-zinc-600"
      }`}
    >
      {children}
    </span>
  );
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-10 text-center">
      <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-zinc-800 border-t-orange-500" />
      <p className="mt-4 text-sm text-zinc-600">
        Loading problems...
      </p>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-12 text-center">
      <p className="text-base font-semibold text-zinc-300">
        {title}
      </p>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
    </div>
  );
}