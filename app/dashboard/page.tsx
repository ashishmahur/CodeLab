import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardUserMenu from "@/components/DashboardUserMenu";
import DashboardSidebar from "@/components/DashboardSidebar";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Code2,
  Flame,
  Home,
  Library,
  Map,
  Menu,
  MessageCircle,
  Play,
  Settings,
  Sparkles,
  Target,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const fullName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Developer";

  const firstName = fullName.split(" ")[0];

  const { data: attempts } = await supabase
    .from("attempts")
    .select(`
      id,
      problem_id,
      status,
      created_at,
      problems (
        title,
        difficulty
      ),
      feedback (
        overall_score
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const attemptRows = attempts ?? [];

  const solvedProblemIds = new Set(
    attemptRows
      .filter((attempt) => attempt.status === "submitted")
      .map((attempt) => attempt.problem_id)
  );

  const totalAttempts = attemptRows.length;

  const scoredAttempts = attemptRows
    .map((attempt) => {
      const feedback = Array.isArray(attempt.feedback)
        ? attempt.feedback[0]
        : attempt.feedback;

      return feedback?.overall_score ?? null;
    })
    .filter((score): score is number => typeof score === "number");

  const averageAiScore = scoredAttempts.length
    ? (
        scoredAttempts.reduce((sum, score) => sum + score, 0) /
        scoredAttempts.length
      ).toFixed(1)
    : null;

  const difficultyCounts = {
    Easy: 0,
    Medium: 0,
    Hard: 0,
  };

  for (const attempt of attemptRows) {
    if (attempt.status !== "submitted") continue;

    const problem = Array.isArray(attempt.problems)
      ? attempt.problems[0]
      : attempt.problems;

  if (problem?.difficulty === "Easy") {
  difficultyCounts.Easy++;
} else if (problem?.difficulty === "Medium") {
  difficultyCounts.Medium++;
} else if (problem?.difficulty === "Hard") {
  difficultyCounts.Hard++;
}
  }

  const activityDates = new Set(
    attemptRows.map((attempt) =>
      new Date(attempt.created_at).toISOString().slice(0, 10)
    )
  );

  let currentStreak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateKey = date.toISOString().slice(0, 10);

    if (activityDates.has(dateKey)) {
      currentStreak++;
    } else if (i === 0) {
      continue;
    } else {
      break;
    }
  }

  const recentAttempts = attemptRows.slice(0, 5);

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
        
        <header className=" sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-zinc-800/70 bg-[#080909]/85 px-5 backdrop-blur-xl sm:px-8 xl:px-10">
          
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

        
        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 xl:px-10">
          
          <section className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-orange-500/70">
                Your workspace
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back,{" "}
                <span className="text-orange-500">{firstName}!</span>{" "}
                <span>👋</span>
              </h1>

              <p className="mt-2 text-sm text-zinc-500 sm:text-base">
                Keep building. Consistency turns ideas into results.
              </p>
            </div>

            <div className="hidden text-right xl:block">
              <p className="text-sm text-zinc-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                “Better code. A smarter you.”
              </p>

              <div className="ml-auto mt-3 h-px w-8 bg-orange-500" />
            </div>
          </section>

          
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<CheckCircle2 size={23} />}
              iconClass="bg-emerald-500/15 text-emerald-400"
              value={String(solvedProblemIds.size)}
              label="Problems Solved"
              sub={solvedProblemIds.size ? "Keep going" : "Start solving"}
            />

            <StatCard
              icon={<BarChart3 size={23} />}
              iconClass="bg-blue-500/15 text-blue-400"
              value={String(totalAttempts)}
              label="Total Attempts"
              sub={totalAttempts ? "Practice sessions" : "No attempts yet"}
            />

            <StatCard
              icon={<Sparkles size={23} />}
              iconClass="bg-purple-500/15 text-purple-400"
              value={averageAiScore ? `${averageAiScore}/10` : "—"}
              label="Average AI Score"
              sub={averageAiScore ? "Across reviewed attempts" : "Complete a review"}
            />

            <StatCard
              icon={<Flame size={23} />}
              iconClass="bg-orange-500/15 text-orange-400"
              value={String(currentStreak)}
              label="Current Streak"
              sub={currentStreak ? "Days active" : "Start your streak"}
            />
          </section>

          
          <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_285px]">
            
            <div className="rounded-2xl border border-zinc-800/80 bg-[#0e1112]/90 p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Your Progress
                  </h2>

                  <p className="mt-1 text-sm text-zinc-600">
                    Track your journey and improvement over time.
                  </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-500 transition hover:border-orange-500/40 hover:text-zinc-300">
                  Last 30 days
                  <ChevronDown size={14} />
                </button>
              </div>

              <div className="mt-7 flex h-[190px] items-center justify-center rounded-xl border border-dashed border-zinc-800/70 bg-zinc-950/30">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-8 w-8 text-zinc-700" />

                  <p className="mt-3 text-sm font-medium text-zinc-500">
                    Your progress will appear here
                  </p>

                  <p className="mt-1 text-xs text-zinc-700">
                    Solve your first problem to start tracking.
                  </p>
                </div>
              </div>
            </div>

            
            <div className="rounded-2xl border border-zinc-800/80 bg-[#0e1112]/90 p-5 sm:p-6">
              <h2 className="text-lg font-semibold">
                Difficulty Breakdown
              </h2>

              <div className="mt-6 flex items-center justify-center">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-[conic-gradient(#27272a_0deg_360deg)]">
                  <div className="flex h-[108px] w-[108px] flex-col items-center justify-center rounded-full bg-[#0e1112]">
                    <span className="text-2xl font-bold">
                      {solvedProblemIds.size}
                    </span>

                    <span className="text-xs text-zinc-600">
                      Solved
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <DifficultyRow
                  dot="bg-emerald-400"
                  label="Easy"
                  value={String(difficultyCounts.Easy)}
                />

                <DifficultyRow
                  dot="bg-orange-400"
                  label="Medium"
                  value={String(difficultyCounts.Medium)}
                />

                <DifficultyRow
                  dot="bg-purple-400"
                  label="Hard"
                  value={String(difficultyCounts.Hard)}
                />
              </div>
            </div>
          </section>

          
          <section className="mt-4 grid gap-4 md:grid-cols-3">
            <DashboardPanel
              title="Continue Practice"
              icon={<Play size={18} />}
            >
              <EmptyPanel
                text="No recent problems"
                link="/problems"
                linkText="Explore problems"
              />
            </DashboardPanel>

            <DashboardPanel
              title="Learning Path"
              icon={<Target size={18} />}
            >
              <EmptyPanel
                text="No learning path started"
                link="/learning"
                linkText="Explore paths"
              />
            </DashboardPanel>

            <DashboardPanel
              title="AI Insights"
              icon={<BrainCircuit size={18} />}
            >
              <EmptyPanel
                text="AI insights appear after submissions"
                link="/problems"
                linkText="Start practicing"
              />
            </DashboardPanel>
          </section>

          
          <section className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.75fr]">
            <DashboardPanel
              title="Recent Attempts"
              icon={<ArrowRight size={18} />}
            >
              {recentAttempts.length === 0 ? (
                <EmptyPanel
                  text="No attempts yet"
                  link="/problems"
                  linkText="Solve your first problem"
                  large
                />
              ) : (
                <div className="space-y-2">
                  {recentAttempts.map((attempt) => {
                    const problem = Array.isArray(attempt.problems)
                      ? attempt.problems[0]
                      : attempt.problems;

                    const feedback = Array.isArray(attempt.feedback)
                      ? attempt.feedback[0]
                      : attempt.feedback;

                    return (
                      <div
                        key={attempt.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800/80 bg-zinc-950/30 p-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-200">
                            {problem?.title || "Problem"}
                          </p>
                          <p className="mt-1 text-xs text-zinc-600">
                            {problem?.difficulty || "Practice"} ·{" "}
                            {new Date(attempt.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold text-orange-400">
                            {typeof feedback?.overall_score === "number"
                              ? `${feedback.overall_score}/10`
                              : "Submitted"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </DashboardPanel>

            <DashboardPanel
              title="Recent Activity"
              icon={<Activity size={18} />}
            >
              {recentAttempts.length === 0 ? (
                <EmptyPanel
                  text="Your activity will appear here."
                  link="/problems"
                  linkText="Start solving"
                  large
                />
              ) : (
                <div className="space-y-3">
                  {recentAttempts.slice(0, 4).map((attempt) => {
                    const problem = Array.isArray(attempt.problems)
                      ? attempt.problems[0]
                      : attempt.problems;

                    return (
                      <div key={attempt.id} className="flex gap-3">
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
                        <div className="min-w-0">
                          <p className="text-sm text-zinc-400">
                            Submitted{" "}
                            <span className="font-medium text-zinc-200">
                              {problem?.title || "a problem"}
                            </span>
                          </p>
                          <p className="mt-1 text-xs text-zinc-700">
                            {new Date(attempt.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </DashboardPanel>
          </section>
        </div>
      </div>
    </main>
  );
}



function NavItem({
  href,
  icon,
  label,
  active = false,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative mb-2 flex h-11 items-center gap-4 rounded-lg px-4 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-orange-500/15 text-orange-400"
          : "text-zinc-500 hover:bg-zinc-900/80 hover:text-zinc-200"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.7)]" />
      )}

      <span
        className={`transition-colors ${
          active
            ? "text-orange-400"
            : "text-zinc-600 group-hover:text-zinc-300"
        }`}
      >
        {icon}
      </span>

      <span>{label}</span>

      {badge && (
        <span className="ml-auto rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-black">
          {badge}
        </span>
      )}
    </Link>
  );
}

function StatCard({
  icon,
  iconClass,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  iconClass: string;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="group rounded-2xl border border-zinc-800/80 bg-[#0e1112]/90 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-2xl font-bold tracking-tight text-zinc-100">
            {value}
          </p>

          <p className="mt-0.5 text-xs text-zinc-500">
            {label}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-700">{sub}</p>
    </div>
  );
}

function DifficultyRow({
  dot,
  label,
  value,
}: {
  dot: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <span className="text-zinc-500">{label}</span>
      </div>

      <span className="font-medium text-zinc-400">{value}</span>
    </div>
  );
}

function DashboardPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-[#0e1112]/90 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>

        <span className="text-orange-500/70">{icon}</span>
      </div>

      {children}
    </div>
  );
}

function EmptyPanel({
  text,
  link,
  linkText,
  large = false,
}: {
  text: string;
  link: string;
  linkText: string;
  large?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/30 ${
        large ? "min-h-[210px]" : "min-h-[84px]"
      }`}
    >
      <div className="text-center">
        <p className="text-sm text-zinc-500">{text}</p>

        <Link
          href={link}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-orange-500 transition hover:text-orange-400"
        >
          {linkText}
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}