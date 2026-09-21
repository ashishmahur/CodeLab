"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // Auth pages have their own premium layout.
if (
  pathname.startsWith("/auth") ||
  pathname.startsWith("/dashboard") ||
  pathname.startsWith("/profile") ||
  pathname === "/history" ||
  pathname.startsWith("/feedback/")
) {
  return null;
}

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-8 lg:px-14">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-bold text-zinc-100"
        >
          <Code2 className="h-6 w-6 text-orange-500 transition-transform duration-300 group-hover:rotate-6" />

          <span>
            Code<span className="text-orange-500">Lab</span>
          </span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className="text-zinc-400 transition-colors duration-200 hover:text-orange-400"
          >
            Home
          </Link>

          <Link
            href="/problems"
            className="text-zinc-400 transition-colors duration-200 hover:text-orange-400"
          >
            Problems
          </Link>

          <Link
            href="/about"
            className="text-zinc-400 transition-colors duration-200 hover:text-orange-400"
          >
            About
          </Link>

          <Link
            href="/auth/login"
            className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-400 transition-all duration-200 hover:border-orange-500 hover:bg-orange-500 hover:text-zinc-950"
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}