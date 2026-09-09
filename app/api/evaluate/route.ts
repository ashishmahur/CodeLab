import { NextResponse } from "next/server";
import { evaluateWithAI } from "@/lib/evaluation/aiEvaluator";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      problemTitle,
      problemDescription,
      requirements,
      solution,
    } = body;

    if (!problemTitle || !problemDescription || !solution) {
      return NextResponse.json(
        {
          success: false,
          error: "Problem details and solution are required.",
        },
        { status: 400 }
      );
    }

    const evaluation = await evaluateWithAI(
      problemTitle,
      problemDescription,
      requirements || [],
      solution
    );

    return NextResponse.json({
      success: true,
      evaluation,
    });
  } catch (error) {
    console.error("AI evaluation error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "AI evaluation failed.";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}