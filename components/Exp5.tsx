import { useState, useEffect } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';

export default function Exp5() {
  const [base, setBase] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [rootIndex, setRootIndex] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  const generateNewProblem = () => {
    const newBase = Math.floor(Math.random() * 5) + 2;
    const newRootIndex = Math.floor(Math.random() * 4) + 2;
    const newResult = Math.pow(newBase, 1 / newRootIndex);

    setBase(newBase);
    setRootIndex(newRootIndex);
    setResult(newResult);
    setStep(0);
    setIsAnimating(true);
  };

  const isPerfectRoot = (base: number, root: number) => {
    const value = Math.pow(base, 1 / root);
    return Math.abs(value - Math.round(value)) < 0.0001;
  };

  useEffect(() => {
    if (!showExplanation) generateNewProblem();
  }, [showExplanation]);

  useEffect(() => {
    if (!isAnimating) return;
    if (step > 4) {
      setIsAnimating(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 1600);
    return () => clearTimeout(timer);
  }, [step, isAnimating]);

  const getRootName = (index: number) => {
    switch (index) {
      case 2: return 'square root';
      case 3: return 'cube root';
      case 4: return 'fourth root';
      case 5: return 'fifth root';
      default: return `${index}th root`;
    }
  };

  const isPerfect =
    base !== null && rootIndex !== null ? isPerfectRoot(base, rootIndex) : false;

  const roundedResult =
    result !== null ? Math.round(result * 10000) / 10000 : 0;

  const displayResult =
    isPerfect && result !== null
      ? Math.round(result)
      : `≈ ${roundedResult}`;

  // ── Explanation page ──────────────────────────────────────────────────────
  if (showExplanation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Fractional Exponents
            </h1>
            <p className="text-gray-600">Understanding the link between powers and roots</p>
          </div>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p className="text-center text-xl font-semibold text-purple-600">
              A fractional exponent means "take a root"
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-700">
                a<sup>1/n</sup> = <sup>n</sup>√a
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-3 text-base text-gray-600">
              <p>
                <span className="font-semibold text-purple-600">Example:</span>{' '}
                8<sup>1/3</sup> means the <em>cube root</em> of 8, which equals <strong>2</strong>,
                because 2³ = 8.
              </p>
              <p>
                <span className="font-semibold text-blue-600">Check:</span>{' '}
                Raise the answer back to the power <em>n</em> and you should get back the original base.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowExplanation(false)}
            className="mt-8 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ── Main explorer page ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full">

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Fractional Exponents
          </h1>
          <p className="text-gray-600">Watch the root unfold step by step!</p>
        </div>

        {base !== null && rootIndex !== null && (
          <div className="space-y-6">

            {/* Step 1 — Fractional exponent form */}
            <div
              className={`bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 text-center transition-all duration-500 ${
                step >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
            >
              <div className="text-gray-500 text-sm mb-2 uppercase tracking-wide">
                Fractional exponent form
              </div>
              <div className="text-5xl sm:text-6xl font-bold text-purple-600">
                {base}
                <sup className="text-3xl sm:text-4xl">1/{rootIndex}</sup>
              </div>
            </div>

            {/* Step 2 — Root form */}
            <div
              className={`bg-gray-50 rounded-2xl p-6 text-center transition-all duration-500 ${
                step >= 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-gray-500 text-sm mb-2 uppercase tracking-wide">
                Equivalent root form
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-700">
                <sup>{rootIndex}</sup>√{base}{' '}
                <span className="text-gray-400 mx-2">=</span>{' '}
                <span className="text-blue-600">
                  {getRootName(rootIndex)} of {base}
                </span>
              </div>
            </div>

            {/* Step 3 — Result */}
            <div
              className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center transition-all duration-700 ${
                step >= 4 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
            >
              <div className="text-gray-600 text-lg mb-2">Answer:</div>
              <div className="text-5xl sm:text-6xl font-bold text-green-600">
                {displayResult}
              </div>
              <div className="text-sm text-gray-500 mt-3">
                {isPerfect
                  ? `Because ${Math.round(result!)}${'\u207F'.replace('n', rootIndex.toString())} = ${base}`
                  : `${base} has no exact ${getRootName(rootIndex)}`}
              </div>

              {/* Verification row */}
              <div className="mt-4 text-xs text-gray-400 bg-white/70 rounded-xl py-2 px-4 inline-block">
                Check: ({displayResult})<sup>{rootIndex}</sup> ={' '}
                <span className="font-semibold text-gray-600">
                  {result !== null ? Math.pow(result, rootIndex).toFixed(2) : ''}
                </span>
              </div>
            </div>

          </div>
        )}

        <button
          onClick={generateNewProblem}
          disabled={isAnimating}
          className="mt-8 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
          {isAnimating ? 'Animating…' : 'New Problem'}
        </button>

        <button
          onClick={() => setShowExplanation(true)}
          className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-medium transition-colors duration-200"
        >
          Review Explanation
        </button>

      </div>
    </div>
  );
}
