import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

// Greatest common divisor (for simplifying fractions)
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Render a fraction as a stacked HTML element
function Fraction({
  numerator,
  denominator,
  className = '',
}: {
  numerator: number;
  denominator: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
    >
      <span className="border-b-2 border-current px-1 leading-tight">
        {numerator}
      </span>
      <span className="px-1 leading-tight">{denominator}</span>
    </span>
  );
}

export default function Exp3() {
  // Base stored as numerator / denominator (both positive)
  const [num, setNum] = useState<number | null>(null);
  const [den, setDen] = useState<number | null>(null);
  // Negative integer exponent (stored as negative number, e.g. -2)
  const [exponent, setExponent] = useState<number | null>(null);
  // Result stored as resNum / resDen (simplified)
  const [resNum, setResNum] = useState<number | null>(null);
  const [resDen, setResDen] = useState<number | null>(null);

  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNewProblem = () => {
    // Positive proper fraction: numerator 1–4, denominator 2–5, num < den
    let newNum = Math.floor(Math.random() * 4) + 1; // 1–4
    let newDen = Math.floor(Math.random() * 4) + 2; // 2–5
    // Ensure it's a proper fraction and not equal to 1
    while (newNum >= newDen) {
      newNum = Math.floor(Math.random() * 4) + 1;
      newDen = Math.floor(Math.random() * 4) + 2;
    }
    // Simplify the base fraction
    const g = gcd(newNum, newDen);
    newNum = newNum / g;
    newDen = newDen / g;

    // Negative integer exponent: -2 to -4
    const absExp = Math.floor(Math.random() * 3) + 2; // 2–4
    const newExponent = -absExp;

    // (num/den)^(-absExp) = (den/num)^absExp
    const rawResNum = Math.pow(newDen, absExp);
    const rawResDen = Math.pow(newNum, absExp);
    const rg = gcd(rawResNum, rawResDen);

    setNum(newNum);
    setDen(newDen);
    setExponent(newExponent);
    setResNum(rawResNum / rg);
    setResDen(rawResDen / rg);
    setStep(0);
    setIsAnimating(true);
  };

  useEffect(() => {
    generateNewProblem();
  }, []);

  // 5 animation steps: 0 → 1 (show base^exp) → 2 (show flip rule) → 3 (show expansion) → 4 (show result)
  useEffect(() => {
    if (!isAnimating) return;
    if (step > 4) {
      setIsAnimating(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(timer);
  }, [step, isAnimating]);

  const absExp = exponent !== null ? Math.abs(exponent) : 0;

  // Render the expansion: (den/num) × (den/num) × ...
  const renderExpansion = () => {
    if (num === null || den === null) return null;
    const factors = Array(absExp).fill(null);
    return (
      <div className="flex flex-wrap justify-center items-center gap-2 text-xl sm:text-2xl">
        {factors.map((_, idx) => (
          <span key={idx} className="flex items-center gap-2">
            <span
              className={`transition-all duration-500 ${
                step > 3
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-700'
              }`}
            >
              <span className="inline-flex items-stretch">
                <span className="flex items-center text-gray-500" style={{ fontSize: '150%' }}>(</span>
                <Fraction numerator={den} denominator={num} />
                <span className="flex items-center text-gray-500" style={{ fontSize: '150%' }}>)</span>
              </span>
            </span>
            {idx < factors.length - 1 && (
              <span className="text-gray-400">×</span>
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Positive fractional base with negative integer exponent
          </h1>
          <p className="text-gray-600">
            A negative exponent means "flip the fraction"!
          </p>
        </div>

        {num !== null && den !== null && exponent !== null && (
          <div className="space-y-6">

            {/* Step 1 — Show (p/q)^(-n) */}
            <div
              className={`bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 text-center transition-all duration-500 ${
                step >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
            >
              <div className="text-gray-500 text-sm mb-3 uppercase tracking-wide">
                Fractional base, negative exponent
              </div>
              <div className="flex justify-center items-center text-5xl sm:text-6xl font-bold text-purple-600">
                <span className="inline-flex items-stretch">
                  <span className="flex items-center text-gray-500" style={{ fontSize: '150%' }}>(</span>
                  <Fraction numerator={num} denominator={den} className="text-4xl sm:text-5xl" />
                  <span className="flex items-center text-gray-500" style={{ fontSize: '150%' }}>)</span>
                </span>
                <sup className="text-2xl sm:text-3xl ml-1">{exponent}</sup>
              </div>
            </div>

            {/* Step 2 — Flip the fraction rule */}
            <div
              className={`bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center transition-all duration-500 ${
                step >= 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-amber-700 text-sm font-semibold mb-3 uppercase tracking-wide">
                Negative exponent → flip the fraction
              </div>
              <div className="flex justify-center items-start gap-3 text-2xl sm:text-3xl font-bold text-gray-700">
                <span className="inline-flex items-center">
                  <span className="inline-flex items-stretch">
                    <span className="flex items-center text-gray-500" style={{ fontSize: '150%' }}>(</span>
                    <Fraction numerator={num} denominator={den} className="text-xl sm:text-2xl" />
                    <span className="flex items-center text-gray-500" style={{ fontSize: '150%' }}>)</span>
                  </span>
                  <sup className="text-base ml-0.5">{exponent}</sup>
                </span>
                <span className="text-gray-400 self-center">=</span>
                <span className="inline-flex items-center">
                  <span className="inline-flex items-stretch">
                    <span className="flex items-center text-gray-500" style={{ fontSize: '150%' }}>(</span>
                    <Fraction numerator={den} denominator={num} className="text-xl sm:text-2xl text-blue-600" />
                    <span className="flex items-center text-gray-500" style={{ fontSize: '150%' }}>)</span>
                  </span>
                  <sup className="text-base ml-0.5 text-blue-600">{absExp}</sup>
                </span>
              </div>
            </div>

            {/* Step 3 — Expansion */}
            <div
              className={`bg-gray-50 rounded-2xl p-5 min-h-[80px] flex items-center justify-center transition-all duration-500 ${
                step >= 3 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {renderExpansion()}
            </div>

            {/* Step 4 — Result */}
            <div
              className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center transition-all duration-700 ${
                step >= 4 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
            >
              <div className="text-gray-600 text-lg mb-3">Answer:</div>
              <div className="flex justify-center items-center text-5xl sm:text-6xl font-bold text-green-600">
                {resDen === 1 ? (
                  <span>{resNum}</span>
                ) : (
                  <Fraction
                    numerator={resNum!}
                    denominator={resDen!}
                    className="text-4xl sm:text-5xl"
                  />
                )}
              </div>
              <div className="text-sm text-gray-500 mt-3">
                Result is always positive (positive base)
              </div>
            </div>

          </div>
        )}

        <button
          onClick={generateNewProblem}
          disabled={isAnimating}
          className="mt-8 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <RefreshCw
            className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`}
          />
          {isAnimating ? 'Animating...' : 'New Problem'}
        </button>
      </div>
    </div>
  );
}
