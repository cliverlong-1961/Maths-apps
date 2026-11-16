# Open Questions

These items require inspection of the wider repository, hosting account, or deployed application. They have deliberately not been guessed from the source archive.

## Deployment and repository

- What is the Git remote URL for this local project?
- Which branch is used for development and which branch is deployed?
- Is the application deployed through Vercel, GitHub Pages, another host, or a manual process?
- What is the production URL?
- Is there a GitHub Actions workflow or Vercel project configuration outside the supplied ZIP?
- Does the hosting provider build from source, or is `dist/` published separately?
- Are there hosting environment variables or custom build settings?

## Feedback integration

- Where are `Feedback_code/firebase-config.js` and `Feedback_code/feedback-widget.js` maintained?
- Are these files deployed as a sibling directory to the application?
- Does the relative path `../Feedback_code/` resolve correctly in production?
- Which Firebase project and Realtime Database are used?
- What data is collected by the feedback widget, and what access/security rules apply?

## Topic data and curriculum

- Are the ten subject maps intended to cover a particular examination board or a common A-Level curriculum?
- Are `specRef` values consistently tied to a named specification?
- Should dependency relationships represent strict prerequisites, recommended prior knowledge, or broader conceptual links?
- Should Focus mode include only direct prerequisites/successors (as currently implemented), or all transitive dependencies?
- Should topic data be validated automatically for duplicate IDs and missing prerequisite references?

## User experience

- Should the map support mobile/small-screen layouts? The current map has a fixed 640px height and fixed-width side panels.
- Should there be a visible legend explaining node colours and edge direction?
- Should the user be able to clear a topic selection without closing the detail panel?
- Should topic data be editable outside TypeScript source files?

## Known source observations to review

- `TopicMapProps` declares a `title` property, but the component implementation shown in the supplied source does not use it.
- The cycle detector stops after finding a cycle; it is sufficient to trigger the warning but does not enumerate every cycle.
- `getLevel` has a recursion guard for cycles, while the warning is displayed separately.
- The graph filters unknown prerequisite IDs when drawing edges; there is no separate explicit data-validation report.
- `index.html` references the default Vite favicon and includes Firebase/feedback scripts. Confirm whether these are intentional for the deployed product.
- `src/App.css` contains default Vite starter styles; the main application styling is primarily inline.
