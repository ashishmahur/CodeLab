"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticePage() {
  const [solution, setSolution] = useState("");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <Link
          href="/problems"
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back to Problems
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
            Practice
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Design a Parking Lot
          </h1>

          <p className="mt-3 text-slate-400">
            Write your classes, interfaces, relationships, and important
            design decisions below.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Problem Summary */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              What to think about
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>• What classes do you need?</li>
              <li>• What are their responsibilities?</li>
              <li>• How should the classes interact?</li>
              <li>• Which interfaces are useful?</li>
              <li>• How can the design be extended?</li>
            </ul>
          </section>

          {/* Editor */}
          <section className="lg:col-span-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 px-5 py-4">
                <h2 className="font-semibold">
                  Your Solution
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  You can write pseudocode, classes, interfaces, or explain
                  your design.
                </p>
              </div>

              <textarea
                value={solution}
                onChange={(event) => setSolution(event.target.value)}
                placeholder={`Example:

class ParkingLot {
    private spots: ParkingSpot[];

    park(vehicle: Vehicle) {
        // ...
    }
}

interface ParkingStrategy {
    findSpot(vehicle: Vehicle): ParkingSpot;
}

Explain your design decisions below...`}
                className="min-h-[450px] w-full resize-none bg-slate-950 p-5 font-mono text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600"
              />

              <div className="flex items-center justify-between border-t border-slate-800 px-5 py-4">
                <span className="text-sm text-slate-500">
                  {solution.length} characters
                </span>

                <button
                  disabled={!solution.trim()}
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Solution
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}