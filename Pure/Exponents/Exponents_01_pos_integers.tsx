import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function ExponentAnimator() {
  const [base, setBase] = useState(null);
  const [exponent, setExponent] = useState(null);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNewProblem = () => {
    const newBase = Math.floor(Math.random() * 4) + 2; // 2-5
    const newExponent = Math.floor(Math.random() * 3) + 3; // 3-5
    const newResult = Math.pow(newBase, newExponent);
    
    setBase(newBase);
    setExponent(newExponent);
    setResult(newResult);
    setStep(0);
    setIsAnimating(true);
  };

  useEffect(() => {
    generateNewProblem();
  }, []);

  useEffect(() => {
    if (!isAnimating || step > exponent + 1) {
      if (step > exponent + 1) {
        setIsAnimating(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setStep(s => s + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [step, isAnimating, exponent]);

  const renderMultiplication = () => {
    if (!base || !exponent) return null;
    
    const factors = Array(exponent).fill(base);
    
    return (
      <div className="flex flex-wrap justify-center items-center gap-2 text-2xl sm:text-3xl">
        {factors.map((factor, idx) => (
          <React.Fragment key={idx}>
            <span 
              className={`transition-all duration-500 ${
                step > idx + 1 ? 'text-blue-600 font-bold scale-110' : 'text-gray-700'
              }`}
            >
              {factor}
            </span>
            {idx < factors.length - 1 && (
              <span className="text-gray-400">×</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Exponent Explorer
          </h1>
          <p className="text-gray-600">Watch the calculation unfold!</p>
        </div>

        {base && exponent && (
          <div className="space-y-8">
            {/* Exponent Form */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 text-center">
              <div className={`text-5xl sm:text-6xl font-bold text-purple-600 transition-all duration-500 ${
                step >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}>
                {base}
                <sup className="text-3xl sm:text-4xl">{exponent}</sup>
              </div>
            </div>

            {/* Multiplication Sequence */}
            <div className={`bg-gray-50 rounded-2xl p-6 min-h-[80px] flex items-center justify-center transition-all duration-500 ${
              step >= 2 ? 'opacity-100' : 'opacity-0'
            }`}>
              {renderMultiplication()}
            </div>

            {/* Result */}
            <div className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center transition-all duration-700 ${
              step > exponent + 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}>
              <div className="text-gray-600 text-lg mb-2">Answer:</div>
              <div className="text-5xl sm:text-6xl font-bold text-green-600">
                {result}
              </div>
            </div>
          </div>
        )}

        {/* New Problem Button */}
        <button
          onClick={generateNewProblem}
          disabled={isAnimating}
          className="mt-8 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
          {isAnimating ? 'Animating...' : 'New Problem'}
        </button>
      </div>
    </div>
  );
}