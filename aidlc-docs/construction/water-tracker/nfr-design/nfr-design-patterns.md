# NFR Design Patterns — Water Intake Tracker

## SECURITY-04: HTTP Security Headers (via vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```
Note: `style-src 'unsafe-inline'` required because React's inline `style={{}}` prop generates inline CSS at runtime.

## SECURITY-05: Input Validation Pattern
- Centralised in `intakeUtils.ts#validateAmount()`
- All user inputs (goal, custom amount) pass through this function before dispatch
- Rejects: non-numeric, negative, zero, > 5000
- Displays generic Ukrainian error message on failure

## SECURITY-09: Error Handling Pattern
- `ErrorBoundary` class component wraps entire app
- Catches all unhandled React render errors
- Shows generic fallback UI (no stack trace, no internal details)
- localStorage operations wrapped in try/catch; corrupt data silently resets

## SECURITY-10: Supply Chain Pattern
- `package-lock.json` committed to version control
- All dependencies use `^` semver with lock file pinning exact versions
- `npm audit` run as part of CI/build verification

## SECURITY-15: Exception Handling Pattern
- All localStorage calls in try/catch (storageService.ts)
- Global React ErrorBoundary catches render exceptions
- No async operations → no unhandled Promise rejections possible
- Error messages displayed to user are always generic
