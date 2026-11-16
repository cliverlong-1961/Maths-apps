# Troubleshooting

## Dependencies fail to install

From the project directory run:

```powershell
npm install
```

If dependency installation continues to fail, capture the complete error and check the Node.js and npm versions:

```powershell
node --version
npm --version
```

The project currently specifies Vite 8 beta. Do not upgrade or downgrade Vite as a first troubleshooting step; first establish the exact error.

## Development server does not start

Run:

```powershell
npm run dev
```

Check the terminal for the reported error and port. If the default port is already occupied, Vite may offer another port; use the URL it prints.

## Build fails

Run:

```powershell
npm run build
```

This executes TypeScript project compilation followed by the Vite production build. Read the first TypeScript or Vite error and correct the underlying source/configuration issue before attempting deployment.

## A topic or dependency is missing

Check the relevant `src/data/*.ts` file:
- Confirm the topic record exists.
- Confirm the `id` is spelled consistently.
- Confirm each ID in `dependsOn` exists in the same subject map.
- Confirm the topic is included in the relevant exported array.
- Confirm the subject data array is imported and registered in `src/App.tsx`.

The graph silently filters prerequisite IDs that are not in the current topic list when creating edges. A misspelled ID may therefore result in a missing edge rather than an obvious error.

## Circular dependency warning

The warning means the dependency data contains a cycle. Review the `dependsOn` entries in the relevant data file. Follow the dependency chain and remove or correct the relationship that makes a topic depend, directly or indirectly, on itself.

The detector reports a warning; it does not repair the data.

## Topic details or links do not appear

The detail panel only renders optional summary, specification reference, and URL fields when those values exist in the selected topic record. Add or correct the appropriate field in the relevant data file.

If **Start this topic** is shown but the link fails, verify the `url` value and whether the target application is available.

## Focus view appears to omit topics

Focus mode intentionally shows only the selected topic, its direct prerequisites, and its direct successors. It does not show all transitive prerequisites or all downstream topics. Use **Full map** to display the entire subject map.

## Feedback widget does not load

Inspect browser developer tools and network requests for:
- Firebase CDN script failures;
- missing `../Feedback_code/firebase-config.js`;
- missing `../Feedback_code/feedback-widget.js`;
- Firebase configuration or permission errors.

The feedback files are not present in the supplied source archive. Check the wider site/repository layout and deployed relative paths.

## Production site has missing assets

Check whether the site is hosted at the domain root or under a subdirectory. The current Vite configuration has no explicit `base` setting and `index.html` uses `/vite.svg`. Confirm the hosting path and adjust Vite configuration and asset references only after establishing the correct deployment target.
