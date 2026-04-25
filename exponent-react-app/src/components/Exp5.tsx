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
    const newExponent = 1 / newRootIndex;
    const newResult = Math.pow(newBase, newExponent);

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
    base !== null && rootIndex !== null
      ? isPerfectRoot(base, rootIndex)
      : false;

  const roundedResult =
    result !== null ? Math.round(result * 10000) / 10000 : 0;

  if (showExplanation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 max-w-2xl w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
            Understanding Fractional Exponents
          </h1>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p className="text-center text-xl font-semibold text-indigo-600">
              A fractional exponent means "take a root"
            </p>

            <div className="bg-indigo-50 rounded-2xl p-6">
              <div className="text-center text-2xl sm:text-3xl font-bold text-indigo-700">
                a<sup>1/n</sup> = <sup>n</sup>√a
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowExplanation(false)}
            className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full">

        {base !== null && rootIndex !== null && (
          <div className="space-y-6">

            <div className="text-center">
              {base}
              <sup>1/{rootIndex}</sup>
            </div>

            <div className="text-center">
              {getRootName(rootIndex)}
            </div>

            <div className="text-center">
              {isPerfect && result !== null
                ? Math.round(result)
                : `≈ ${roundedResult}`}
            </div>

            <div className="text-center">
              {result !== null && rootIndex !== null
                ? Math.pow(result, rootIndex).toFixed(2)
                : ''}
            </div>

          </div>
        )}

        <button
          onClick={generateNewProblem}
          disabled={isAnimating}
          className="mt-8 w-full bg-indigo-500 text-white py-4 rounded-xl"
        >
          <RefreshCw className="inline w-5 h-5 mr-2" />
          New Problem
        </button>

        <button
          onClick={() => setShowExplanation(true)}
          className="w-full mt-2 bg-gray-100 py-3 rounded-xl"
        >
          Review Explanation
        </button>

      </div>
    </div>
  );
}