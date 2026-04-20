# 🌶️ ChiliCheck — Spicy IP & Browser Fingerprint Tool

ChiliCheck reveals your public IP address, hostname, ISP/provider and browser fingerprint — then grades your uniqueness on the **Scoville scale**, from mild Bell Pepper 🫑 to the dreaded Carolina Reaper 💀🔥.

> **Live app:** <https://drpepper.lovable.app>

## Features

- 🌐 **IP & Network lookup** — public IP, hostname, ASN, ISP/org, city, region & country via [ipapi.co](https://ipapi.co).
- 🧠 **Browser fingerprint** — stable visitor ID generated client-side with [FingerprintJS](https://github.com/nicely/fingerprintjs) (open-source).
- 🌶️ **Pepper Score** — your fingerprint uniqueness mapped to a chili pepper grade with Scoville ratings.
- 📜 **Raw browser info** — user-agent, screen, viewport, timezone, language and more.
- 🔍 **Any-IP lookup** — enter any IP address to inspect its network details.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TanStack Start v1 (file-based routing, SSR) |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 with OKLCH design tokens |
| Components | shadcn/ui (Button, Card, Badge, Input, Textarea) |
| Fingerprinting | FingerprintJS open-source (client-side only) |
| IP Geolocation | ipapi.co public REST API |
| Hosting | Cloudflare Workers (edge runtime) |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build
```

## Privacy & Security

ChiliCheck is a **client-side application** with no backend database, no user accounts, and no tracking.

- See [DATA_PRIVACY.md](./DATA_PRIVACY.md) for the full privacy policy.
- See [DATA_SECURITY.md](./DATA_SECURITY.md) for security details.

## License

MIT — see [LICENSES.md](./LICENSES.md) for a full list of open-source dependencies used.

## Links

- 🌶️ **Live app:** <https://drpepper.lovable.app>
- 📦 **GitHub:** <https://github.com/chiliconcarne-yes/drpepper>
