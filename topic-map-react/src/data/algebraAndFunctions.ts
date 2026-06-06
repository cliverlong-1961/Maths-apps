import type { Topic } from "../types/Topic";

export const algebraAndFunctionsTopics: Topic[] = [
  {
    id: "indices",
    title: "Laws of Indices",
    summary:
      "Understand and use the laws of indices for all rational exponents: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ. The equivalence of aᵐ/ⁿ and ⁿ√(aᵐ) should be known.",
    specRef: "2.1",
    dependsOn: [],
  },

  {
    id: "surds",
    title: "Surds and Rationalisation",
    summary:
      "Use and manipulate surds, including rationalising the denominator. Simplify algebraic surds using (√x)² = x, √(xy) = √x·√y, and (√x + √y)(√x − √y) = x − y.",
    specRef: "2.2",
    dependsOn: ["indices"],
  },

  {
    id: "quadratics",
    title: "Quadratic Functions and Graphs",
    summary:
      "Work with quadratic functions and their graphs. Know and use the discriminant b² − 4ac to determine the nature of roots (real and distinct, repeated, or no real roots). Solve quadratic equations by factorisation, formula, completing the square, or calculator. Includes solving quadratics in a function of the unknown (e.g. trigonometric, exponential).",
    specRef: "2.3",
    dependsOn: ["indices"],
  },

  {
    id: "simultaneous-equations",
    title: "Simultaneous Equations",
    summary:
      "Solve simultaneous equations in two variables by elimination and substitution, including one linear and one quadratic equation. May involve powers of 2 in one or both unknowns, e.g. solve y = 2x + 3, y = x² − 4x + 8.",
    specRef: "2.4",
    dependsOn: ["quadratics"],
  },

  {
    id: "inequalities",
    title: "Linear and Quadratic Inequalities",
    summary:
      "Solve linear and quadratic inequalities in a single variable and interpret graphically. Includes inequalities with brackets and fractions. Express solutions using 'and'/'or' or set notation. Represent linear and quadratic inequalities graphically using dotted/solid line conventions.",
    specRef: "2.5",
    dependsOn: ["quadratics"],
  },

  {
    id: "polynomials",
    title: "Polynomials and Factor Theorem",
    summary:
      "Manipulate polynomials algebraically: expanding brackets, collecting like terms, factorisation, and algebraic division (by linear expressions only). Use the factor theorem: if f(b/a) = 0 then (ax − b) is a factor of f(x). Simplify rational expressions including by factorising and cancelling.",
    specRef: "2.6",
    dependsOn: ["quadratics"],
  },

  {
    id: "graphs-of-functions",
    title: "Graphs of Functions",
    summary:
      "Understand and use graphs of functions; sketch curves defined by simple equations including polynomials (cubics, quartics), the modulus of a linear function y = |ax + b|, and reciprocal functions y = a/x and y = a/x². Identify vertical and horizontal asymptotes. Interpret algebraic solutions graphically; use intersection points to solve equations. Understand proportional relationships and their graphs.",
    specRef: "2.7",
    dependsOn: ["polynomials"],
  },

  {
    id: "composite-inverse-functions",
    title: "Composite and Inverse Functions",
    summary:
      "Understand and use composite functions and inverse functions and their graphs. A function is a one-one or many-one mapping from ℝ (or a subset) to ℝ. Know that fg means 'do g first, then f'. Know that f⁻¹f(x) = ff⁻¹(x) = x, and that the graph of y = f⁻¹(x) is the reflection of y = f(x) in the line y = x.",
    specRef: "2.8",
    dependsOn: ["graphs-of-functions"],
  },

  {
    id: "transformations",
    title: "Graph Transformations",
    summary:
      "Understand the effect of simple transformations on y = f(x): y = af(x) (stretch in y), y = f(x) + a (translation in y), y = f(x + a) (translation in x), y = f(ax) (stretch in x), and combinations of these. Apply to quadratics, cubics, quartics, reciprocal, √x, sin x, cos x, tan x, eˣ and aˣ.",
    specRef: "2.9",
    dependsOn: ["graphs-of-functions"],
  },

  {
    id: "partial-fractions",
    title: "Partial Fractions",
    summary:
      "Decompose rational functions into partial fractions. Denominators no more complicated than squared linear terms, with no more than 3 terms; numerators constant or linear. Includes denominators such as (ax + b)(cx + d)(ex + f) and (ax + b)(cx + d)². Applications to integration, differentiation and series expansions.",
    specRef: "2.10",
    dependsOn: ["polynomials"],
  },

  {
    id: "functions-modelling",
    title: "Functions in Modelling",
    summary:
      "Use functions in modelling, including consideration of limitations and refinements of models. Examples include trigonometric functions for modelling tides and hours of sunlight, exponential functions for growth and decay, and reciprocal functions for inverse proportion relationships.",
    specRef: "2.11",
    dependsOn: ["composite-inverse-functions", "transformations", "partial-fractions"],
  },
];
