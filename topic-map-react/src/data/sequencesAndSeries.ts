import type { Topic } from "../types/Topic";

export const sequencesAndSeriesTopics: Topic[] = [
  {
    id: "algebraic-notation",
    title: "Algebraic Notation",
    summary: "Understand and use algebraic expressions, substitution and function notation.",
    specRef: "Prior knowledge",
    dependsOn: [],
  },

  {
    id: "index-laws",
    title: "Index Laws",
    summary: "Apply the laws of indices to simplify expressions including fractional and negative powers.",
    specRef: "Prior knowledge",
    dependsOn: [],
  },

  {
    id: "nth-term",
    title: "Sequences – nth Term Formula",
    summary: "Generate and describe sequences using a formula for the nth term.",
    specRef: "4.2",
    dependsOn: ["algebraic-notation"],
  },

  {
    id: "recurrence-relations",
    title: "Recurrence Relations",
    summary: "Define sequences using xₙ₊₁ = f(xₙ); generate terms from a recurrence relation.",
    specRef: "4.2",
    dependsOn: ["nth-term"],
  },

  {
    id: "sequence-types",
    title: "Increasing, Decreasing & Periodic Sequences",
    summary: "Identify and classify sequences as increasing, decreasing or periodic.",
    specRef: "4.2",
    dependsOn: ["nth-term"],
  },

  {
    id: "sigma-notation",
    title: "Sigma Notation",
    summary: "Use Σ notation to represent sums of series; know that Σ1 (r=1 to n) = n.",
    specRef: "4.3",
    dependsOn: ["nth-term"],
  },

  {
    id: "arithmetic-sequences",
    title: "Arithmetic Sequences",
    summary: "Find the nth term of an arithmetic sequence: uₙ = a + (n−1)d.",
    specRef: "4.4",
    dependsOn: ["nth-term"],
  },

  {
    id: "arithmetic-series",
    title: "Arithmetic Series",
    summary: "Find the sum of an arithmetic series: Sₙ = n/2(2a + (n−1)d) = n/2(a + l).",
    specRef: "4.4",
    dependsOn: ["arithmetic-sequences", "sigma-notation"],
  },

  {
    id: "geometric-sequences",
    title: "Geometric Sequences",
    summary: "Find the nth term of a geometric sequence: uₙ = arⁿ⁻¹.",
    specRef: "4.5",
    dependsOn: ["nth-term", "index-laws"],
  },

  {
    id: "geometric-series",
    title: "Geometric Series",
    summary: "Find the sum of a finite geometric series: Sₙ = a(1 − rⁿ)/(1 − r).",
    specRef: "4.5",
    dependsOn: ["geometric-sequences", "sigma-notation"],
  },

  {
    id: "sum-to-infinity",
    title: "Sum to Infinity",
    summary: "Find the sum to infinity of a convergent geometric series: S∞ = a/(1 − r), valid for |r| < 1.",
    specRef: "4.5",
    dependsOn: ["geometric-series"],
  },

  {
    id: "binomial-expansion-integer",
    title: "Binomial Expansion (Positive Integer n)",
    summary: "Expand (a + bx)ⁿ for positive integer n using Pascal's triangle or ⁿCᵣ notation; link to binomial probabilities.",
    specRef: "4.1",
    dependsOn: ["index-laws", "algebraic-notation"],
  },

  {
    id: "binomial-expansion-rational",
    title: "Binomial Expansion (Rational n)",
    summary: "Extend the binomial expansion to any rational n; use for approximations; valid for |bx| < 1.",
    specRef: "4.1",
    dependsOn: ["binomial-expansion-integer"],
  },

  {
    id: "modelling-sequences",
    title: "Modelling with Sequences & Series",
    summary: "Apply arithmetic and geometric sequences and series to real-world modelling problems.",
    specRef: "4.6",
    dependsOn: ["arithmetic-series", "geometric-series", "sum-to-infinity"],
  },
];
