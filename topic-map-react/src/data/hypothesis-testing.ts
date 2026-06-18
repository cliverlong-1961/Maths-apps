import type { Topic } from "../types/Topic";

export const hypothesisTestingTopics: Topic[] = [

  // ── Prerequisites ────────────────────────────────────────────────────────

  {
    id: "binomial-distribution",
    title: "Binomial Distribution",
    summary: "Use the binomial distribution B(n, p) as a model for discrete data; calculate individual and cumulative probabilities using a calculator; understand the notation X ~ B(n, p).",
    specRef: "4.1",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-intro.html#",
    dependsOn: [],
  },

  {
    id: "normal-distribution",
    title: "Normal Distribution",
    summary: "Use the Normal distribution N(μ, σ²) as a model; find probabilities using a calculator; understand the shape, symmetry and points of inflection of the Normal curve.",
    specRef: "4.2",
    dependsOn: [],
  },

  {
    id: "pmcc",
    title: "Product Moment Correlation Coefficient",
    summary: "Calculate the PMCC r using a calculator; know that −1 ≤ r ≤ 1 and that r = ±1 means all data points lie on a straight line; interpret r informally.",
    specRef: "2.2",
    dependsOn: [],
  },

  // ── Core language and concepts ───────────────────────────────────────────

  {
    id: "ht-language",
    title: "Language of Hypothesis Testing",
    summary: "Understand and use: null hypothesis H₀, alternative hypothesis H₁, significance level α, test statistic, 1-tail test, 2-tail test, critical value, critical region, acceptance region, p-value.",
    specRef: "5.1",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-intro.html#mod1",
    dependsOn: ["binomial-distribution"],
  },

  {
    id: "significance-levels",
    title: "Significance Levels",
    summary: "Understand that the significance level α is the probability of incorrectly rejecting a true null hypothesis (Type I error probability); common levels are 10%, 5%, 2.5% and 1%.",
    specRef: "5.1",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-intro.html#mod2",
    dependsOn: ["ht-language"],
  },

  {
    id: "one-tailed-tests",
    title: "One-Tailed Tests",
    summary: "Carry out a one-tailed hypothesis test; state H₀ and a directional H₁ (p < k or p > k); identify the critical region in one tail; interpret the result in context.",
    specRef: "5.1",
    url: "https://maths-apps.crlong.uk/Stats/hypothesis-testing-intro.html#mod3",
    dependsOn: ["significance-levels"],
  },

  {
    id: "two-tailed-tests",
    title: "Two-Tailed Tests",
    summary: "Carry out a two-tailed hypothesis test with H₁: p ≠ p₀; split α between both tails; use the informal appreciation that the expected value of a binomial distribution is np when determining the relevant tail.",
    specRef: "5.1",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-intro.html#mod4",
    dependsOn: ["significance-levels"],
  },

  {
    id: "critical-regions",
    title: "Critical Regions",
    summary: "Find the critical region for a test: the set of values of the test statistic that would lead to rejection of H₀; identify the actual significance level as the probability of the test statistic falling in the critical region.",
    specRef: "5.1",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-intro.html#mod5",
    dependsOn: ["one-tailed-tests", "two-tailed-tests"],
  },

  // ── Binomial hypothesis test ─────────────────────────────────────────────

  {
    id: "ht-binomial",
    title: "Hypothesis Test for a Proportion (Binomial)",
    summary: "Conduct a full hypothesis test for a population proportion p using the binomial model B(n, p₀); state hypotheses in terms of p; calculate the p-value or compare the test statistic with the critical region; interpret the result in context, understanding that a sample is used to make an inference about the population.",
    specRef: "5.2",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-applic.html",
    dependsOn: ["critical-regions", "binomial-distribution"],
  },

  {
    id: "ht-binomial-lower",
    title: "Lower-Tail Binomial Test",
    summary: "Apply the binomial test with H₁: p < p₀; compute P(X ≤ x_obs) under H₀ and compare with α; identify the correct inequality direction for the critical region.",
    specRef: "5.2",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/binomial-hypothesis-tail.html#lower",
    dependsOn: ["ht-binomial"],
  },

  {
    id: "ht-binomial-upper",
    title: "Upper-Tail Binomial Test",
    summary: "Apply the binomial test with H₁: p > p₀; compute P(X ≥ x_obs) = 1 − P(X ≤ x_obs − 1) under H₀ and compare with α; identify the critical region in the upper tail.",
    specRef: "5.2",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/binomial-hypothesis-tail.html#upper",
    dependsOn: ["ht-binomial"],
  },

  // ── Correlation test ─────────────────────────────────────────────────────

  {
    id: "ht-correlation",
    title: "Hypothesis Test for a Correlation Coefficient (PMCC)",
    summary: "Interpret a given sample PMCC r using a provided p-value or critical value table; state hypotheses in terms of the population correlation coefficient ρ, with H₀: ρ = 0; carry out 1-tail and 2-tail tests; conclude in context. Calculation of critical values is not required.",
    specRef: "5.1",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-applic.html#mod12",
    dependsOn: ["ht-language", "pmcc"],
  },

  // ── Normal mean test ─────────────────────────────────────────────────────

  {
    id: "sampling-distribution",
    title: "Sampling Distribution of the Mean",
    summary: "Know that if X ~ N(μ, σ²) then the sample mean X̄ ~ N(μ, σ²/n); use the standardised test statistic Z = (X̄ − μ₀)/(σ/√n) ~ N(0, 1) under H₀. No proof required; knowledge of the Central Limit Theorem is not required.",
    specRef: "5.3",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-applic.html#mod13",
    dependsOn: ["normal-distribution"],
  },

  {
    id: "ht-normal-mean",
    title: "Hypothesis Test for a Normal Mean",
    summary: "Conduct a hypothesis test for the mean μ of a Normal distribution with known, given or assumed variance σ²; state hypotheses in terms of μ; compute the test statistic Z and compare with a critical value or use a p-value; interpret the result in context.",
    specRef: "5.3",
    url: "https://maths-apps.crlong.uk/Stats/Hypoth-test/hypothesis-testing-applic.html#mod13",
    dependsOn: ["sampling-distribution", "critical-regions"],
  },

];
