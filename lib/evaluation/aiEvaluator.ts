import { GoogleGenAI, Type } from "@google/genai";

export type AIEvaluation = {
  overallScore: number;
  correctnessScore: number;
  approachScore: number;
  timeComplexityScore: number;
  spaceComplexityScore: number;
  codeQualityScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
};

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function evaluateWithAI(
  problemTitle: string,
  problemDescription: string,
  requirements: string[],
  solution: string
): Promise<AIEvaluation> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const prompt = `
You are an experienced Data Structures and Algorithms interviewer and mentor.

Evaluate the following student's DSA solution.

PROBLEM:
${problemTitle}

PROBLEM DESCRIPTION:
${problemDescription}

REQUIREMENTS:
${requirements.map((item) => `- ${item}`).join("\n")}

STUDENT SUBMISSION:
${solution}

Evaluate the submission based on:

1. Correctness (0-4 points):
   - Does the solution solve the problem correctly?
   - Does the logic produce the expected result?
   - Check for logical errors and incorrect assumptions.
   - Consider the provided problem requirements and examples.

2. Approach (0-2 points):
   - Is the chosen algorithm appropriate?
   - Is the problem-solving approach logically sound?
   - Are unnecessary operations avoided?

3. Time Complexity (0-2 points):
   - Analyze the actual time complexity of the submitted code.
   - Compare it with the expected efficient approach.
   - Do not assume an optimization that is not present in the code.

4. Space Complexity (0-1 point):
   - Analyze the actual auxiliary space used by the submitted code.
   - Consider arrays, hash maps, recursion stacks, and other additional memory.

5. Code Quality (0-1 point):
   - Naming
   - Readability
   - Structure
   - Maintainability
   - Avoidance of unnecessary duplication

IMPORTANT:
- Multiple approaches can be valid.
- Do not expect one specific implementation.
- Judge the actual submitted code.
- Do not invent code, logic, variables, or behavior that are not present.
- If the submission is incomplete, reflect that in the correctness and other scores.
- Do not give full correctness merely because the approach looks reasonable.
- Carefully inspect the actual implementation.
- Be constructive and specific.
- Explain important mistakes clearly.
- Do not return an overall score. The application will calculate it.
- Return concise and specific feedback.

Return JSON matching the requested schema.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          correctnessScore: {
            type: Type.INTEGER,
            description: "Correctness score from 0 to 4.",
          },
          approachScore: {
            type: Type.INTEGER,
            description: "Approach score from 0 to 2.",
          },
          timeComplexityScore: {
            type: Type.INTEGER,
            description: "Time complexity score from 0 to 2.",
          },
          spaceComplexityScore: {
            type: Type.INTEGER,
            description: "Space complexity score from 0 to 1.",
          },
          codeQualityScore: {
            type: Type.INTEGER,
            description: "Code quality score from 0 to 1.",
          },
          strengths: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          weaknesses: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        required: [
          "correctnessScore",
          "approachScore",
          "timeComplexityScore",
          "spaceComplexityScore",
          "codeQualityScore",
          "strengths",
          "weaknesses",
          "suggestions",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  const result = JSON.parse(response.text);

  const correctnessScore = Math.max(
    0,
    Math.min(4, Number(result.correctnessScore) || 0)
  );

  const approachScore = Math.max(
    0,
    Math.min(2, Number(result.approachScore) || 0)
  );

  const timeComplexityScore = Math.max(
    0,
    Math.min(2, Number(result.timeComplexityScore) || 0)
  );

  const spaceComplexityScore = Math.max(
    0,
    Math.min(1, Number(result.spaceComplexityScore) || 0)
  );

  const codeQualityScore = Math.max(
    0,
    Math.min(1, Number(result.codeQualityScore) || 0)
  );

  const overallScore =
    correctnessScore +
    approachScore +
    timeComplexityScore +
    spaceComplexityScore +
    codeQualityScore;

  return {
    overallScore,
    correctnessScore,
    approachScore,
    timeComplexityScore,
    spaceComplexityScore,
    codeQualityScore,
    strengths: Array.isArray(result.strengths) ? result.strengths : [],
    weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses : [],
    suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
  };
}