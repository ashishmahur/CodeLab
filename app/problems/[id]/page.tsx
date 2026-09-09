"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { evaluateSolution } from "@/lib/evaluation/evaluator";

const problems = {
  "parking-lot": {
    title: "Parking Lot",
    description:
      "Design a parking lot that supports different vehicle types and parking spots.",
    difficulty: "Medium",
    requirements: [
      "Support different types of vehicles.",
      "Support different types of parking spots.",
      "Assign a suitable parking spot to a vehicle.",
      "Allow vehicles to leave the parking lot.",
      "Track available and occupied parking spots.",
      "Keep the design easy to extend.",
    ],
    submit: [
      "Important classes and interfaces",
      "Parking and vehicle behaviour",
      "Relationships between classes",
      "Important design decisions",
    ],
    example: `class ParkingLot {
    private spots: ParkingSpot[];

    park(vehicle: Vehicle) {
        // ...
    }

    exit(vehicle: Vehicle) {
        // ...
    }
}

interface ParkingStrategy {
    findSpot(vehicle: Vehicle): ParkingSpot;
}

Explain your design decisions below...`,
  },

  "elevator-system": {
    title: "Elevator System",
    description:
      "Design an elevator system that handles requests from different floors and manages elevator movement.",
    difficulty: "Medium",
    requirements: [
      "Support multiple floors.",
      "Support multiple elevators.",
      "Accept requests from different floors.",
      "Move elevators based on requests.",
      "Handle elevator states.",
      "Keep the system easy to extend.",
    ],
    submit: [
      "Important classes and interfaces",
      "Elevator request handling",
      "Relationships between classes",
      "Important design decisions",
    ],
    example: `class Elevator {
    private currentFloor: number;

    moveTo(floor: number) {
        // ...
    }

    openDoor() {
        // ...
    }
}

interface SchedulingStrategy {
    selectElevator(request: ElevatorRequest): Elevator;
}

Explain your design decisions below...`,
  },

  "vending-machine": {
    title: "Vending Machine",
    description:
      "Design a vending machine that manages products, payments, and inventory.",
    difficulty: "Easy",
    requirements: [
      "Display available products.",
      "Allow users to select a product.",
      "Accept payments.",
      "Return change when required.",
      "Handle unavailable products.",
      "Keep the system easy to extend.",
    ],
    submit: [
      "Important classes and interfaces",
      "Product and inventory management",
      "Payment handling",
      "Relationships between classes",
      "Important design decisions",
    ],
    example: `class VendingMachine {
    private inventory: Inventory;

    selectProduct(productId: string) {
        // ...
    }

    insertMoney(amount: number) {
        // ...
    }

    dispenseProduct() {
        // ...
    }
}

interface PaymentStrategy {
    processPayment(amount: number): boolean;
}

Explain your design decisions below...`,
  },

  "movie-ticket-booking": {
    title: "Movie Ticket Booking",
    description:
      "Design a booking system for theatres, shows, seats, and reservations.",
    difficulty: "Medium",
    requirements: [
      "Support multiple theatres.",
      "Support multiple movies and shows.",
      "Allow users to view available seats.",
      "Allow users to select and book seats.",
      "Prevent double booking.",
      "Keep the system easy to extend.",
    ],
    submit: [
      "Important classes and interfaces",
      "Movie, theatre, show and seat relationships",
      "Booking behaviour",
      "Handling seat availability",
      "Important design decisions",
    ],
    example: `class Show {
    private seats: Seat[];

    getAvailableSeats(): Seat[] {
        // ...
    }

    bookSeat(seatId: string) {
        // ...
    }
}

class Booking {
    private show: Show;
    private seats: Seat[];

    confirm() {
        // ...
    }
}

Explain your design decisions below...`,
  },

  "atm-system": {
    title: "ATM System",
    description:
      "Design an ATM that manages authentication, transactions, and cash withdrawal.",
    difficulty: "Medium",
    requirements: [
      "Authenticate a user using a card and PIN.",
      "Allow balance enquiry.",
      "Allow cash withdrawal.",
      "Allow cash deposit.",
      "Handle insufficient balance and cash.",
      "Keep the system easy to extend.",
    ],
    submit: [
      "Important classes and interfaces",
      "Authentication flow",
      "Transaction handling",
      "ATM state management",
      "Relationships between classes",
      "Important design decisions",
    ],
    example: `class ATM {
    private state: ATMState;

    insertCard(card: Card) {
        // ...
    }

    enterPin(pin: string) {
        // ...
    }

    withdraw(amount: number) {
        // ...
    }
}

interface ATMState {
    insertCard(card: Card): void;
    withdraw(amount: number): void;
}

Explain your design decisions below...`,
  },
};

export default function ProblemPage() {
  const params = useParams();
    const router = useRouter();
  
  const id = params.id as keyof typeof problems;

  const problem = problems[id];

  const [solution, setSolution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!problem) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 px-8 py-16 text-zinc-100">
        <div className="mx-auto max-w-[1500px]">
          <h1 className="text-3xl font-bold">Problem not found</h1>

          <Link
            href="/problems"
            className="mt-6 inline-flex items-center gap-2 text-orange-400 hover:text-orange-300"
          >
            <ArrowLeft size={18} />
            Back to Problems
          </Link>
        </div>
      </main>
    );
  }

  async function handleSubmit() {
    if (!solution.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);
    setError("");

    try {
      const supabase = createClient();

      // Step 1: Find the problem in Supabase
      const { data: problemData, error: problemError } = await supabase
        .from("problems")
        .select("id")
        .eq("slug", id)
        .single();

      if (problemError) {
        throw problemError;
      }

      // Step 2: Save the attempt
      const { data: attemptData, error: attemptError } = await supabase
        .from("attempts")
        .insert({
          problem_id: problemData.id,
          solution: solution.trim(),
          language: "text",
          status: "submitted",
        })
        .select("id")
        .single();

      if (attemptError) {
        throw attemptError;
      }

      // Step 3: Evaluate the solution
      const evaluation = evaluateSolution(id, solution);

      // Step 4: Save feedback
      const { error: feedbackError } = await supabase
        .from("feedback")
        .insert({
          attempt_id: attemptData.id,
          overall_score: evaluation.overallScore,
          design_score: evaluation.designScore,
          extensibility_score: evaluation.extensibilityScore,
          code_quality_score: evaluation.codeQualityScore,
          edge_case_score: evaluation.edgeCaseScore,
          strengths: evaluation.strengths,
          weaknesses: evaluation.weaknesses,
          suggestions: evaluation.suggestions,
        });

   if (feedbackError) {
  throw feedbackError;
}

           router.push(`/feedback/${attemptData.id}`);


    } catch (error) {
      console.error("Submission error:", error);

      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);

      setError(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-[1600px] px-6 py-6 lg:px-10">
        <Link
          href="/problems"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition duration-200 hover:text-orange-400"
        >
          <ArrowLeft size={16} />
          Back to Problems
        </Link>

        <div className="mt-5">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Practice
            </p>

            <span className="rounded-md border border-zinc-600 bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
              {problem.difficulty}
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            {problem.title}
          </h1>

          <p className="mt-2 max-w-4xl text-base text-zinc-400">
            {problem.description}
          </p>
        </div>

        <div className="mt-6 grid h-[calc(100vh-220px)] min-h-[520px] gap-5 lg:grid-cols-2">
          <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-600 bg-zinc-800">
            <div className="shrink-0 border-b border-zinc-600 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">Problem</h2>

              <p className="mt-1 text-sm text-zinc-500">
                Understand the requirements before designing your solution.
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Requirements
                </h3>

                <ul className="mt-3 space-y-2.5">
                  {problem.requirements.map((requirement) => (
                    <li
                      key={requirement}
                      className="flex gap-3 text-sm leading-6 text-zinc-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 border-t border-zinc-700 pt-6">
                <h3 className="text-base font-semibold text-white">
                  What you should submit
                </h3>

                <ul className="mt-3 space-y-2.5">
                  {problem.submit.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-zinc-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 border-t border-zinc-700 pt-6">
                <h3 className="text-base font-semibold text-white">
                  Think about
                </h3>

                <ul className="mt-3 space-y-2.5 text-sm leading-6 text-zinc-400">
                  <li>• What classes do you need?</li>
                  <li>• What are their responsibilities?</li>
                  <li>• How should the classes interact?</li>
                  <li>• Which interfaces are useful?</li>
                  <li>• How can the design be extended?</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-zinc-600 bg-zinc-800">
            <div className="shrink-0 border-b border-zinc-600 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">
                Your Solution
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Write your classes, interfaces, relationships, and design
                decisions.
              </p>
            </div>

            <textarea
              value={solution}
              onChange={(event) => {
                setSolution(event.target.value);
                setSubmitted(false);
                setError("");
              }}
              placeholder={problem.example}
              className="min-h-0 flex-1 resize-none bg-zinc-950 p-5 font-mono text-sm leading-6 text-zinc-200 outline-none placeholder:text-zinc-700"
              spellCheck={false}
            />

            <div className="shrink-0 border-t border-zinc-600 px-5 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  {solution.length} characters
                </span>

                <button
                  onClick={handleSubmit}
                  disabled={!solution.trim() || isSubmitting}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    "Submit Solution"
                  )}
                </button>
              </div>

              {submitted && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-700 bg-green-950/40 px-3 py-2 text-sm text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Solution submitted and evaluated successfully!
                </div>
              )}

              {error && (
                <div className="mt-3 rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}