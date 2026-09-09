import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-700 bg-zinc-900">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-8 lg:px-14">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-zinc-100 transition duration-200 hover:text-orange-400"
        >
          <Code2 className="h-6 w-6 text-orange-400" />
          CodeLab
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-7 text-sm font-medium">
          <Link
            href="/"
            className="text-zinc-300 transition duration-200 hover:text-orange-400"
          >
            Home
          </Link>

          <Link
            href="/problems"
            className="text-zinc-300 transition duration-200 hover:text-orange-400"
          >
            Problems
          </Link>

             <Link
            href="/about"
            className="text-zinc-300 transition duration-200 hover:text-orange-400"
          >
            About
          </Link>
          
        </div>

      </div>
    </nav>
  );
}