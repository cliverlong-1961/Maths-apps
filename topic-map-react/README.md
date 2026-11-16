# A-Level Maths Topic Maps

A React application for exploring relationships and learning dependencies across A-Level Mathematics topics. It presents interactive topic maps, allowing a learner or tutor to select a topic, inspect its prerequisites, and see which topics build on it.

## Features

- Ten subject-area maps: Differentiation, Integration, Trigonometry, Sequences & Series, Coordinate Geometry, Proof, Algebra & Functions, Vectors, Hypothesis Testing, and Infinity.
- Interactive graph visualisation using React Flow.
- Searchable topic list and selectable topic nodes.
- Focus and Full map views.
- Topic detail panel showing summary, specification reference, prerequisites, and topics that depend on the selected topic.
- Optional links from selected topics to related learning applications.
- Circular-dependency detection and warning.

## Technology

- React 19
- TypeScript 5.9
- Vite 8 beta
- React Flow 11
- Tailwind CSS 3 and PostCSS

## Getting started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal (normally `http://localhost:5173`).

## Useful commands

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

The production build is written to `dist/`.

## Documentation

See [`docs/USER-GUIDE.md`](docs/USER-GUIDE.md) for using the maps, [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for implementation details, and [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for development instructions.

Deployment details that could not be confirmed from the supplied source archive are recorded in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) and [`docs/OPEN-QUESTIONS.md`](docs/OPEN-QUESTIONS.md).

## Project structure

```text
topic-map-react/
├── public/
├── src/
│   ├── components/
│   │   └── TopicMap.tsx
│   ├── data/                 # One TypeScript data file per map
│   ├── types/
│   │   └── Topic.ts
│   ├── App.tsx               # Map navigation and page selection
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── ...
```

## Current scope

This documentation describes the source archive supplied for review. It does not assume that the checked-in source is identical to any currently deployed version. Verify deployment settings and external integrations before making production changes.
