# Build Instructions — Water Intake Tracker

## Prerequisites
- **Node.js**: 20+ (LTS recommended)
- **npm**: 10+
- **OS**: macOS, Linux, or Windows

## Build Steps

### 1. Install Dependencies
```bash
cd /path/to/aidlc-vibecoder
npm install
```
Installs all dependencies and generates `package-lock.json`.

### 2. TypeScript Check + Production Build
```bash
npm run build
```
Runs `tsc -b` (full TypeScript check) followed by `vite build`.

**Expected Output**:
```
vite v6.x building for production...
✓ N modules transformed.
dist/index.html           ~0.5 kB
dist/assets/index-*.css   ~24 kB (gzip ~5 kB)
dist/assets/index-*.js    ~207 kB (gzip ~65 kB)
✓ built in ~700ms
```

**Build Artifacts**: `dist/` directory (static files for deployment)

### 3. Preview Production Build
```bash
npm run preview
```
Serves `dist/` locally at `http://localhost:4173` for manual verification.

### 4. Lint Check
```bash
npm run lint
```
Runs ESLint with TypeScript rules. Must pass with zero errors before deployment.

## Deployment

Deploy the `dist/` folder to any static host:
- **Vercel**: `vercel deploy` — security headers automatically applied from `vercel.json`
- **Netlify**: drag-and-drop `dist/` or `netlify deploy --dir=dist`
- **GitHub Pages**: push `dist/` contents to `gh-pages` branch (add `_headers` file manually for security headers)

## Security Headers (Production)
Configured in `vercel.json`. Verify after deployment:
```bash
curl -I https://your-domain.com | grep -E 'Content-Security|X-Frame|X-Content|Strict-Transport|Referrer'
```
