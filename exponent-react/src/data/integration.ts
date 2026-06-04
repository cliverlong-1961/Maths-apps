import type { Topic } from "../types/Topic";

export const integrationTopics: Topic[] = [
  {
    id: "functions",
    title: "Functions",
    summary: "Understand algebraic functions and notation.",
    specRef: "Prior knowledge",
    dependsOn: [],
  },

  {
    id: "differentiation",
    title: "Differentiation",
    summary: "Differentiate functions using standard rules.",
    specRef: "Pure Mathematics",
    dependsOn: [],
  },

  {
    id: "antiderivative",
    title: "Integration as Anti-Differentiation",
    summary:
      "Integration reverses differentiation.",
    specRef: "Integration",
    dependsOn: ["functions", "differentiation"],
  },

  {
    id: "power-rule-integration",
    title: "Power Rule for Integration",
    summary:
      "Integrate xⁿ using ∫xⁿdx = xⁿ⁺¹/(n+1) + c.",
    specRef: "Integration",
    dependsOn: ["antiderivative"],
  },

  {
    id: "indefinite-integrals",
    title: "Indefinite Integrals",
    summary:
      "Find families of functions using integration.",
    specRef: "Integration",
    dependsOn: ["power-rule-integration"],
  },

  {
    id: "definite-integrals",
    title: "Definite Integrals",
    summary:
      "Evaluate an integral between two limits.",
    specRef: "Integration",
    dependsOn: ["indefinite-integrals"],
  },

  {
    id: "fundamental-theorem",
    title: "Fundamental Theorem of Calculus",
    summary:
      "Connects differentiation and definite integration.",
    specRef: "Integration",
    dependsOn: [
      "differentiation",
      "definite-integrals"
    ],
  },

  {
    id: "area-under-curve",
    title: "Area Under a Curve",
    summary:
      "Use definite integrals to calculate areas.",
    specRef: "Integration",
    dependsOn: [
      "definite-integrals",
      "fundamental-theorem"
    ],
  },
  {
    id: "integration-by-parts",
    title: "Integration by Parts",
    summary: "Integrate products of functions.",
    specRef: "Integration",
    dependsOn: [
      "indefinite-integrals",
      "product-rule"
    ],
  },
  {
    id: "integration-by-substitution",
    title: "Integration by Substitution",
    summary: "Integrate composite functions using reverse chain rule.",
    specRef: "Integration",
    dependsOn: [
      "indefinite-integrals",
      "chain-rule"
    ],
  },
];
