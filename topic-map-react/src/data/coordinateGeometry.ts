import type { Topic } from "../types/Topic";

export const coordinateGeometryTopics: Topic[] = [
  {
    id: "straight-lines",
    title: "Straight Lines",
    summary:
      "Equation of a straight line in the forms y − y₁ = m(x − x₁) and ax + by + c = 0; equation through two points.",
    specRef: "3.1",
    dependsOn: [],
  },
  {
    id: "parallel-perpendicular",
    title: "Parallel & Perpendicular Lines",
    summary:
      "Gradient conditions: m′ = m for parallel lines; m′ = −1/m for perpendicular lines.",
    specRef: "3.1",
    dependsOn: ["straight-lines"],
  },
  {
    id: "straight-line-models",
    title: "Straight Line Models",
    summary:
      "Use straight-line models in a variety of contexts, e.g. temperature conversion, distance–time graphs.",
    specRef: "3.1",
    dependsOn: ["parallel-perpendicular"],
  },
  {
    id: "circle-equation",
    title: "Circle Equation",
    summary:
      "Equation of a circle: (x − a)² + (y − b)² = r²; also x² + y² + 2fx + 2gy + c = 0. Use completing the square to find centre and radius.",
    specRef: "3.2",
    dependsOn: ["straight-lines"],
  },
  {
    id: "circle-properties",
    title: "Circle Properties",
    summary:
      "Angle in a semicircle is 90°; perpendicular from centre bisects chord; radius ⊥ tangent at point of contact. Find equations of tangents and circumcircles.",
    specRef: "3.2",
    dependsOn: ["circle-equation", "parallel-perpendicular"],
  },
  {
    id: "parametric-equations",
    title: "Parametric Equations",
    summary:
      "Understand and use parametric equations of curves; convert between Cartesian and parametric forms.",
    specRef: "3.3",
    dependsOn: ["straight-lines", "circle-equation"],
  },
  {
    id: "parametric-modelling",
    title: "Parametric Modelling",
    summary:
      "Use parametric equations in modelling contexts, e.g. motion with constant velocity; link to kinematics.",
    specRef: "3.4",
    dependsOn: ["parametric-equations"],
  },
];
