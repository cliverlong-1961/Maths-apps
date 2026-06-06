import { useState } from "react";

import TopicMap from "./components/TopicMap";

import { differentiationTopics } from "./data/differentiation";
import { integrationTopics } from "./data/integration";
import { trigonometryTopics } from "./data/trigonometry";
import { sequencesAndSeriesTopics } from "./data/sequencesAndSeries";
import { coordinateGeometryTopics } from "./data/coordinateGeometry";
import { proofTopics } from "./data/proof";
import { algebraAndFunctionsTopics } from "./data/algebraAndFunctions";

export default function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Topic Maps
        </h1>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setPage(1)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              page === 1
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Diff Map
          </button>
          <button
            onClick={() => setPage(2)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              page === 2
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Int Map
          </button>
          <button
            onClick={() => setPage(3)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              page === 3
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Trig Map
          </button>
          <button
            onClick={() => setPage(4)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              page === 4
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Seq &amp; Series Map
          </button>
          <button
            onClick={() => setPage(5)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              page === 5
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Coord geom
          </button>
          <button
            onClick={() => setPage(6)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              page === 6
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Proof
          </button>
          <button
            onClick={() => setPage(7)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              page === 7
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Algebra &amp; Functions
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {page === 1 && <TopicMap topics={differentiationTopics} title="Differentiation Map" />}
        {page === 2 && <TopicMap topics={integrationTopics} title="Integration Map" />}
        {page === 3 && <TopicMap topics={trigonometryTopics} title="Trigonometry Map" />}
        {page === 4 && <TopicMap topics={sequencesAndSeriesTopics} title="Sequences & Series Map" />}
        {page === 5 && <TopicMap topics={coordinateGeometryTopics} title="Coordinate Geometry Map" />}
        {page === 6 && <TopicMap topics={proofTopics} title="Proof Map" />}
        {page === 7 && <TopicMap topics={algebraAndFunctionsTopics} title="Algebra and Functions Map" />}
      </div>

    </div>
  );
}
