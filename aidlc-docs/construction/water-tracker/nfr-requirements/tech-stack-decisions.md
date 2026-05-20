# Tech Stack Decisions — Water Intake Tracker

| Category | Decision | Rationale |
|---|---|---|
| Framework | React 19 + TypeScript | Industry standard; type safety; latest stable |
| Build Tool | Vite 6 | Fast HMR; native ESM; first-class TS support |
| Styling | Tailwind CSS v4 | Utility-first; zero-config with `@tailwindcss/vite`; modern UI |
| State Management | React Context + useReducer | No external deps; appropriate for single-page SPA |
| Storage | localStorage (browser) | No server required; synchronous; sufficient for personal data |
| Testing | Vitest + Testing Library | Vite-native; fast; compatible with JSDOM |
| Package Manager | npm | Standard; lock file committed (package-lock.json) |
| Linting | ESLint 9 flat config + typescript-eslint | Current standard |
| Deployment Config | vercel.json | Static hosting with security headers |
