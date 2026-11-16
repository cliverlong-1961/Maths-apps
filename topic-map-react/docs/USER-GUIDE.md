# User Guide

## Overview

The application presents ten interactive A-Level Mathematics topic maps. Each map represents topics as nodes and prerequisite relationships as directed connections.

## Selecting a subject map

Use the navigation buttons at the top of the page:

1. Differentiation
2. Integration
3. Trigonometry
4. Sequences & Series
5. Coordinate Geometry
6. Proof
7. Algebra & Functions
8. Vectors
9. Hypothesis Testing
10. Infinity

Selecting a button replaces the current map with the chosen subject map.

## Exploring a map

### Topic list

The left-hand sidebar lists topics alphabetically. Use **Search topics…** to filter the list by topic title. Select an item to select the corresponding node and open its detail panel.

The small counts beside a topic indicate the number of direct prerequisites and direct successor topics.

### Selecting a node

Click a node in the graph or a topic in the sidebar. The detail panel can show:

- **Topic** — the topic title.
- **Spec reference** — the value supplied in the topic data, when present.
- **Summary** — a short description, when present.
- **Prerequisites** — topics listed in the selected topic's `dependsOn` field.
- **Leads to** — topics whose `dependsOn` field contains the selected topic.
- **Start this topic** — a link opened in a new tab, when a URL is provided in the topic data. Otherwise the panel displays “No app linked yet”.

The prerequisite and leads-to chips are clickable. Selecting one moves the focus to that topic.

### Focus and Full map

The map toolbar provides two display modes:

- **Focus** — before a topic is selected, the map shows all topics. After selection, it shows the selected topic, its direct prerequisites, and its direct successors. The selected topic is centred, prerequisites are arranged to the left, and successors to the right.
- **Full map** — displays all topics in the subject map, arranged in dependency levels.

When Focus mode is active and a topic is selected, **Display All** fits the full set of currently displayed nodes into the canvas. Choose **Full map** to restore all topics.

### Moving around the graph

- Pan by dragging or using the canvas interaction supported by React Flow.
- The component enables pan-on-scroll.
- Mouse-wheel zoom is disabled (`zoomOnScroll={false}`); pinch zoom is enabled.
- The graph automatically fits its view on initial display and when Focus mode selection changes.

### Detail panel

The detail panel is on the right. Click its narrow vertical strip to expand or collapse it. Use the close (×) button in the expanded panel to clear the selection and close the panel.

## Understanding the connections

Each topic contains a `dependsOn` list in the data. A topic in that list is a prerequisite for the topic being described. An edge is drawn from the prerequisite node to the topic that depends on it.

When a topic is selected:
- Prerequisite nodes are highlighted in green.
- Direct successor nodes are highlighted in purple.
- The selected node and its connecting edges are highlighted in the application’s gold/navy theme.

## Circular dependency warning

If the topic data contains a circular dependency, the map displays a warning. A cycle means that following prerequisite relationships eventually leads back to a topic already in the chain. Treat this as a data issue to investigate; the warning does not itself correct the dependency data.

## Links to learning applications

Some topic records include a `url`. The detail panel then provides **Start this topic ↗**, which opens that URL in a new browser tab. The actual destination and its availability are maintained separately from this application.
