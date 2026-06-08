import type { Topic } from "../types/Topic";

export const trigonometryTopics: Topic[] = [
  {
    id: "right-triangle-trig",
    title: "Right-Triangle Trigonometry",
    summary: "SOH-CAH-TOA: sin, cos and tan in right-angled triangles.",
    specRef: "Prior knowledge",
    dependsOn: [],
  },

  {
    id: "pythagoras",
    title: "Pythagoras' Theorem",
    summary: "Relationship between sides of a right-angled triangle.",
    specRef: "Prior knowledge",
    dependsOn: [],
  },

  {
    id: "radians",
    title: "Radians",
    summary: "Convert between degrees and radians; arc length and sector area.",
    specRef: "Trigonometry",
    dependsOn: ["right-triangle-trig"],
  },

  {
    id: "exact-values",
    title: "Exact Trigonometric Values",
    summary: "Know exact values for sin, cos and tan at 0°, 30°, 45°, 60°, 90°.",
    specRef: "Trigonometry",
    dependsOn: ["right-triangle-trig", "pythagoras"],
  },

  {
    id: "unit-circle",
    title: "The Unit Circle",
    summary: "Define sin and cos for all angles using the unit circle.",
    specRef: "Trigonometry",
    dependsOn: ["radians", "exact-values"],
  },

  {
    id: "trig-graphs",
    title: "Graphs of Trigonometric Functions",
    summary: "Sketch and interpret graphs of sin x, cos x and tan x.",
    specRef: "Trigonometry",
    dependsOn: ["unit-circle"],
  },

  {
    id: "trig-transformations",
    title: "Transformations of Trig Graphs",
    summary: "Apply translations, stretches and reflections to trig graphs.",
    specRef: "Trigonometry",
    dependsOn: ["trig-graphs"],
  },

  {
    id: "pythagorean-identity",
    title: "Pythagorean Identity",
    summary: "Use sin²θ + cos²θ = 1 and derived identities.",
    specRef: "Trigonometry",
    dependsOn: ["unit-circle", "pythagoras"],
  },

  {
    id: "tan-identity",
    title: "tan θ Identity",
    summary: "Use tan θ = sin θ / cos θ to simplify expressions.",
    specRef: "Trigonometry",
    dependsOn: ["pythagorean-identity"],
  },

  {
    id: "trig-equations",
    title: "Solving Trigonometric Equations",
    summary: "Solve equations in a given interval using identities and the unit circle.",
    specRef: "Trigonometry",
    dependsOn: ["trig-graphs", "pythagorean-identity", "tan-identity"],
  },

  {
    id: "sine-rule",
    title: "Sine Rule",
    summary: "Apply a/sin A = b/sin B = c/sin C to non-right triangles.",
    specRef: "Trigonometry",
    dependsOn: ["right-triangle-trig", "exact-values"],
  },

  {
    id: "cosine-rule",
    title: "Cosine Rule",
    summary: "Apply a² = b² + c² − 2bc cos A to non-right triangles.",
    specRef: "Trigonometry",
    dependsOn: ["right-triangle-trig", "pythagoras"],
  },

  {
    id: "area-triangle",
    title: "Area of a Triangle",
    summary: "Calculate area using ½ab sin C.",
    specRef: "Trigonometry",
    dependsOn: ["sine-rule", "cosine-rule"],
  },

  {
    id: "trig-identities",
    title: "Trigonometric Identities (sin, cos, tan)",
    summary: "Addition formulae and double-angle identities for sin, cos and tan.",
    specRef: "Trigonometry",
    dependsOn: ["pythagorean-identity", "tan-identity", "unit-circle"],
  },

  {
    id: "reciprocal-trig",
    title: "Reciprocal Trigonometric Functions",
    summary: "Define and use sec θ = 1/cos θ, cosec θ = 1/sin θ, cot θ = 1/tan θ.",
    specRef: "Trigonometry",
    dependsOn: ["trig-graphs", "pythagorean-identity"],
  },

  {
    id: "reciprocal-identities",
    title: "Identities for sec, cosec and cot",
    summary: "Use 1 + tan²θ = sec²θ and 1 + cot²θ = cosec²θ and related identities.",
    specRef: "Trigonometry",
    dependsOn: ["trig-identities", "reciprocal-trig"],
  },
];
