import Link from "next/link";
import {
  ArrowRight,
  Car,
  Building2,
  CupSoda,
  Ticket,
  CreditCard,
} from "lucide-react";

const problems = [
  {
    id: "parking-lot",
    title: "Parking Lot",
    description:
      "Design a parking lot that supports different vehicle types and parking spots.",
    difficulty: "Medium",
    topics: ["OOP", "SOLID", "Strategy"],
    icon: Car,
  },
  {
    id: "elevator-system",
    title: "Elevator System",
    description:
      "Design an elevator system that handles requests from multiple floors efficiently.",
    difficulty: "Medium",
    topics: ["OOP", "State", "Scheduling"],
    icon: Building2,
  },
  {
    id: "vending-machine",
    title: "Vending Machine",
    description:
      "Design a vending machine that manages products, payments, and inventory.",
    difficulty: "Easy",
    topics: ["OOP", "State", "Encapsulation"],
    icon: CupSoda,
  },
  {
    id: "movie-ticket-booking",
    title: "Movie Ticket Booking",
    description:
      "Design a booking system for theatres, shows, seats, and reservations.",
    difficulty: "Medium",
    topics: ["OOP", "Composition", "Booking"],
    icon: Ticket,
  },
  {
    id: "atm-system",
    title: "ATM System",
    description:
      "Design an ATM that manages authentication, transactions, and cash withdrawal.",
    difficulty: "Medium",
    topics: ["OOP", "State", "Transactions"],
    icon: CreditCard,
  },
];

export default function ProblemsPage() {
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

        {/* Problem Cards */}
        <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;

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
                <span className="mt-3 w-fit rounded-md border border-zinc-600 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
                  {problem.difficulty}
                </span>

                {/* Description */}
                <p className="mt-4 flex-1 text-sm leading-6 text-zinc-400">
                  {problem.description}
                </p>

                {/* Topics */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {problem.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-400"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* View Problem */}
                <Link
                  href={`/problems/${problem.id}`}
                  className="mt-6 flex items-center justify-between rounded-lg border border-zinc-500 px-4 py-3 text-sm font-medium text-zinc-200 transition duration-200 hover:border-orange-400 hover:bg-zinc-900 hover:text-orange-400"
                >
                  View Problem

                  <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}