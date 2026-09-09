import { GoogleGenAI, Type } from "@google/genai";

export type AIEvaluation = {
  overallScore: number;
  designScore: number;
  extensibilityScore: number;
  codeQualityScore: number;
  edgeCaseScore: number;
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
You are an experienced Low Level Design interviewer and mentor.

Evaluate the following student's LLD solution.

PROBLEM:
${problemTitle}

PROBLEM DESCRIPTION:
${problemDescription}

REQUIREMENTS:
${requirements.map((item) => `- ${item}`).join("\n")}

STUDENT SUBMISSION:
${solution}

Evaluate the submission based on:

1. Design (0-4 points):
   - Classes and responsibilities
   - Abstraction
   - Encapsulation
   - Separation of concerns
   - Object-oriented design quality

2. Extensibility (0-3 points):
   - Ability to add future requirements
   - Interfaces and abstractions
   - Avoidance of tightly coupled logic
   - Ease of changing behavior

3. Code Quality (0-2 points):
   - Naming
   - Structure
   - Readability
   - Maintainability
   - Avoidance of unnecessary duplication

4. Edge Cases (0-1 point):
   - Invalid inputs
   - Boundary cases
   - Failure scenarios
   - Practical real-world cases

IMPORTANT:
- Multiple designs can be valid.
- Do not expect one specific implementation.
- Do not reward the student merely for mentioning design patterns.
- Judge whether the design actually makes sense.
- Do not invent classes or behavior that are not present.
- If the submission is incomplete, reflect that in the scores.
- Give constructive feedback suitable for a student learning LLD.
- Be specific about what is present or missing in the submission.
- Do NOT return an overall score. The application will calculate it.

Return concise and specific feedback.
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
          designScore: {
            type: Type.INTEGER,
            description: "Design score from 0 to 4.",
          },
          extensibilityScore: {
            type: Type.INTEGER,
            description: "Extensibility score from 0 to 3.",
          },
          codeQualityScore: {
            type: Type.INTEGER,
            description: "Code quality score from 0 to 2.",
          },
          edgeCaseScore: {
            type: Type.INTEGER,
            description: "Edge case score from 0 to 1.",
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
          "designScore",
          "extensibilityScore",
          "codeQualityScore",
          "edgeCaseScore",
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

  const designScore = Math.max(
    0,
    Math.min(4, Number(result.designScore) || 0)
  );

  const extensibilityScore = Math.max(
    0,
    Math.min(3, Number(result.extensibilityScore) || 0)
  );

  const codeQualityScore = Math.max(
    0,
    Math.min(2, Number(result.codeQualityScore) || 0)
  );

  const edgeCaseScore = Math.max(
    0,
    Math.min(1, Number(result.edgeCaseScore) || 0)
  );

  const overallScore =
    designScore +
    extensibilityScore +
    codeQualityScore +
    edgeCaseScore;

  return {
    overallScore,
    designScore,
    extensibilityScore,
    codeQualityScore,
    edgeCaseScore,
    strengths: Array.isArray(result.strengths)
      ? result.strengths
      : [],
    weaknesses: Array.isArray(result.weaknesses)
      ? result.weaknesses
      : [],
    suggestions: Array.isArray(result.suggestions)
      ? result.suggestions
      : [],
  };
}