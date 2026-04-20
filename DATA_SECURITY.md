# 🛡️ Data Security — ChiliCheck

**Last updated:** 2026-04-20

## Architecture Overview

ChiliCheck is a **static, client-side web application** with no backend infrastructure. All computation happens in the user's browser.

```
┌─────────────┐     HTTPS      ┌──────────────┐
│  Your        │ ──────────────▸│  Cloudflare   │
│  Browser     │ ◂──────────────│  Workers      │
│              │                │  (static CDN) │
└──────┬───────┘                └──────────────┘
       │
       │ HTTPS (read-only)
       ▼
┌──────────────┐
│  ipapi.co    │
│  (geolocation│
│   API)       │
└──────────────┘
```

## Security Measures

### Transport Security

- ✅ **HTTPS everywhere** — all communication is encrypted in transit using TLS.
- ✅ The application is served over HTTPS via Cloudflare's edge network with automatic certificate management.
- ✅ The ipapi.co API is accessed exclusively over HTTPS.

### No Backend Attack Surface

- ✅ **No server-side code** — there is no backend to compromise.
- ✅ **No database** — no SQL injection, no data breaches, no leaked credentials.
- ✅ **No user accounts** — no passwords to leak, no authentication tokens to steal.
- ✅ **No API keys** — the ipapi.co API is used without authentication (public tier).
- ✅ **No file uploads** — no path traversal or malicious file risks.

### Client-Side Security

- ✅ **FingerprintJS runs locally** — the open-source library generates a visitor ID entirely in the browser. No fingerprint data is transmitted to any server.
- ✅ **No eval() or dynamic code execution** — the application does not evaluate user-supplied code.
- ✅ **Content Security Policy** — served with appropriate CSP headers via Cloudflare Workers.

### Hosting Security

- ✅ **Cloudflare Workers** — the app runs on Cloudflare's hardened edge runtime with built-in DDoS protection, WAF, and bot management.
- ✅ **Immutable deployments** — each deployment is a static bundle; there is no mutable server state.

### Supply Chain

- ✅ **Minimal dependencies** — the app uses a small, well-known set of open-source libraries (React, TanStack, Tailwind, FingerprintJS, shadcn/ui).
- ✅ **Source code is public** — the full source is available at [github.com/chiliconcarne-yes/drpepper](https://github.com/chiliconcarne-yes/drpepper) for audit.

## Threat Model

| Threat | Mitigation |
|--------|-----------|
| Data breach | No data stored — nothing to breach |
| Man-in-the-middle | HTTPS/TLS on all connections |
| XSS | React's built-in escaping; no dangerouslySetInnerHTML |
| CSRF | No state-changing server endpoints |
| Credential theft | No credentials exist |
| Supply chain attack | Minimal deps, public source, lockfile pinning |

## Responsible Disclosure

If you discover a security issue, please open a private security advisory on the [GitHub repository](https://github.com/chiliconcarne-yes/drpepper).

## Contact

For security questions, open an issue on [GitHub](https://github.com/chiliconcarne-yes/drpepper).
