import { ReactFlow, ReactFlowProvider } from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import type { Topic } from "../types/Topic";
import { useState, useMemo } from "react";

interface TopicMapProps {
  topics: Topic[];
  title: string;
}

function getTitle(topics: Topic[], id: string): string {
  return topics.find((t) => t.id === id)?.title || id;
}

function detectCycles(topics: Topic[]): string[][] {
  const topicIds = new Set(topics.map((t) => t.id));
  const adjacencyMap = new Map<string, string[]>();
  topics.forEach((topic) => {
    adjacencyMap.set(topic.id, topic.dependsOn.filter((dep) => topicIds.has(dep)));
  });
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const path: string[] = [];
  function dfs(topicId: string): boolean {
    visited.add(topicId);
    recursionStack.add(topicId);
    path.push(topicId);
    for (const dep of adjacencyMap.get(topicId) || []) {
      if (!visited.has(dep)) {
        if (dfs(dep)) return true;
      } else if (recursionStack.has(dep)) {
        cycles.push(path.slice(path.indexOf(dep)));
        return true;
      }
    }
    path.pop();
    recursionStack.delete(topicId);
    return false;
  }
  for (const topic of topics) {
    if (!visited.has(topic.id)) dfs(topic.id);
  }
  return cycles;
}

function getLevel(
  topics: Topic[],
  topicId: string,
  memo: Map<string, number> = new Map(),
  visiting: Set<string> = new Set()
): number {
  if (memo.has(topicId)) return memo.get(topicId)!;
  if (visiting.has(topicId)) return 1;
  const topic = topics.find((t) => t.id === topicId);
  if (!topic || topic.dependsOn.length === 0) { memo.set(topicId, 1); return 1; }
  visiting.add(topicId);
  const level = Math.max(...topic.dependsOn.map((dep) => getLevel(topics, dep, memo, visiting))) + 1;
  visiting.delete(topicId);
  memo.set(topicId, level);
  return level;
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const NAVY = "#1a2744";
const GOLD = "#c8a84b";
const GOLD_LIGHT = "#f5e9c8";

// ── Small components ──────────────────────────────────────────────────────────

function SidebarItem({
  topic, isActive, predCount, succCount, onClick,
}: {
  topic: Topic; isActive: boolean; predCount: number; succCount: number; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "6px 10px",
        fontSize: "12px",
        cursor: "pointer",
        borderLeft: isActive ? `3px solid ${GOLD}` : "3px solid transparent",
        backgroundColor: isActive ? GOLD_LIGHT : hovered ? "#f3f0e8" : "transparent",
        color: isActive ? NAVY : "#444",
        lineHeight: 1.4,
        transition: "background 0.1s",
        userSelect: "none",
      }}
    >
      {topic.title}
      <span style={{
        float: "right", fontSize: "10px", padding: "1px 4px",
        borderRadius: "8px", marginLeft: "4px",
        backgroundColor: "#e8e4d8", color: "#666",
      }}>
        {predCount}↑ {succCount}↓
      </span>
    </div>
  );
}

function ToolbarButton({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} style={{
      padding: "4px 10px", fontSize: "11px",
      border: `1px solid ${active ? GOLD : "#d1d5db"}`,
      borderRadius: "6px",
      backgroundColor: active ? GOLD : "#fff",
      color: active ? NAVY : "#555",
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: active ? 600 : 400,
    }}>
      {children}
    </button>
  );
}

function Chip({ label, variant, onClick }: {
  label: string; variant: "prereq" | "leadsto"; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const c = variant === "prereq"
    ? { bg: "#e1f5ee", border: "#0F6E56", text: "#04342C" }
    : { bg: "#eeedfe", border: "#3C3489", text: "#26215C" };
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block", fontSize: "11px", padding: "3px 7px",
        borderRadius: "6px", border: `1px solid ${c.border}`,
        backgroundColor: hovered ? c.border : c.bg,
        color: hovered ? "#fff" : c.text,
        cursor: "pointer", margin: "2px 2px 2px 0",
        transition: "background 0.1s, color 0.1s",
      }}
    >
      {label}
    </span>
  );
}

function DetailLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: "10px", fontWeight: 600, color: "#999",
      textTransform: "uppercase", letterSpacing: "0.06em",
      marginBottom: "4px",
    }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", backgroundColor: "#e5e7eb", margin: "2px 0" }} />;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TopicMap({ topics }: TopicMapProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [mode, setMode] = useState<"focus" | "full">("focus");
  const [sidebarFilter, setSidebarFilter] = useState("");

  const getSuccessors = (id: string) =>
    topics.filter((t) => t.dependsOn.includes(id)).map((t) => t.id);
  const getPredecessors = (id: string) =>
    topics.find((t) => t.id === id)?.dependsOn ?? [];

  const hasCycles = useMemo(() => detectCycles(topics).length > 0, [topics]);

  const visibleIds = useMemo(() => {
    if (mode === "full" || !selectedTopicId) return topics.map((t) => t.id);
    return [selectedTopicId, ...getPredecessors(selectedTopicId), ...getSuccessors(selectedTopicId)];
  }, [mode, selectedTopicId, topics]);

  const { nodes, edges } = useMemo(() => {
    const levelMemo = new Map<string, number>();
    const visTopics = topics.filter((t) => visibleIds.includes(t.id));

    const calculatedNodes: Node[] = visTopics.map((topic) => {
      const topicLevel = getLevel(topics, topic.id, levelMemo);
      const topicsAtSameLevel = visTopics.filter(
        (t) => getLevel(topics, t.id, levelMemo) === topicLevel
      );
      const positionInLevel = topicsAtSameLevel.findIndex((t) => t.id === topic.id);
      const nodeSpacing = 250;
      const levelWidth = (topicsAtSameLevel.length - 1) * nodeSpacing;

      const isSelected = topic.id === selectedTopicId;
      const isPrereq = selectedTopicId ? getPredecessors(selectedTopicId).includes(topic.id) : false;
      const isLeadsTo = selectedTopicId ? getSuccessors(selectedTopicId).includes(topic.id) : false;

      let bg = "#f3f4f6";
      let border = "1px solid #d1d5db";
      let color = "#374151";

      if (isSelected)       { bg = GOLD_LIGHT; border = `2px solid ${GOLD}`; color = NAVY; }
      else if (isPrereq)    { bg = "#e1f5ee"; border = "1px solid #0F6E56"; color = "#04342C"; }
      else if (isLeadsTo)   { bg = "#eeedfe"; border = "1px solid #3C3489"; color = "#26215C"; }
      else if (topic.url)   { bg = "#fef9ec"; border = `1px solid ${GOLD}`; color = NAVY; }

      return {
        id: topic.id,
        position: {
          x: 400 - levelWidth / 2 + positionInLevel * nodeSpacing,
          y: 50 + (topicLevel - 1) * 180,
        },
        data: { label: topic.title },
        style: {
          background: bg, border, color,
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "13px",
          fontFamily: "'Crimson Pro', Georgia, serif",
          fontWeight: isSelected ? 600 : 400,
          boxShadow: isSelected ? "0 2px 8px rgba(200,168,75,0.3)" : "none",
          cursor: "pointer",
        },
      };
    });

    const calculatedEdges: Edge[] = visTopics.flatMap((topic) =>
      topic.dependsOn
        .filter((dep) => visibleIds.includes(dep))
        .map((dep) => {
          const highlighted = selectedTopicId &&
            (dep === selectedTopicId || topic.id === selectedTopicId);
          return {
            id: `${dep}-${topic.id}`,
            source: dep,
            target: topic.id,
            style: { stroke: highlighted ? GOLD : "#d1d5db", strokeWidth: highlighted ? 2 : 1 },
          };
        })
    );

    return { nodes: calculatedNodes, edges: calculatedEdges };
  }, [topics, visibleIds, selectedTopicId]);

  const sortedTopics = useMemo(
    () => [...topics].sort((a, b) => a.title.localeCompare(b.title)),
    [topics]
  );
  const filteredTopics = sidebarFilter
    ? sortedTopics.filter((t) => t.title.toLowerCase().includes(sidebarFilter.toLowerCase()))
    : sortedTopics;

  const selectedTopic = selectedTopicId ? topics.find((t) => t.id === selectedTopicId) : null;
  const prereqs = selectedTopic ? getPredecessors(selectedTopic.id) : [];
  const leadsTo = selectedTopic ? getSuccessors(selectedTopic.id) : [];

  const selectTopic = (id: string) => setSelectedTopicId(id);

  return (
    <div style={{
      display: "flex", width: "100%", height: "640px",
      border: "1px solid #d1d5db", borderRadius: "12px",
      overflow: "hidden",
      fontFamily: "'Crimson Pro', Georgia, serif",
      backgroundColor: "#fff",
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: "200px", minWidth: "200px",
        display: "flex", flexDirection: "column",
        borderRight: "1px solid #e5e7eb",
        backgroundColor: "#f9f8f6",
      }}>
        <div style={{ padding: "10px 10px 8px", borderBottom: "1px solid #e5e7eb" }}>
          <input
            style={{
              width: "100%", padding: "5px 8px", fontSize: "13px",
              border: "1px solid #d1d5db", borderRadius: "6px",
              outline: "none", fontFamily: "inherit",
              backgroundColor: "#fff", color: "#333",
            }}
            placeholder="Search topics…"
            value={sidebarFilter}
            onChange={(e) => setSidebarFilter(e.target.value)}
          />
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "4px 0" }}>
          {filteredTopics.map((t) => (
            <SidebarItem
              key={t.id}
              topic={t}
              isActive={t.id === selectedTopicId}
              predCount={getPredecessors(t.id).length}
              succCount={getSuccessors(t.id).length}
              onClick={() => selectTopic(t.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Map canvas ── */}
      <div style={{ flex: 1, position: "relative", minWidth: 0, backgroundColor: "#fafafa" }}>

        {hasCycles && (
          <div style={{
            position: "absolute", top: 10, left: 10, zIndex: 10,
            padding: "6px 10px", backgroundColor: "#fef3c7",
            border: "1px solid #f59e0b", borderRadius: "6px",
            color: "#92400e", fontSize: "12px",
          }}>
            ⚠️ Circular dependencies detected
          </div>
        )}

        <div style={{
          position: "absolute", top: 10, right: 10,
          display: "flex", gap: "6px", zIndex: 10,
        }}>
          <ToolbarButton active={mode === "focus"} onClick={() => setMode("focus")}>
            Focus
          </ToolbarButton>
          <ToolbarButton active={mode === "full"} onClick={() => setMode("full")}>
            Full map
          </ToolbarButton>
        </div>

        {!selectedTopicId && (
          <div style={{
            position: "absolute", bottom: 14, left: "50%",
            transform: "translateX(-50%)",
            fontSize: "12px", color: "#bbb", pointerEvents: "none", zIndex: 5,
          }}>
            Click a topic to explore
          </div>
        )}

        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={(_, node) => selectTopic(node.id)}
          />
        </ReactFlowProvider>
      </div>

      {/* ── Detail panel ── */}
      <div style={{
        width: selectedTopic ? "220px" : "0px",
        minWidth: selectedTopic ? "220px" : "0px",
        borderLeft: selectedTopic ? "1px solid #e5e7eb" : "none",
        display: "flex", flexDirection: "column",
        backgroundColor: "#fff",
        overflowY: selectedTopic ? "auto" : "hidden",
        overflow: selectedTopic ? "auto" : "hidden",
        transition: "width 0.2s ease, min-width 0.2s ease",
      }}>
        {selectedTopic && (
          <div style={{
            width: "220px", padding: "14px 14px 20px",
            display: "flex", flexDirection: "column", gap: "11px",
          }}>

            {/* Close */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedTopicId(null)}
                aria-label="Close panel"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#bbb", fontSize: "16px", lineHeight: 1, padding: "0 2px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Title */}
            <div>
              <DetailLabel>Topic</DetailLabel>
              <div style={{ fontSize: "15px", fontWeight: 600, color: NAVY, lineHeight: 1.4 }}>
                {selectedTopic.title}
              </div>
            </div>

            <Divider />

            {/* Spec ref */}
            {selectedTopic.specRef && (
              <div>
                <DetailLabel>Spec reference</DetailLabel>
                <span style={{
                  display: "inline-block", fontSize: "11px", padding: "3px 8px",
                  borderRadius: "6px", backgroundColor: GOLD_LIGHT,
                  color: NAVY, border: `1px solid ${GOLD}`,
                }}>
                  {selectedTopic.specRef}
                </span>
              </div>
            )}

            {/* Summary */}
            {selectedTopic.summary && (
              <div>
                <DetailLabel>Summary</DetailLabel>
                <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.6, margin: 0 }}>
                  {selectedTopic.summary}
                </p>
              </div>
            )}

            <Divider />

            {/* Prerequisites */}
            <div>
              <DetailLabel>Prerequisites</DetailLabel>
              {prereqs.length > 0 ? (
                <div>
                  {prereqs.map((id) => (
                    <Chip key={id} label={getTitle(topics, id)} variant="prereq" onClick={() => selectTopic(id)} />
                  ))}
                </div>
              ) : (
                <span style={{ fontSize: "12px", color: "#bbb", fontStyle: "italic" }}>None</span>
              )}
            </div>

            {/* Leads to */}
            <div>
              <DetailLabel>Leads to</DetailLabel>
              {leadsTo.length > 0 ? (
                <div>
                  {leadsTo.map((id) => (
                    <Chip key={id} label={getTitle(topics, id)} variant="leadsto" onClick={() => selectTopic(id)} />
                  ))}
                </div>
              ) : (
                <span style={{ fontSize: "12px", color: "#bbb", fontStyle: "italic" }}>None</span>
              )}
            </div>

            <Divider />

            {/* Start button or placeholder */}
            {selectedTopic.url ? (
              <a
                href={selectedTopic.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block", padding: "9px", textAlign: "center",
                  fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  backgroundColor: NAVY, color: GOLD,
                  borderRadius: "8px", textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                Start this topic ↗
              </a>
            ) : (
              <div style={{
                padding: "9px", textAlign: "center", fontSize: "12px",
                color: "#bbb", border: "1px dashed #d1d5db",
                borderRadius: "8px", fontStyle: "italic",
              }}>
                No app linked yet
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
