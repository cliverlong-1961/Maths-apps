# Development Guide

## Prerequisites

Install a current Node.js release with npm. The supplied project uses:
- React 19
- TypeScript ~5.9.3
- Vite 8 beta (`^8.0.0-beta.13`)
- React Flow 11.11
- Tailwind CSS 3.4

The exact installed versions are recorded in `package-lock.json`. Use the lockfile when installing dependencies.

## Open the project

In PowerShell:

```powershell
cd C:\Users\clive\Dev\maths-apps\topic-map-react
```

Open this folder in VSCodium if it is not already open.

## Install dependencies

```powershell
npm install
```

## Run locally

```powershell
npm run dev
```

Vite displays the local address in the terminal, normally `http://localhost:5173`. Open that address in a browser. Keep the terminal open while testing; stop the server with `Ctrl+C`.

## Production build

Run:

```powershell
npm run build
```

The script first runs the TypeScript project build (`tsc -b`) and then `vite build`. Generated production files are written to `dist/`.

To test the production build locally:

```powershell
npm run preview
```

Vite prints the preview address in the terminal.

## Lint

```powershell
npm run lint
```

Resolve reported lint errors before committing changes where practical.

## Adding or editing topics

Each subject map has a corresponding file under `src/data/`. For example, differentiation topics are in `src/data/differentiation.ts`.

A topic follows this shape:

```ts
{
  id: "power-rule",
  title: "Power Rule",
  summary: "Differentiate xⁿ using d/dx(xⁿ)=nxⁿ⁻¹.",
  specRef: "3.6.1",
  dependsOn: ["derivative-definition"],
}
```

The `summary`, `specRef`, and `url` fields are optional. `id`, `title`, and `dependsOn` are required.

When editing topic data:

1. Give each topic a stable ID that is unique within that subject map.
2. Use the exact IDs of prerequisite topics in `dependsOn`.
3. Check that every referenced prerequisite ID exists in the same map.
4. Ensure the dependency direction is correct: `dependsOn` lists prerequisites, not successors.
5. Add a useful summary and specification reference where appropriate.
6. Add a URL only when a corresponding learning resource exists and the link is correct.
7. Check the map in both Focus and Full map modes.
8. Watch for the circular-dependency warning.

The current implementation filters unknown prerequisite IDs when constructing graph edges, but invalid references can still lead to misleading dependency information. Do not rely on this filtering as validation.

## Adding a new subject map

1. Create a new data file under `src/data/`, exporting a `Topic[]`.
2. Import that array in `src/App.tsx`.
3. Add a page entry to the `pages` array with a new unique numeric ID, navigation label, topic array, and page title.
4. Run `npm run build` and `npm run lint`.
5. Test navigation, search, node selection, detail information, Focus mode, Full map mode, and any topic links.

## Feedback widget integration

`index.html` includes Firebase CDN scripts and relative references to `../Feedback_code/firebase-config.js` and `../Feedback_code/feedback-widget.js`. Those files are not in the supplied project ZIP. Preserve the expected hosting arrangement or update the paths and integration deliberately. Confirm that the feedback widget works in both local development and the deployed site.

## Git workflow

Before committing:

```powershell
git status
npm run build
npm run lint
```

Stage only intended files, inspect the staged changes, then commit and push to the intended branch. Confirm the repository's actual remote and branch rather than assuming them.
