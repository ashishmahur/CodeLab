"use client";

import Link from "next/link";
import {
  BrainCircuit,
  Code2,
  Home,
  History,
  Library,
  Map,
  Settings,
  Sparkles,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  showBottomSection?: boolean;
};

export default function DashboardSidebar({
  showBottomSection = true,
}: Props) {
  const pathname = usePathname();

  return (
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
        backgroundSize: "auto, auto, auto, 42px 42px",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-[82px] h-px w-full bg-orange-500/[0.10]" />
        <div className="absolute left-0 top-[190px] h-px w-full bg-orange-500/[0.07]" />
        <div className="absolute left-0 top-[310px] h-px w-full bg-orange-500/[0.06]" />
        <div className="absolute left-0 top-[445px] h-px w-full bg-orange-500/[0.07]" />

        <div className="absolute left-[48px] top-0 h-full w-px bg-orange-500/[0.045]" />
        <div className="absolute left-[108px] top-0 h-full w-px bg-orange-500/[0.05]" />
        <div className="absolute left-[176px] top-0 h-full w-px bg-orange-500/[0.045]" />

        <span className="absolute right-[35px] top-[84px] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_14px_5px_rgba(249,115,22,0.45)]" />
        <span className="absolute right-[76px] top-[190px] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_13px_5px_rgba(249,115,22,0.35)]" />
        <span className="absolute right-[31px] top-[310px] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_15px_5px_rgba(249,115,22,0.4)]" />
        <span className="absolute left-[108px] top-[445px] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_14px_5px_rgba(249,115,22,0.3)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-[72px] shrink-0 items-center border-b border-zinc-800/70 px-7">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2.5"
          >
            <Code2 className="h-7 w-7 text-orange-500 transition-transform duration-300 group-hover:rotate-6" />

            <div>
              <div className="text-xl font-bold tracking-tight">
                Code<span className="text-orange-500">Lab</span>
              </div>

              <p className="text-[9px] tracking-[0.18em] text-zinc-600">
                BUILD. PRACTICE. GROW.
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-hidden px-3 pt-1">
          <NavItem
            href="/dashboard"
            icon={<Home size={19} />}
            label="Dashboard"
            active={pathname === "/dashboard"}
          />

          <NavItem
            href="/problems"
            icon={<Library size={19} />}
            label="Problems"
            active={pathname.startsWith("/problems")}
          />

          <NavItem
            href="/history"
            icon={<History size={19} />}
            label="History"
            active={pathname.startsWith("/history")}
          />

          <NavItem
            href="/ai-review"
            icon={<BrainCircuit size={19} />}
            label="AI Review"
            active={pathname.startsWith("/ai-review")}
          />

          <NavItem
            href="/contests"
            icon={<Trophy size={19} />}
            label="Contests"
            badge="New"
            active={pathname.startsWith("/contests")}
          />

          <NavItem
            href="/learning"
            icon={<Map size={19} />}
            label="Learning Paths"
            active={pathname.startsWith("/learning")}
          />

          <NavItem
            href="/community"
            icon={<Users size={19} />}
            label="Community"
            active={pathname.startsWith("/community")}
          />

          <NavItem
            href="/profile"
            icon={<User size={19} />}
            label="Profile"
            active={pathname.startsWith("/profile")}
          />

          <NavItem
            href="/settings"
            icon={<Settings size={19} />}
            label="Settings"
            active={pathname.startsWith("/settings")}
          />
        </nav>

        {showBottomSection && (
          <div className="shrink-0 px-5 pb-3">
            <div className="rounded-xl border border-orange-500/40 bg-orange-500/[0.045] p-3.5">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={17}
                  className="shrink-0 text-orange-500"
                />

                <h3 className="text-sm font-semibold text-orange-400">
                  Upgrade to Pro
                </h3>
              </div>

              <p className="mt-2 text-[11px] leading-4 text-zinc-600">
                Unlock advanced AI insights, custom tests, and more.
              </p>

              <button className="mt-2.5 flex h-8.5 w-full items-center justify-center rounded-lg bg-orange-500 text-xs font-bold text-black transition hover:bg-orange-400">
                Upgrade Now
              </button>
            </div>

            <div className="mt-4 px-2">
              <p className="text-[11px] leading-4 text-zinc-600">
                “A little progress every day adds up to big results.”
              </p>

              <div className="mt-3 h-px w-8 bg-orange-500" />
            </div>

            <p className="mt-4 px-2 text-[9px] tracking-[0.2em] text-zinc-700">
              CODELAB V2.0
            </p>
          </div>
        )}
      </div>
    </aside>
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