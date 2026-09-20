import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Code2,
  FileCode2,
  Flame,
  History,
  Home,
  Mail,
  Pencil,
  Settings,
  Sparkles,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Developer";

  const email = user?.email || "No email available";
  const initial = fullName.charAt(0).toUpperCase();

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Recently";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#090a0a] text-zinc-100">
      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen w-[244px] overflow-hidden border-r border-zinc-800/80 bg-[#0b0d0e] lg:block"
        style={{
          backgroundImage: `
            radial-gradient(circle at 78% 14%, rgba(249,115,22,0.10), transparent 18%),
            radial-gradient(circle at 70% 38%, rgba(249,115,22,0.055), transparent 22%),
            radial-gradient(circle at 45% 72%, rgba(249,115,22,0.035), transparent 28%),
            linear-gradient(rgba(249,115,22,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, auto, 42px 42px, 42px 42px",
        }}
      >
        <div className="flex h-full flex-col">
          <div className="px-7 pb-8 pt-7">
            <Link href="/" className="flex items-center gap-2">
              <Code2 className="h-7 w-7 text-orange-500" />
              <span className="text-2xl font-bold tracking-tight">
                Code<span className="text-orange-500">Lab</span>
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-3">
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900/80 hover:text-zinc-100"
              >
                <Home className="h-[18px] w-[18px]" />
                Dashboard
              </Link>

              <Link
                href="/problems"
                className="flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900/80 hover:text-zinc-100"
              >
                <FileCode2 className="h-[18px] w-[18px]" />
                Problems
              </Link>

              <Link
                href="/practice"
                className="flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900/80 hover:text-zinc-100"
              >
                <Code2 className="h-[18px] w-[18px]" />
                Practice
              </Link>

              <Link
                href="/ai-review"
                className="flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900/80 hover:text-zinc-100"
              >
                <Sparkles className="h-[18px] w-[18px]" />
                AI Review
              </Link>

              <Link
                href="/community"
                className="flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900/80 hover:text-zinc-100"
              >
                <Users className="h-[18px] w-[18px]" />
                Community
              </Link>

              <Link
                href="/profile"
                className="group relative flex h-11 items-center gap-3 overflow-hidden rounded-xl border border-orange-500/40 bg-orange-500/[0.08] px-4 text-sm font-medium text-orange-400"
              >
                <span className="absolute left-0 top-0 h-full w-[2px] bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
                <User className="h-[18px] w-[18px]" />
                Profile
              </Link>

              <Link
                href="/settings"
                className="flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900/80 hover:text-zinc-100"
              >
                <Settings className="h-[18px] w-[18px]" />
                Settings
              </Link>
            </div>
          </nav>

          <div className="shrink-0 px-5 pb-5">
            <div className="rounded-xl border border-orange-500/35 bg-orange-500/[0.045] p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <Sparkles className="h-4 w-4" />
              </div>

              <p className="text-sm font-semibold text-zinc-100">
                Keep Building
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Consistent practice creates real growth.
              </p>

              <ArrowUpRight className="mt-3 h-4 w-4 text-orange-400" />
            </div>
          </div>
        </div>
      </aside>

      <section className="min-h-screen lg:pl-[244px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-zinc-800/70 bg-[#090a0a]/90 px-5 backdrop-blur-xl lg:px-8">
          <div className="relative hidden w-full max-w-[680px] sm:block">
            <History className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

            <input
              type="text"
              placeholder="Search problems, topics, or anything..."
              className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-11 pr-12 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-orange-500/40"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-zinc-800 px-2 py-1 text-xs text-zinc-600">
              /
            </span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center text-zinc-500">
                <History className="h-5 w-5" />
              </div>

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            </div>

            <Link

            href="/profile"
            className="flex items-center gap-3 rounded-xl px-2.5 py-1.5 transition"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/50 bg-orange-500/10 text-sm font-bold text-orange-400">
                {initial}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-zinc-200">
                  {fullName}
                </p>
                <p className="text-xs text-zinc-500">Developer</p>
              </div>

              <ChevronRight className="hidden h-4 w-4 rotate-90 text-zinc-600 sm:block" />
            </Link>
            
          </div>
                  </header>
        
        <div
          className="relative min-h-[calc(100vh-72px)] overflow-hidden px-5 py-8 sm:px-8 lg:px-11"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        >
          <div className="pointer-events-none absolute right-[-160px] top-[-100px] h-[420px] w-[420px] rounded-full bg-orange-500/[0.035] blur-3xl" />

          <div className="relative mx-auto max-w-[1200px]">
            <div className="mb-7 flex items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold tracking-[-0.035em] text-zinc-100 sm:text-5xl">
                  {fullName}
                </h1>

                <p className="mt-2 text-base text-zinc-400">
                  A passionate developer, learning, building and improving
                  every day.
                </p>
              </div>

              <button className="hidden h-11 items-center gap-2 rounded-xl border border-orange-500/50 bg-orange-500/[0.06] px-5 text-sm font-medium text-zinc-200 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400 sm:flex">
                <Pencil className="h-4 w-4" />
                Edit Profile
              </button>
            </div>

            <div className="mb-8">
              <div className="profile-card relative">
                <div className="profile-beam absolute -inset-[1px] rounded-[23px]" />

                <div className="relative overflow-hidden rounded-[22px] border border-orange-500/50 bg-[#0c0d0d]/95 px-7 py-8 shadow-[0_0_45px_rgba(249,115,22,0.10)] sm:px-10">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.16]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(249,115,22,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.16) 1px, transparent 1px)",
                      backgroundSize: "34px 34px",
                    }}
                  />

                  <div className="pointer-events-none absolute right-0 top-0 h-full w-[48%] bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.08),transparent_55%)]" />

                  <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_0.8fr]">
                    <div className="flex items-center gap-7">
                      <div className="relative shrink-0">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-orange-500 bg-orange-500/[0.08] text-5xl font-bold text-orange-400 shadow-[0_0_28px_rgba(249,115,22,0.25)] sm:h-36 sm:w-36">
                          {initial}
                        </div>

                        <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.9)]" />
                      </div>

                      <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/[0.06] px-3 py-1 text-xs font-medium text-orange-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                          Developer
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <Mail className="h-4 w-4 text-zinc-500" />
                            {email}
                          </div>

                          <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <CalendarDays className="h-4 w-4 text-zinc-500" />
                            Member since {memberSince}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-l border-zinc-800/80 pl-7 lg:pl-9">
                      <div className="text-4xl leading-none text-orange-500">
                        “
                      </div>

                      <p className="mt-2 max-w-xs text-lg italic leading-8 text-zinc-300">
                        Consistent practice today, better solutions tomorrow.
                      </p>

                      <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-600">
                        Build · Learn · Grow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <section className="min-h-[250px] rounded-2xl border border-zinc-800/80 bg-[#0c0d0d]/85 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-zinc-400" />
                    <h2 className="text-xl font-semibold text-zinc-100">
                      About
                    </h2>
                  </div>

                  <button className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 transition hover:border-orange-500/40 hover:text-orange-400">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit About
                  </button>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                  I&apos;m a developer who loves solving problems, building
                  projects and learning new technologies. I&apos;m currently
                  practicing low level design, data structures and full stack
                  development to become a better engineer every day.
                </p>
              </section>

              <section className="min-h-[250px] rounded-2xl border border-zinc-800/80 bg-[#0c0d0d]/85 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-zinc-400" />
                    <h2 className="text-xl font-semibold text-zinc-100">
                      Recent Activity
                    </h2>
                  </div>

                  <button className="flex items-center gap-1 text-sm font-medium text-orange-400 transition hover:text-orange-300">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-500">
                      <FileCode2 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        No recent attempts
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Start solving problems to see your activity here.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-500">
                      <Trophy className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        No achievements yet
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Keep practicing. Your progress will show up here.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<Code2 className="h-5 w-5" />}
                value="0"
                label="Problems Solved"
                className="border-emerald-500/60 bg-emerald-500/[0.045] text-emerald-400"
              />

              <StatCard
                icon={<Trophy className="h-5 w-5" />}
                value="0"
                label="Leaderboard"
                className="border-purple-500/60 bg-purple-500/[0.045] text-purple-400"
              />

              <StatCard
                icon={<Check className="h-5 w-5" />}
                value="0%"
                label="Average AI Score"
                className="border-sky-500/60 bg-sky-500/[0.045] text-sky-400"
              />

              <StatCard
                icon={<Flame className="h-5 w-5" />}
                value="0"
                label="Current Streak"
                className="border-orange-500/60 bg-orange-500/[0.045] text-orange-400"
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-5 pb-5 text-xs text-zinc-600">
              <span>Consistent practice</span>
              <span>•</span>
              <span>Better solutions</span>
              <span>•</span>
              <span>A stronger developer</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes profileBeam {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes profileFloat {
          0%,
          100% {
            transform: rotate(-0.55deg) translateY(0);
          }
          50% {
            transform: rotate(-0.55deg) translateY(-2px);
          }
        }

        @keyframes profileHover {
          0%,
          100% {
            transform: rotate(-0.55deg) translateY(0);
          }
          50% {
            transform: rotate(0deg) translateY(-5px);
          }
        }

        .profile-card {
          transform: rotate(-0.55deg);
          animation: profileFloat 6s ease-in-out infinite;
          transition: transform 300ms ease, filter 300ms ease;
        }

        .profile-card:hover {
          animation: profileHover 700ms ease-in-out infinite;
          filter: brightness(1.05);
        }

        .profile-beam {
          overflow: hidden;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 300deg,
            rgba(249, 115, 22, 0.15) 320deg,
            rgba(249, 115, 22, 0.95) 350deg,
            #fb923c 360deg
          );
          animation: profileBeam 4s linear infinite;
          filter: blur(0.4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .profile-card,
          .profile-beam {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
  className,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className="relative z-10">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-black/20">
          {icon}
        </div>

        <p className="text-3xl font-semibold text-zinc-100">{value}</p>

        <p className="mt-1 text-sm text-zinc-300">{label}</p>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-8 h-28 w-44 rotate-[-22deg] rounded-full border border-current opacity-20 transition duration-500 group-hover:translate-x-4" />
    </div>
  );
}