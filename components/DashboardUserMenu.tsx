"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Home, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Props = {
  name: string;
};

export default function DashboardUserMenu({ name }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 async function handleSignOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  router.push("/auth/login?message=Hey%20Developer%20%F0%9F%91%8B%20See%20you%20soon.%20Keep%20building.");
  router.refresh();
}

  const initial = name.charAt(0).toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-zinc-900"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/10 text-sm font-semibold text-orange-400">
          {initial}
        </div>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-zinc-200">{name}</p>
          <p className="text-xs text-zinc-500">Developer</p>
        </div>

        <ChevronDown
          className={`hidden h-4 w-4 text-zinc-500 transition-transform sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-zinc-800 bg-[#111314] p-1.5 shadow-2xl shadow-black/40">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-orange-500/10 hover:text-orange-400"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-orange-500/10 hover:text-orange-400"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>

          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-orange-500/10 hover:text-orange-400"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>

          <div className="my-1 border-t border-zinc-800" />

          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}