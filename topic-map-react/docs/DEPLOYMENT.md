# Deployment Guide

## What is confirmed

The supplied project is a Vite application. The production build is generated in `dist/` by:

```powershell
npm run build
```

The supplied `vite.config.ts` registers the React plugin and does not specify a custom `base` path. The `index.html` file references the app entry point and also loads external Firebase scripts and feedback-widget files.

## What is not confirmed

The supplied source archive does not include deployment workflows or hosting configuration sufficient to establish:
- the production hosting provider and project;
- the deployed site URL;
- which Git branch triggers deployment;
- whether deployment is automatic on push or manual;
- whether GitHub Actions, Vercel, or another service publishes `dist/`;
- environment variables or hosting-specific settings;
- the deployed location of the `Feedback_code` files.

Do not infer these details from the project name or from earlier deployments of other applications.

## Standard Vite build

From the project directory:

```powershell
npm install
npm run build
```

Check that the build completes successfully and that the `dist/` directory contains the generated site.

For a local production preview:

```powershell
npm run preview
```

## Hosting path and Vite base

Vite's default base is `/`. This is appropriate for a site hosted at the domain root. If the application is hosted under a subdirectory, the Vite `base` setting and any absolute asset paths may need to be configured for that subdirectory.

The current `index.html` contains a root-relative favicon path (`/vite.svg`) and the default Vite configuration has no explicit base. Confirm the intended hosting URL before changing these paths.

## Feedback widget assets

The page loads:
- Firebase App and Realtime Database compatibility scripts from `https://www.gstatic.com/firebasejs/9.23.0/`
- `../Feedback_code/firebase-config.js`
- `../Feedback_code/feedback-widget.js`

These relative paths must resolve in the deployed site. The feedback code is outside the supplied project archive, so deployment instructions for those files remain to be established.

## Deployment verification checklist

After the hosting mechanism is confirmed:

1. Verify the correct production branch and deployment trigger.
2. Confirm the build command is `npm run build`.
3. Confirm the publish/output directory is `dist`.
4. Confirm the site base path matches the public URL.
5. Confirm any required sibling `Feedback_code` assets are deployed at the expected relative path.
6. Open the production site and test all ten subject tabs.
7. Test topic search, node selection, prerequisite/successor chips, Focus and Full map modes.
8. Test topic links that have a `url`.
9. Test the feedback widget.
10. Check browser developer tools for missing assets, script errors, and failed network requests.

Update this document once the actual hosting configuration has been inspected.
