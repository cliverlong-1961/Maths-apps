import type { Topic } from "../types/Topic";

export const integrationTopics: Topic[] = [
  // ── Prerequisites ─────────────────────────────────────────────────────────

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

  // ── Core integration ──────────────────────────────────────────────────────

  {
    id: "antiderivative",
    title: "Integration as Anti-Differentiation",
    summary: "Integration reverses differentiation.",
    specRef: "Integration",
    dependsOn: ["functions", "differentiation"],
  },

  {
    id: "power-rule-integration",
    title: "Power Rule for Integration",
    summary: "Integrate xⁿ using ∫xⁿdx = xⁿ⁺¹/(n+1) + c.",
    specRef: "Integration",
    dependsOn: ["antiderivative"],
  },

  {
    id: "indefinite-integrals",
    title: "Indefinite Integrals",
    summary: "Find families of functions using integration.",
    specRef: "Integration",
    dependsOn: ["power-rule-integration"],
  },

  {
    id: "definite-integrals",
    title: "Definite Integrals",
    summary: "Evaluate an integral between two limits.",
    specRef: "Integration",
    dependsOn: ["indefinite-integrals"],
  },

  {
    id: "fundamental-theorem",
    title: "Fundamental Theorem of Calculus",
    summary: "Connects differentiation and definite integration.",
    specRef: "Integration",
    dependsOn: ["differentiation", "definite-integrals"],
  },

  {
    id: "area-under-curve",
    title: "Area Under a Curve",
    summary: "Use definite integrals to calculate areas.",
    specRef: "Integration",
    dependsOn: ["definite-integrals", "fundamental-theorem"],
  },

  // ── Standard techniques ───────────────────────────────────────────────────

  {
    id: "reverse-chain-rule",
    title: "Reverse Chain Rule (ln form)",
    summary: "Integrate f′(x)/f(x) to get ln|f(x)| + c.",
    specRef: "Integration",
    dependsOn: ["indefinite-integrals"],
  },

  {
    id: "integration-by-parts",
    title: "Integration by Parts",
    summary: "Integrate products of functions using ∫u dv = uv − ∫v du.",
    specRef: "Integration",
    dependsOn: ["indefinite-integrals"],
  },

  {
    id: "integration-by-substitution",
    title: "Integration by Substitution",
    summary: "Integrate composite functions using reverse chain rule.",
    specRef: "Integration",
    dependsOn: ["indefinite-integrals"],
  },

  {
    id: "partial-fractions-integration",
    title: "Integration by Partial Fractions",
    summary:
      "Decompose rational (and some trig) fractions into simpler parts before integrating.",
    specRef: "Integration",
    dependsOn: ["reverse-chain-rule", "indefinite-integrals"],
  },

  // ── Trigonometric identities (prerequisite for trig integration) ──────────

  {
    id: "trig-identities-integration",
    title: "Trig Identities for Integration",
    summary:
      "Addition formulae, double-angle results, and Pythagorean identities " +
      "(sin²+cos²≡1, tan²+1≡sec², 1+cot²≡cosec²) used to rewrite integrands.",
    specRef: "Integration",
    dependsOn: ["indefinite-integrals"],
  },

  // ── Standard trig integrals ───────────────────────────────────────────────

  {
    id: "standard-trig-integrals",
    title: "Standard Trig Integrals",
    summary:
      "Memorised and formula-sheet results: ∫sin x, ∫cos x, ∫tan x, " +
      "∫sec²x, ∫cosec²x, ∫sec x tan x, ∫cosec x cot x.",
    specRef: "Integration",
    dependsOn: ["antiderivative", "trig-identities-integration"],
  },

  // ── Trig integrals with transformed arguments ─────────────────────────────

  {
    id: "trig-multiple-angles",
    title: "Trig with Multiple / Linear Arguments",
    summary:
      "Integrate sin(ax+b), cos(ax+b), etc. using ∫f(ax+b)dx = (1/a)F(ax+b) + c.",
    specRef: "Integration",
    dependsOn: ["standard-trig-integrals"],
  },

  // ── Product forms requiring product-to-sum identities ────────────────────

  {
    id: "trig-product-sin-cos",
    title: "Integrals of sin Ax cos Bx",
    summary:
      "Use product-to-sum identities to convert ∫sin Ax cos Bx dx into " +
      "a sum of single-angle integrals.",
    specRef: "Integration",
    dependsOn: ["trig-identities-integration", "trig-multiple-angles"],
  },

  {
    id: "trig-product-sin-sin",
    title: "Integrals of sin Ax sin Bx",
    summary:
      "Use cos(A−B) − cos(A+B) identity to integrate products of two sines.",
    specRef: "Integration",
    dependsOn: ["trig-identities-integration", "trig-multiple-angles"],
  },

  {
    id: "trig-product-cos-cos",
    title: "Integrals of cos Ax cos Bx",
    summary:
      "Use cos(A−B) + cos(A+B) identity to integrate products of two cosines.",
    specRef: "Integration",
    dependsOn: ["trig-identities-integration", "trig-multiple-angles"],
  },

  // ── Powers of trig functions ──────────────────────────────────────────────

  {
    id: "trig-squares",
    title: "Squares of Trig Functions",
    summary:
      "Integrate sin²x, cos²x, tan²x using double-angle and Pythagorean " +
      "identities to reduce the power before integrating.",
    specRef: "Integration",
    dependsOn: [
      "trig-identities-integration",
      "trig-product-sin-sin",
      "trig-product-cos-cos",
    ],
  },

  {
    id: "trig-cubes",
    title: "Cubes of Trig Functions",
    summary:
      "Integrate sin³x and cos³x by splitting off one factor and using " +
      "sin²+cos²≡1 to reduce to a substitutable form.",
    specRef: "Integration",
    dependsOn: ["trig-squares", "integration-by-substitution"],
  },

  {
    id: "trig-power-times-derivative",
    title: "∫sinⁿx cos x dx and ∫cosⁿx sin x dx",
    summary:
      "Recognise the reverse-chain-rule pattern ∫[f(x)]ⁿ f′(x) dx = [f(x)]ⁿ⁺¹/(n+1) + c " +
      "applied to trig functions.",
    specRef: "Integration",
    dependsOn: ["trig-squares", "integration-by-substitution"],
  },

  // ── Combined techniques ───────────────────────────────────────────────────

  {
    id: "trig-substitution-and-parts",
    title: "Combined Substitution and Parts (Trig)",
    summary:
      "Solve integrals that require both substitution and integration by parts, " +
      "such as ∫x sin x dx or ∫eˣ cos x dx.",
    specRef: "Integration",
    dependsOn: ["integration-by-parts", "integration-by-substitution"],
  },
];
