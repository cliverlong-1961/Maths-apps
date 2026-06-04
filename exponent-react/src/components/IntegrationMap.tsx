import DependencyGraph from "./DependencyGraph";

import {
  integrationTopics,
} from "../data/integration";

export default function IntegrationMap() {
  return (
    <DependencyGraph
      topics={integrationTopics}
    />
  );
}