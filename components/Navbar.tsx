
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardUserMenu from "@/components/DashboardUserMenu";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (!user) {
        setUserName(null);
        setAuthLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      setUserName(
        profile?.full_name?.trim() ||
          user.user_metadata?.full_name?.trim() ||
          user.user_metadata?.name?.trim() ||
          user.email?.split("@")[0] ||
          "Developer"
      );

      setAuthLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/problems") ||
    pathname === "/history" ||
    pathname.startsWith("/feedback/")
  ) {
    return null;
  }

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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

          {!authLoading &&
            (userName ? (
              <DashboardUserMenu name={userName} />
            ) : (
              <Link
                href="/auth/login"
                className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-400 transition-all duration-200 hover:border-orange-500 hover:bg-orange-500 hover:text-zinc-950"
              >
                Sign in
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
}
