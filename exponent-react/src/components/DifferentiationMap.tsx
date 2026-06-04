import {
  ReactFlow,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";

import { differentiationTopics } from "../data/differentiation";

import { useState } from "react";

function getTitle(id: string) {
  return (
    differentiationTopics.find(t => t.id === id)?.title || id
  );
}

function getLevel(topicId: string): number {

  const topic =
    differentiationTopics.find(
      t => t.id === topicId
    );

  if (!topic) {
    return 1;
  }

  if (topic.dependsOn.length === 0) {
    return 1;
  }

  const prerequisiteLevels =
    topic.dependsOn.map(getLevel);

  return Math.max(...prerequisiteLevels) + 1;
}



const nodes = differentiationTopics.map(topic => {

  const topicLevel = getLevel(topic.id);

  const topicsAtSameLevel =
    differentiationTopics.filter(
      t => getLevel(t.id) === topicLevel
    );

  const positionInLevel =
    topicsAtSameLevel.findIndex(
      t => t.id === topic.id
    );

  const nodeSpacing = 250;

  const levelWidth =
    (topicsAtSameLevel.length - 1) * nodeSpacing;

  return {
    id: topic.id,

    position: {
      x:
        400 -
        levelWidth / 2 +
        positionInLevel * nodeSpacing,

      y:
        50 +
        (topicLevel - 1) * 180,
    },

    data: {
      label: topic.title,
    },
  };
});

const edges = differentiationTopics.flatMap(topic =>
  topic.dependsOn.map(dep => ({
    id: `${dep}-${topic.id}`,
    source: dep,
    target: topic.id,
  }))
);

export default function DifferentiationMap() {
  const [selectedTopicId, setSelectedTopicId] =
    useState<string | null>(null);

  const selectedTopic =
    differentiationTopics.find(
      t => t.id === selectedTopicId
    );

  const usedBy = selectedTopic
    ? differentiationTopics.filter(
      t => t.dependsOn.includes(selectedTopic.id)
    )
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
        }}
      >
        {selectedTopic ? (
          <>
            <h2>{selectedTopic.title}</h2>

            {"summary" in selectedTopic && (
              <p>{selectedTopic.summary}</p>
            )}

            <h3>Prerequisites</h3>

            <ul>
              {selectedTopic.dependsOn.map(dep => (
                <li key={dep}>
                  {getTitle(dep)}
                </li>
              ))}
            </ul>

            <h3>Used By</h3>

            <ul>
              {usedBy.map(topic => (
                <li key={topic.id}>
                  {topic.title}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Select a topic</p>
        )}
      </div>
    </div>
  );
}

