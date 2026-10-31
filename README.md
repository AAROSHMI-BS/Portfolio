<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/48bc0756-bdb8-4306-8b22-1d3326d6235c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Visitor analytics

The dashboard records total visits, browser-defined unique visitors, location,
device, traffic source, and an optional display name. It does not include demo
visitor data.

Names are collected only when explicitly supplied through a URL parameter:
`?visitor=Full%20Name` (also supported: `?visitor_name=Full%20Name`).

Without a backend, data is stored in the current browser. To share analytics
across devices and browsers, set `VITE_VISITOR_TRACKER_ENDPOINT` to an API that
supports `GET` and `POST` and persists the `VisitorAnalyticsData` JSON payload.
GitHub Pages can host the frontend, but cannot persist visitor data by itself.
