import type { Topic } from "../types/Topic";

export const proofTopics: Topic[] = [
  {
    id: "proof-by-deduction",
    title: "Direct Proof",
    summary:
      "Proceed from given assumptions through a series of logical steps to a conclusion. e.g. use completing the square to prove n² − 6n + 10 is positive for all n; differentiation from first principles for small positive integer powers of x; proving results for arithmetic and geometric series. This is the most commonly used method of proof throughout the specification.",
    specRef: "1.1",
    url: "https://maths-apps.crlong.uk/Pure/Proof/Proof.html",
    dependsOn: [],
  },
  {
    id: "proof-by-exhaustion",
    title: "Proof by Cases",
    summary:
      "Check every possible case to establish a result. e.g. given that p is a prime number such that 3 < p < 25, prove by exhaustion that (p − 1)(p + 1) is a multiple of 12.",
    specRef: "1.1",
    dependsOn: ["proof-by-deduction"],
  },
  {
    id: "disproof-by-counter-example",
    title: "Disproof by Counter Example",
    summary:
      "Show that a mathematical statement is false by finding a single counter example. e.g. show that the statement \"n² − n + 1 is a prime number for all values of n\" is untrue.",
    specRef: "1.1",
    dependsOn: ["proof-by-deduction"],
  },
  {
    id: "proof-by-contradiction",
    title: "Proof by Contradiction",
    summary:
      "Assume the negation of the statement and derive a logical contradiction. Includes proof of the irrationality of √2 and the infinity of primes, and application to unfamiliar proofs.",
    specRef: "1.1",
    url: "https://maths-apps.crlong.uk/Pure/Proof/Proof.html",
    dependsOn: ["proof-by-deduction"],
  },
];
