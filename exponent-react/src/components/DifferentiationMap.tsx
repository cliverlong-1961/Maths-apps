import DependencyGraph from "./DependencyGraph";

import {
  differentiationTopics,
} from "../data/differentiation";

export default function DifferentiationMap() {
  return (
    <DependencyGraph
      topics={differentiationTopics}
    />
  );
}