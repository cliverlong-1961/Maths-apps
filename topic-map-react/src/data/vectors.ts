import type { Topic } from "../types/Topic";

export const vectorsTopics: Topic[] = [
  {
    id: "scalars-vs-vectors",
    title: "Scalars and Vectors",
    summary: "Distinguish between scalar quantities (magnitude only) and vector quantities (magnitude and direction).",
    specRef: "Prior knowledge",
    url: "https://maths-apps.crlong.uk/Pure/Vectors/vectors_app.html",
    dependsOn: [],
  },

  {
    id: "vector-notation",
    title: "Vector Notation",
    summary: "Write vectors as column vectors or using i, j, k unit vectors in 2D and 3D; use bold or underline notation.",
    url: "https://maths-apps.crlong.uk/Pure/Vectors/vectors_app.html#components",
    specRef: "10.1",
    dependsOn: ["scalars-vs-vectors"],
  },

  {
    id: "vector-arithmetic",
    title: "Vector Addition & Scalar Multiplication",
    summary: "Add vectors diagrammatically using the triangle and parallelogram laws; multiply a vector by a scalar; identify parallel vectors.",
    specRef: "10.3",
    url: "https://maths-apps.crlong.uk/Pure/Vectors/vectors_app.html#operations",
    dependsOn: ["vector-notation"],
  },

  {
    id: "magnitude-direction",
    title: "Magnitude & Direction",
    summary: "Calculate the magnitude |a| of a vector in 2D and 3D; find a unit vector in the direction of a; convert between component form and magnitude/direction form.",
    specRef: "10.2",
    dependsOn: ["vector-notation"],
  },

  {
    id: "position-vectors",
    title: "Position Vectors",
    summary: "Use position vectors OA = a and OB = b; find AB = b − a; calculate the distance between two points in 2D and 3D using d² = (x₁−x₂)² + (y₁−y₂)² + (z₁−z₂)².",
    specRef: "10.4",
    url: "https://maths-apps.crlong.uk/Pure/Vectors/vectors_app.html#position",
    dependsOn: ["vector-arithmetic", "magnitude-direction"],
  },

  {
    id: "vector-problems",
    title: "Solving Problems with Vectors",
    summary: "Apply vectors to pure maths problems (e.g. finding the fourth corner of a parallelogram) and real-world contexts including forces, velocity, displacement and kinematics.",
    specRef: "10.5",
    url: "https://maths-apps.crlong.uk/Pure/Vectors/vectors_app.html#geometry",
    dependsOn: ["position-vectors"],
  },
];
