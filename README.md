# Munchies — Umain Work Test

A restaurant browser built with React, TypeScript, and Vite as part of the Umain frontend work test.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Tech stack

| Tool | Version |
|---|---|
| React | 19.x |
| TypeScript | 5.x |
| Vite | 6.x |
| Tailwind CSS | 4.x |
| React Router DOM | 7.x |

## Project structure

```
src/
├── api/          # All fetch calls in one place
├── types/        # TypeScript interfaces mirroring API response shapes
├── components/   # Stateless, reusable UI components
├── pages/        # Stateful views — own data fetching and state
└── App.tsx       # Routing only
```

## Notes

- **Fonts** — the design uses SF Pro (Apple's system font). Font files are included in `public/fonts/`. On Apple devices the system font serves as a natural fallback even without the local files.
- **API** — all requests hit `https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api`. No environment variables are needed.
- **Error handling** — critical fetches (restaurants, filters) surface a full-page error with a retry button. Per-restaurant secondary requests (open status, price range) use `Promise.allSettled` and degrade gracefully rather than blocking the UI.
