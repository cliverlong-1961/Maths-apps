# Architecture

## Overview

The supplied source is a client-side single-page application built with React and TypeScript. Vite provides the development server and production build. React Flow renders the topic dependency graphs.

There is no application API server or database evident in the supplied source archive. The topic map content is defined in TypeScript data files imported by the frontend.

## Runtime structure

```text
index.html
  └── src/main.tsx
        └── src/App.tsx
              ├── subject navigation
              ├── subject topic data
              └── src/components/TopicMap.tsx
                    ├── topic sidebar and search
                    ├── React Flow graph canvas
                    └── topic detail panel
```

`src/main.tsx` imports the global stylesheet, creates the React root, and renders `App` inside `StrictMode`.

`src/App.tsx` imports the ten topic data arrays, defines the navigation entries, manages the active subject map, and passes the selected map's topics to `TopicMap`.

`src/components/TopicMap.tsx` implements the interactive map, dependency calculations, node/edge construction, search sidebar, toolbar, and detail panel.

## Topic data model

The shared type is defined in `src/types/Topic.ts`:

```ts
export type Topic = {
  id: string;
  title: string;
  summary?: string;
  specRef?: string;
  url?: string;
  dependsOn: string[];
};
```

Fields:

| Field | Meaning |
|---|---|
| `id` | Unique identifier for a topic within its map. Used to connect dependencies. |
| `title` | Human-readable topic name. |
| `summary` | Optional explanatory text shown in the detail panel. |
| `specRef` | Optional specification reference or label. |
| `url` | Optional external learning-app URL. |
| `dependsOn` | IDs of the topics that must be understood first. |

The data files are:
- `src/data/differentiation.ts`
- `src/data/integration.ts`
- `src/data/trigonometry.ts`
- `src/data/sequencesAndSeries.ts`
- `src/data/coordinateGeometry.ts`
- `src/data/proof.ts`
- `src/data/algebraAndFunctions.ts`
- `src/data/vectors.ts`
- `src/data/hypothesis-testing.ts`
- `src/data/infinity.ts`

The supplied archive contains 128 topic records across these ten files. This count is based on the source files in the archive and should be refreshed if topics are added or removed.

## Dependency direction

For a topic record `T`, every ID in `T.dependsOn` identifies a prerequisite of `T`.

The graph edge is created with:
- `source`: prerequisite ID
- `target`: dependent topic ID

Consequently, edges point from foundational topics towards topics that build on them.

The component derives direct successors by finding records whose `dependsOn` array contains the selected topic ID. The detail panel labels prerequisites and successors as **Prerequisites** and **Leads to**.

## Graph layout and interaction

`TopicMap.tsx` uses React Flow's `ReactFlow`, `ReactFlowProvider`, `Position`, and `useReactFlow`.

- **Full map:** topics are assigned a level using `getLevel`. Root topics (with no prerequisites) are level 1. A dependent topic is one level above its deepest prerequisite. Topics at the same level are laid out horizontally; levels are arranged vertically.
- **Focus mode:** with a selected topic, the component displays that topic and its direct prerequisites and successors. The selected topic is centred, prerequisites are placed to the left, and successors to the right.
- Nodes and edges are recreated using memoised calculations.
- The canvas fits the view initially and when the selected topic or mode changes in Focus mode.

The component's `detectCycles` function uses depth-first search with a recursion stack to detect a circular dependency and display a warning.

## External integrations visible in source

`index.html` loads Firebase 9.23.0 compatibility scripts from Google's hosted CDN and then references:
- `../Feedback_code/firebase-config.js`
- `../Feedback_code/feedback-widget.js`

These paths suggest an external feedback widget integration. The referenced files are not included in the supplied archive, so its configuration, data handling, Firebase project, and deployment path cannot be confirmed here. Check that these relative paths resolve in the actual hosting layout.

Topic `url` values are ordinary external links opened in a new tab. The destination applications are not part of this React application.

## Styling

The project includes Tailwind CSS and PostCSS configuration. The topic map itself uses extensive inline React styles and a navy/gold visual theme. `src/index.css` includes Tailwind directives; `src/App.css` currently contains largely the default Vite starter styles for `#root`, logo, and card elements.

## Package and build configuration

`package.json` defines:
- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `lint`: `eslint .`
- `preview`: `vite preview`

The supplied `vite.config.ts` only registers the React plugin. It does not set a custom Vite `base` path.
