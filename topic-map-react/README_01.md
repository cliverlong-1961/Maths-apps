# Topic Maps React App

A React application that displays interactive topic dependency maps for Differentiation and Integration.

## Features

- **Differentiation Map**: Visualizes the dependency relationships between differentiation topics
- **Integration Map**: Visualizes the dependency relationships between integration topics
- Interactive node selection to view topic details, prerequisites, and what topics use it
- Cycle detection to warn about circular dependencies in the topic graph

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- ReactFlow (for interactive graph visualization)

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
topic-map-react/
├── src/
│   ├── components/
│   │   └── TopicMap.tsx      # Main map visualization component
│   ├── data/
│   │   ├── differentiation.ts # Differentiation topic data
│   │   └── integration.ts     # Integration topic data
│   ├── types/
│   │   └── Topic.ts           # Topic type definition
│   ├── App.tsx                # Main app component
│   ├── App.css                # App styles
│   ├── index.css              # Global styles
│   └── main.tsx               # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Usage

1. Launch the app
2. Use the "Diff Map" and "Int Map" buttons to switch between the two topic maps
3. Click on any node in the graph to see:
   - Topic title and summary
   - Specification reference (if available)
   - Prerequisites (topics you need to know first)
   - Used by (topics that build on this one)

## Deployment

The app builds to the `dist/` directory. For deployment alongside the main site:

1. Build the app: `npm run build`
2. The `dist/` folder can be served from `/topic-map-react/dist/` or deployed to a separate path