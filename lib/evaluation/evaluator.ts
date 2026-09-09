export type EvaluationResult = {
  overallScore: number;
  designScore: number;
  extensibilityScore: number;
  codeQualityScore: number;
  edgeCaseScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
};

const criteria: Record<
  string,
  {
    classes: string[];
    interfaces: string[];
    concepts: string[];
    edgeCases: string[];
  }
> = {
  "parking-lot": {
    classes: ["vehicle", "parkingspot", "parkinglot"],
    interfaces: ["interface", "strategy"],
    concepts: ["responsibility", "vehicle", "spot"],
    edgeCases: ["full", "null", "available", "fit"],
  },

  "elevator-system": {
    classes: ["elevator", "request", "controller"],
    interfaces: ["interface", "strategy"],
    concepts: ["state", "request", "floor"],
    edgeCases: ["multiple", "idle", "invalid", "request"],
  },

  "vending-machine": {
    classes: ["vendingmachine", "product", "inventory"],
    interfaces: ["interface", "payment"],
    concepts: ["state", "payment", "inventory"],
    edgeCases: ["change", "unavailable", "insufficient", "empty"],
  },

  "movie-ticket-booking": {
    classes: ["movie", "theatre", "show", "seat", "booking"],
    interfaces: ["interface"],
    concepts: ["booking", "availability", "seat"],
    edgeCases: ["double", "available", "cancel", "occupied"],
  },

  "atm-system": {
    classes: ["atm", "card", "account", "transaction"],
    interfaces: ["interface", "state"],
    concepts: ["authentication", "transaction", "balance"],
    edgeCases: ["insufficient", "invalid", "cash", "pin"],
  },
};

function containsAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

export function evaluateSolution(
  problemSlug: string,
  solution: string
): EvaluationResult {
  const text = solution.toLowerCase();

  const problemCriteria = criteria[problemSlug];

  if (!problemCriteria) {
    return {
      overallScore: 0,
      designScore: 0,
      extensibilityScore: 0,
      codeQualityScore: 0,
      edgeCaseScore: 0,
      strengths: [],
      weaknesses: ["No evaluation criteria found for this problem."],
      suggestions: ["Add evaluation criteria for this problem."],
    };
  }

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  let designScore = 0;
  let extensibilityScore = 0;
  let codeQualityScore = 0;
  let edgeCaseScore = 0;

  // Design evaluation
  const classCount = problemCriteria.classes.filter((item) =>
    text.includes(item)
  ).length;

  if (classCount >= 3) {
    designScore += 3;
    strengths.push(
      "The solution identifies several important domain classes."
    );
  } else {
    weaknesses.push(
      "The solution does not clearly identify enough important domain classes."
    );

    suggestions.push(
      "Identify the main entities in the problem and give each a clear responsibility."
    );
  }

  if (containsAny(text, problemCriteria.concepts)) {
    designScore += 1;
    strengths.push("The solution discusses important domain responsibilities.");
  } else {
    weaknesses.push(
      "Responsibilities of the main components are not clearly explained."
    );

    suggestions.push(
      "Explain what each major class is responsible for."
    );
  }

  // Extensibility evaluation
  if (containsAny(text, problemCriteria.interfaces)) {
    extensibilityScore += 2;
    strengths.push(
      "The solution considers interfaces or interchangeable behaviour."
    );
  } else {
    weaknesses.push(
      "The design does not clearly demonstrate extensible abstractions."
    );

    suggestions.push(
      "Consider interfaces or strategies where behaviour may change in the future."
    );
  }

  if (
    text.includes("strategy") ||
    text.includes("interface") ||
    text.includes("abstract")
  ) {
    extensibilityScore += 1;
  }

  // Code quality evaluation
  if (text.includes("class")) {
    codeQualityScore += 1;
    strengths.push("The solution represents the domain using classes.");
  } else {
    weaknesses.push(
      "The solution does not clearly use class-based domain modelling."
    );
  }

  if (
    text.includes("private") ||
    text.includes("public") ||
    text.includes("method")
  ) {
    codeQualityScore += 1;
    strengths.push(
      "The solution shows some encapsulation or method-level design."
    );
  } else {
    suggestions.push(
      "Make class responsibilities and public operations explicit."
    );
  }

  // Edge-case evaluation
  const edgeCaseCount = problemCriteria.edgeCases.filter((item) =>
    text.includes(item)
  ).length;

  if (edgeCaseCount >= 2) {
    edgeCaseScore += 2;
    strengths.push("The solution considers important edge cases.");
  } else {
    weaknesses.push("Important edge cases are not clearly addressed.");

    suggestions.push(
      "Explain how the design handles invalid input, unavailable resources, or failure scenarios."
    );
  }

  // Final score
  const rawScore =
    designScore +
    extensibilityScore +
    codeQualityScore +
    edgeCaseScore;

  const overallScore = Math.min(10, Math.max(1, rawScore));

  if (strengths.length === 0) {
    strengths.push(
      "The solution provides a starting point for the design."
    );
  }

  if (weaknesses.length === 0) {
    weaknesses.push(
      "No major structural weaknesses were detected by the basic evaluator."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Consider whether the design can support new requirements without major changes."
    );
  }

  return {
    overallScore,
    designScore,
    extensibilityScore,
    codeQualityScore,
    edgeCaseScore,
    strengths,
    weaknesses,
    suggestions,
  };
}