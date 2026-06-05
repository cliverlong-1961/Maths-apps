import {
  ReactFlow,
  ReactFlowProvider,
} from "reactflow";

import type { Node, Edge } from "reactflow";

import "reactflow/dist/style.css";

import type { Topic } from "../types/Topic";

import { useState, useMemo } from "react";

interface TopicMapProps {
  topics: Topic[];
  title: string;
}

function getTitle(topics: Topic[], id: string): string {
  return topics.find(t => t.id === id)?.title || id;
}

/**
 * Detects cycles in the topic dependency graph using DFS.
 * Returns an array of cycle paths if any are found.
 */
function detectCycles(topics: Topic[]): string[][] {
  const topicIds = new Set(topics.map(t => t.id));
  const adjacencyMap = new Map<string, string[]>();
  
  // Build adjacency map (topic -> dependsOn)
  topics.forEach(topic => {
    adjacencyMap.set(topic.id, topic.dependsOn.filter(dep => topicIds.has(dep)));
  });

  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const path: string[] = [];

  function dfs(topicId: string): boolean {
    visited.add(topicId);
    recursionStack.add(topicId);
    path.push(topicId);

    const dependencies = adjacencyMap.get(topicId) || [];
    for (const dep of dependencies) {
      if (!visited.has(dep)) {
        if (dfs(dep)) {
          return true;
        }
      } else if (recursionStack.has(dep)) {
        // Found a cycle - extract the cycle path
        const cycleStartIndex = path.indexOf(dep);
        const cycle = path.slice(cycleStartIndex);
        cycles.push(cycle);
        return true;
      }
    }

    path.pop();
    recursionStack.delete(topicId);
    return false;
  }

  // Run DFS from each unvisited node
  for (const topic of topics) {
    if (!visited.has(topic.id)) {
      dfs(topic.id);
    }
  }

  return cycles;
}

/**
 * Calculates the level of a topic in the dependency graph.
 * Uses memoization and cycle detection to prevent infinite recursion.
 */
function getLevel(
  topics: Topic[], 
  topicId: string, 
  memo: Map<string, number> = new Map(),
  visiting: Set<string> = new Set()
): number {
  // Check memo first
  if (memo.has(topicId)) {
    return memo.get(topicId)!;
  }

  // Cycle detection: if we're already visiting this node, we have a cycle
  if (visiting.has(topicId)) {
    console.warn(`Cycle detected at topic: ${topicId}`);
    return 1; // Break the cycle by returning a default level
  }

  const topic = topics.find(t => t.id === topicId);

  if (!topic) {
    memo.set(topicId, 1);
    return 1;
  }

  if (topic.dependsOn.length === 0) {
    memo.set(topicId, 1);
    return 1;
  }

  // Mark as visiting
  visiting.add(topicId);

  const prerequisiteLevels = topic.dependsOn.map(dep => 
    getLevel(topics, dep, memo, visiting)
  );

  // Mark as visited
  visiting.delete(topicId);

  const level = Math.max(...prerequisiteLevels) + 1;
  
  memo.set(topicId, level);
  return level;
}

export default function TopicMap({ topics, title }: TopicMapProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Detect cycles on mount and log warnings
  useMemo(() => {
    const cycles = detectCycles(topics);
    if (cycles.length > 0) {
      console.warn(`⚠️ Cycle(s) detected in ${title}:`);
      cycles.forEach((cycle, i) => {
        console.warn(`  Cycle ${i + 1}: ${cycle.join(' → ')} → ${cycle[0]}`);
      });
    }
  }, [topics, title]);

  // Memoize nodes and edges calculation
  const { nodes, edges, hasCycles } = useMemo(() => {
    const levelMemo = new Map<string, number>();

    const calculatedNodes: Node[] = topics.map(topic => {
      const topicLevel = getLevel(topics, topic.id, levelMemo);

      const topicsAtSameLevel = topics.filter(
        t => getLevel(topics, t.id, levelMemo) === topicLevel
      );

      const positionInLevel = topicsAtSameLevel.findIndex(
        t => t.id === topic.id
      );

      const nodeSpacing = 250;
      const levelWidth = (topicsAtSameLevel.length - 1) * nodeSpacing;

      return {
        id: topic.id,
        position: {
          x: 400 - levelWidth / 2 + positionInLevel * nodeSpacing,
          y: 50 + (topicLevel - 1) * 180,
        },
        data: {
          label: topic.title,
        },
      };
    });

    const calculatedEdges: Edge[] = topics.flatMap(topic =>
      topic.dependsOn.map(dep => ({
        id: `${dep}-${topic.id}`,
        source: dep,
        target: topic.id,
      }))
    );

    const cycles = detectCycles(topics);
    return { 
      nodes: calculatedNodes, 
      edges: calculatedEdges,
      hasCycles: cycles.length > 0
    };
  }, [topics]);

  const selectedTopic = selectedTopicId
    ? topics.find(t => t.id === selectedTopicId)
    : null;

  const usedBy = selectedTopic
    ? topics.filter(t => t.dependsOn.includes(selectedTopic.id))
    : [];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "600px",
      }}
    >
      <div style={{ flex: 3 }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={(_, node) =>
              setSelectedTopicId(node.id)
            }
          />
        </ReactFlowProvider>
      </div>

      <div
        style={{
          flex: 1,
          padding: "1rem",
          borderLeft: "1px solid #ccc",
          backgroundColor: "#f8f8f8",
          overflowY: "auto",
        }}
      >
        {hasCycles && (
          <div style={{ 
            padding: "0.75rem", 
            backgroundColor: "#fef3c7", 
            border: "1px solid #f59e0b", 
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            color: "#92400e",
            fontSize: "0.875rem"
          }}>
            ⚠️ Warning: Circular dependencies detected in this topic map.
          </div>
        )}
        
        <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "bold" }}>{title}</h2>
        
        {selectedTopic ? (
          <>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{selectedTopic.title}</h3>

            {selectedTopic.summary && (
              <p style={{ marginBottom: "1rem", color: "#555" }}>{selectedTopic.summary}</p>
            )}

            {selectedTopic.specRef && (
              <p style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#888" }}>
                Spec Ref: {selectedTopic.specRef}
              </p>
            )}

            {selectedTopic.url && (
              <p style={{ marginBottom: "1rem" }}>
                <a
                  href={selectedTopic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#6d28d9", textDecoration: "underline" }}
                >
                  Open resource ↗
                </a>
              </p>
            )}

            <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Prerequisites</h4>

            {selectedTopic.dependsOn.length > 0 ? (
              <ul style={{ marginBottom: "1rem", paddingLeft: "1.2rem" }}>
                {selectedTopic.dependsOn.map(dep => (
                  <li key={dep} style={{ marginBottom: "0.25rem" }}>
                    {getTitle(topics, dep)}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ marginBottom: "1rem", color: "#888", fontStyle: "italic" }}>No prerequisites</p>
            )}

            <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Used By</h4>

            {usedBy.length > 0 ? (
              <ul style={{ paddingLeft: "1.2rem" }}>
                {usedBy.map(topic => (
                  <li key={topic.id} style={{ marginBottom: "0.25rem" }}>
                    {topic.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#888", fontStyle: "italic" }}>Not used by any topic</p>
            )}
          </>
        ) : (
          <p style={{ color: "#888", fontStyle: "italic" }}>Select a topic to see details</p>
        )}
      </div>
    </div>
  );
}