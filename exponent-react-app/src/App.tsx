import { useState } from "react";

import Exp1 from "./components/Exp1";
import Exp2 from "./components/Exp2";
import Exp3 from "./components/Exp3";
import Exp4 from "./components/Exp4";
import Exp5 from "./components/Exp5";

export default function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Exponent App
        </h1>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-3">
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                page === n
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Part {n}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {page === 1 && <Exp1 />}
        {page === 2 && <Exp2 />}
        {page === 3 && <Exp3 />}
        {page === 4 && <Exp4 />}
        {page === 5 && <Exp5 />}
      </div>

    </div>
  );
}