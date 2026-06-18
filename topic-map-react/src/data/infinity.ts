import type { Topic } from "../types/Topic";

const BASE = "https://maths-apps.crlong.uk/Pure/Infinity/infinity-explorer.html";

export const infinityTopics: Topic[] = [
  // ── Intro ──────────────────────────────────────────────────────────────────
  {
    id: "inspirations",
    title: "Inspirations & Recommendations",
    summary: "Recommended reading and motivation for studying infinity: Infinite Powers (Strogatz) and A Very Short Introduction to Mathematics (Gowers).",
    url: `${BASE}#mod0`,
    dependsOn: [],
  },

  // ── Foundations ────────────────────────────────────────────────────────────
  {
    id: "number-line",
    title: "The Endless Number Line",
    summary: "Integers never end. Infinity is not a number — it describes an unending process. Drag the number line and watch counting continue forever.",
    url: `${BASE}#mod1`,
    dependsOn: [],
  },
  {
    id: "basic-numbers",
    title: "Basic Numbers & Calculating with Infinity",
    summary: "Integers, fractions, and irrationals. Why ∞ × 0 is indeterminate — the same naive calculation gives contradictory results.",
    url: `${BASE}#mod19`,
    dependsOn: ["number-line"],
  },
  {
    id: "early-encounters",
    title: "Early Encounters with Infinity",
    summary: "Four famous early encounters: triangular numbers (diverge), geometric sum (converges to 2), harmonic series (diverges slowly), and the circle area argument giving πr².",
    url: `${BASE}#mod18`,
    dependsOn: ["number-line", "basic-numbers"],
  },

  // ── Core Concepts ──────────────────────────────────────────────────────────
  {
    id: "approaching-zero",
    title: "Approaching Zero",
    summary: "Sequences 1/n, 1/n², and rⁿ all approach zero but at very different speeds. The speed of decay determines whether the corresponding series converges.",
    url: `${BASE}#mod2`,
    dependsOn: ["number-line", "basic-numbers"],
  },
  {
    id: "more-sequences",
    title: "More Sequences",
    summary: "Arithmetic, geometric, oscillating, and sin(n)/n sequences. A sequence converges if its terms settle to a finite limit; otherwise it diverges.",
    url: `${BASE}#mod5`,
    dependsOn: ["approaching-zero"],
  },
  {
    id: "infinite-series",
    title: "Infinite Series",
    summary: "An infinite series is defined via partial sums. Geometric series converge for |r| < 1; the harmonic series diverges despite terms → 0; the alternating harmonic series converges to ln 2.",
    url: `${BASE}#mod6`,
    dependsOn: ["more-sequences", "early-encounters"],
  },
  {
    id: "what-is-a-limit",
    title: "What is a Limit?",
    summary: "The formal ε–N definition: lim aₙ = L iff for every ε > 0 there exists N such that n > N implies |aₙ − L| < ε. Interactive visualisation with adjustable tolerance band.",
    url: `${BASE}#mod4`,
    dependsOn: ["approaching-zero", "more-sequences"],
  },
  {
    id: "zero-over-zero",
    title: "The 0/0 Problem",
    summary: "0/0 is indeterminate. The limit of a ratio g(x)/h(x) as both → 0 depends entirely on how fast each approaches zero. Explores sin x/x, (x²−1)/(x−1), x/x², and (1−cos h)/h.",
    url: `${BASE}#mod3`,
    dependsOn: ["what-is-a-limit"],
  },

  // ── Formal Machinery ───────────────────────────────────────────────────────
  {
    id: "why-convergence",
    title: "Why Convergence Matters",
    summary: "Convergent series underpin calculus and modern mathematics. Taylor/Maclaurin series for eˣ, sin x, cos x, ln(1+x). The Basel problem: Σ1/n² = π²/6.",
    url: `${BASE}#mod7`,
    dependsOn: ["infinite-series", "what-is-a-limit"],
  },
  {
    id: "sequence-convergence-tests",
    title: "Sequence Convergence Tests",
    summary: "Direct evaluation, Monotone Convergence Theorem, Squeeze theorem, Cauchy criterion, ratio behaviour, and subsequences. Bolzano–Weierstrass theorem.",
    url: `${BASE}#mod20`,
    dependsOn: ["what-is-a-limit", "more-sequences"],
  },
  {
    id: "series-convergence-tests",
    title: "Series Convergence Tests",
    summary: "A toolkit: Divergence test, Ratio test, Comparison test, Alternating Series test, p-Series test. Knowing which test to apply and when each is inconclusive.",
    url: `${BASE}#mod8`,
    dependsOn: ["why-convergence", "sequence-convergence-tests"],
  },
  {
    id: "telescoping",
    title: "Telescoping Series",
    summary: "Series where consecutive terms cancel, leaving only a few surviving terms. Step-through visualisation shows the cancellation pattern and the finite sum.",
    url: `${BASE}#mod17`,
    dependsOn: ["series-convergence-tests"],
  },
  {
    id: "limits-of-functions",
    title: "Limits Applied to Functions",
    summary: "Extending the limit concept from sequences to continuous functions. One-sided limits, limits at infinity, and continuity — the bridge to differential calculus.",
    url: `${BASE}#mod21`,
    dependsOn: ["what-is-a-limit", "zero-over-zero"],
  },

  // ── Applications ───────────────────────────────────────────────────────────
  {
    id: "bouncing-ball",
    title: "Bouncing Ball",
    summary: "A ball bouncing to a fixed fraction of its previous height: total distance is a convergent geometric series. A concrete physical model of infinite sums.",
    url: `${BASE}#mod9`,
    dependsOn: ["series-convergence-tests"],
  },
  {
    id: "koch-snowflake",
    title: "Koch Snowflake",
    summary: "A fractal with finite area but infinite perimeter. Each iteration multiplies the number of sides by 4 and reduces each side by 1/3 — a geometric series in disguise.",
    url: `${BASE}#mod10`,
    dependsOn: ["series-convergence-tests"],
  },
  {
    id: "density-of-fractions",
    title: "Density of Fractions",
    summary: "Between any two real numbers there are infinitely many rationals — and infinitely many irrationals. The rationals are countably infinite; the reals are not.",
    url: `${BASE}#mod11`,
    dependsOn: ["series-convergence-tests"],
  },
  {
    id: "calculator-approximation",
    title: "Calculator Approximation",
    summary: "How calculators evaluate sin, cos, and eˣ using finite partial sums of their Taylor series. Live demonstration of accuracy vs number of terms.",
    url: `${BASE}#mod12`,
    dependsOn: ["why-convergence"],
  },

  // ── Big Ideas ──────────────────────────────────────────────────────────────
  {
    id: "cantors-infinities",
    title: "Cantor's Infinities",
    summary: "Not all infinities are equal. Countable infinity (ℵ₀) vs uncountable infinity. Cantor's diagonal argument proves the reals are strictly larger than the integers.",
    url: `${BASE}#mod22`,
    dependsOn: ["density-of-fractions"],
  },
  {
    id: "paradoxes",
    title: "Paradoxes of Infinity",
    summary: "Zeno's paradoxes, Hilbert's Hotel, and other counterintuitive results that arise when infinity is treated naively — and how rigorous limits resolve them.",
    url: `${BASE}#mod13`,
    dependsOn: ["why-convergence"],
  },
  {
    id: "fibonacci",
    title: "Fibonacci & the Golden Ratio",
    summary: "The Fibonacci sequence and its connection to the golden ratio φ. The ratio of consecutive terms converges to φ = (1+√5)/2 — a limit hiding in a simple recurrence.",
    url: `${BASE}#mod15`,
    dependsOn: ["sequence-convergence-tests"],
  },
  {
    id: "pi-from-series",
    title: "π from Series",
    summary: "Leibniz formula π/4 = 1 − 1/3 + 1/5 − … and other series representations of π. Interactive demonstration of convergence speed and accuracy.",
    url: `${BASE}#mod16`,
    dependsOn: ["series-convergence-tests"],
  },

  // ── Summary ────────────────────────────────────────────────────────────────
  {
    id: "infinity-summary",
    title: "Summary",
    summary: "A consolidated overview of all key ideas: the infinite, limits, convergence tests, applications, and the different sizes of infinity.",
    url: `${BASE}#mod14`,
    dependsOn: [
      "bouncing-ball",
      "koch-snowflake",
      "density-of-fractions",
      "calculator-approximation",
      "cantors-infinities",
      "paradoxes",
      "fibonacci",
      "pi-from-series",
      "telescoping",
      "limits-of-functions",
    ],
  },
];
