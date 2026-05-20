# Requirements Document — Water Intake Tracker

## Intent Analysis

| Field | Value |
|---|---|
| **User Request** | Create a React web app for tracking daily water intake with daily goal setting, preset and custom portions, multi-day history, and localStorage persistence |
| **Request Type** | New Project (Greenfield) |
| **Scope Estimate** | Single Component — standalone single-page application |
| **Complexity Estimate** | Simple — clear implementation path, well-understood domain |
| **Requirements Depth** | Standard |

---

## Functional Requirements

### FR-01: Daily Goal Management
- The user MUST be able to set a daily water intake goal (default: 2000 ml)
- The goal MUST persist in localStorage across browser sessions
- The user MUST be able to change the goal at any time
- The goal MUST be a positive integer value in millilitres (ml)

### FR-02: Water Intake Logging — Preset Portions
- The user MUST be able to add water via a preset "Glass" button (250 ml)
- The user MUST be able to add water via a preset "Bottle" button (500 ml)
- Each button tap MUST immediately update the day's total

### FR-03: Water Intake Logging — Custom Portion
- The user MUST be able to enter a custom amount in ml via a numeric input field
- The custom amount MUST be a positive integer
- Input MUST be validated: no negative values, no zero, no non-numeric input
- The user MUST confirm the custom amount via a button ("Add" or equivalent)

### FR-04: Daily Progress Display
- The current day's total intake (in ml) MUST be displayed
- The daily goal (in ml) MUST be displayed alongside the current intake
- A progress bar MUST be displayed showing current intake as a percentage of the daily goal
- The percentage completion MUST be displayed numerically alongside the progress bar
- The progress bar MUST visually fill/animate as intake increases
- When the daily goal is reached or exceeded, a visual celebration/completion state MUST be shown

### FR-05: Automatic Daily Reset
- At midnight (local browser time), the current day's counter MUST reset to 0 ml
- The reset MUST be handled automatically when the app is opened on a new day
- The previous day's data MUST be saved to history before the reset occurs

### FR-06: Multi-Day History
- The app MUST display a history of daily intake for at least the past 7 days
- The app MUST support viewing the past 30 days
- Each history entry MUST show: date, total intake (ml), daily goal, and percentage achieved
- The history view MUST indicate whether the daily goal was met for each day

### FR-07: Data Persistence
- All data (current day intake, daily goal, history) MUST be stored in localStorage
- Data MUST persist between browser sessions and page reloads
- Data MUST NOT require any server or backend

---

## Non-Functional Requirements

### NFR-01: Technology Stack
- **Framework**: React (with Vite as the build tool)
- **Language**: JavaScript (JSX) or TypeScript
- **Styling**: CSS modules, Tailwind CSS, or styled-components — modern, responsive UI
- **Storage**: localStorage (browser-native, no external dependencies)
- **Package Manager**: npm with lock file committed (package-lock.json)

### NFR-02: UI / UX
- The UI MUST be modern and visually appealing — use gradients, colours, and subtle animations
- The UI MUST be responsive (mobile-first, works on desktop and smartphone)
- The progress bar MUST animate smoothly when intake is added
- The layout MUST be clean and intuitive — primary action (add water) prominently visible

### NFR-03: Performance
- The app MUST load in under 2 seconds on a modern browser
- All interactions (adding water, viewing history) MUST be instantaneous (no async operations needed)
- localStorage reads/writes MUST be synchronous and complete without noticeable delay

### NFR-04: Reliability
- The app MUST gracefully handle corrupted or missing localStorage data (fall back to defaults)
- Auto-reset logic MUST correctly handle the case when the user opens the app after multiple days of absence (backfill missing days with zero intake)

### NFR-05: Browser Compatibility
- MUST support the latest two versions of Chrome, Firefox, Safari, and Edge

---

## Security Requirements (Security Baseline — ENABLED)

### SEC-FR-01 (SECURITY-04): HTTP Security Headers
- The production build MUST be served with the following HTTP response headers:
  - `Content-Security-Policy: default-src 'self'`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- These headers MUST be configured in the Vite build / hosting configuration (e.g., `vercel.json`, `netlify.toml`, or equivalent)

### SEC-FR-02 (SECURITY-05): Input Validation
- All user inputs (custom ml amount, daily goal) MUST be validated before processing:
  - Type: must be a positive integer
  - Bounds: must be between 1 ml and 5000 ml (reasonable upper limit)
  - No script injection via text inputs (sanitize / reject HTML)
- Invalid inputs MUST display a user-friendly error message; no internal details exposed

### SEC-FR-03 (SECURITY-09): Error Handling & Hardening
- No stack traces, internal paths, or technical details MUST be shown to the user
- All errors caught in try/catch MUST display generic user-facing messages
- localStorage parse errors (corrupted JSON) MUST be caught and reset to defaults silently

### SEC-FR-04 (SECURITY-10): Supply Chain Security
- `package-lock.json` MUST be committed to version control
- All dependencies MUST use exact or pinned version ranges
- No unused dependencies are to be included

### SEC-FR-05 (SECURITY-13): External Resource Integrity
- Any scripts or stylesheets loaded from external CDNs MUST include Subresource Integrity (SRI) hashes
- Preference: use npm-bundled packages (no external CDN links) to avoid this requirement entirely

### SEC-FR-06 (SECURITY-15): Exception Handling
- All localStorage operations MUST be wrapped in try/catch
- The application MUST have a React Error Boundary as a top-level global error handler
- Error boundaries MUST display a safe, generic fallback UI — no technical details
- No unhandled Promise rejections in production code

---

## Security Rules — N/A Assessment

| Rule | Status | Rationale |
|---|---|---|
| SECURITY-01 (Encryption at Rest/Transit) | N/A | localStorage is browser-managed; no server-side data stores |
| SECURITY-02 (Network Intermediaries) | N/A | No load balancers, API gateways, or CDN configured by the app |
| SECURITY-03 (Application Logging) | N/A | Client-only SPA; no server-side logging infrastructure applicable |
| SECURITY-06 (Least-Privilege IAM) | N/A | No IAM roles or cloud resources |
| SECURITY-07 (Network Configuration) | N/A | No server infrastructure |
| SECURITY-08 (Application Access Control) | N/A | No authentication required — single-user local app |
| SECURITY-11 (Secure Design / Rate Limiting) | Partially N/A | Rate limiting N/A (no API endpoints); input validation enforced via SEC-FR-02 |
| SECURITY-12 (Authentication) | N/A | No user authentication required |
| SECURITY-14 (Alerting / Monitoring) | N/A | Local single-user app; no cloud logging infrastructure |

---

## Out of Scope

- User accounts / authentication
- Backend server or API
- Push notifications / reminders
- PWA / offline support (beyond normal SPA caching)
- Export/import of data

---

## Acceptance Criteria Summary

1. User can set and change a daily water intake goal
2. User can add water via 250 ml / 500 ml preset buttons and a custom ml input
3. A progress bar and percentage show real-time progress toward the daily goal
4. Data persists in localStorage across sessions
5. Counter resets automatically at midnight; previous day saved to history
6. History view shows at least 7 days of past intake data
7. All user inputs are validated (type, bounds, sanitisation)
8. Application handles corrupted localStorage gracefully
9. React Error Boundary provides safe fallback on unexpected errors
10. HTTP security headers configured for production deployment
