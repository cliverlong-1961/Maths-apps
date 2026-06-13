import { useState } from "react";
import TopicMap from "./components/TopicMap";
import { differentiationTopics } from "./data/differentiation";
import { integrationTopics } from "./data/integration";
import { trigonometryTopics } from "./data/trigonometry";
import { sequencesAndSeriesTopics } from "./data/sequencesAndSeries";
import { coordinateGeometryTopics } from "./data/coordinateGeometry";
import { proofTopics } from "./data/proof";
import { algebraAndFunctionsTopics } from "./data/algebraAndFunctions";
import { vectorsTopics } from "./data/vectors";

const NAVY = "#1a2744";
const GOLD = "#c8a84b";
const GOLD_LIGHT = "#f5e9c8";

const pages = [
  { id: 1, label: "Differentiation",       topics: differentiationTopics,     title: "Differentiation Map" },
  { id: 2, label: "Integration",           topics: integrationTopics,          title: "Integration Map" },
  { id: 3, label: "Trigonometry",          topics: trigonometryTopics,         title: "Trigonometry Map" },
  { id: 4, label: "Sequences & Series",    topics: sequencesAndSeriesTopics,   title: "Sequences & Series Map" },
  { id: 5, label: "Coordinate Geometry",   topics: coordinateGeometryTopics,   title: "Coordinate Geometry Map" },
  { id: 6, label: "Proof",                 topics: proofTopics,                title: "Proof Map" },
  { id: 7, label: "Algebra & Functions",   topics: algebraAndFunctionsTopics,  title: "Algebra and Functions Map" },
  { id: 8, label: "Vectors",               topics: vectorsTopics,              title: "Vectors Map" },
];

function NavButton({ label, active, onClick }: {
  label: string; active: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "7px 16px",
        fontSize: "14px",
        fontFamily: "'Crimson Pro', Georgia, serif",
        fontWeight: active ? 600 : 400,
        border: `1px solid ${active ? GOLD : hovered ? "#c8a84b88" : "#d1d5db"}`,
        borderRadius: "8px",
        backgroundColor: active ? NAVY : hovered ? GOLD_LIGHT : "#fff",
        color: active ? GOLD : hovered ? NAVY : "#444",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s, border-color 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  const current = pages.find((p) => p.id === page)!;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fef9ec 100%)",
      padding: "24px 16px",
      fontFamily: "'Crimson Pro', Georgia, serif",
    }}>

      {/* Header */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 24px",
        backgroundColor: "#fff",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(26,39,68,0.08)",
        padding: "20px 24px",
      }}>
        <h1 style={{
          fontSize: "26px", fontWeight: 700,
          color: NAVY, marginBottom: "16px", textAlign: "center",
          letterSpacing: "0.01em",
        }}>
          A-Level Maths — Topic Maps
        </h1>

        {/* Nav tabs */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "center", gap: "8px",
        }}>
          {pages.map((p) => (
            <NavButton
              key={p.id}
              label={p.label}
              active={page === p.id}
              onClick={() => setPage(p.id)}
            />
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "14px",
          boxShadow: "0 2px 12px rgba(26,39,68,0.08)",
          padding: "16px",
        }}>
          <h2 style={{
            fontSize: "18px", fontWeight: 600, color: NAVY,
            marginBottom: "14px", paddingLeft: "4px",
          }}>
            {current.title}
          </h2>
          <TopicMap topics={current.topics} title={current.title} />
        </div>
      </div>

    </div>
  );
}
