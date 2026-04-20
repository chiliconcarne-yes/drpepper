import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import pepperMascot from "@/assets/pepper-mascot.png";
import chiliBanner from "@/assets/chili-banner.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "ChiliCheck 🌶️ — Spicy IP & Browser Fingerprint Tool" },
      { name: "description", content: "ChiliCheck reveals your IP, host, provider and browser fingerprint — served with a chili con carne twist. Privacy-first, runs in your browser." },
      { property: "og:title", content: "ChiliCheck 🌶️ — Spicy IP & Browser Fingerprint Tool" },
      { property: "og:description", content: "Find out how spicy (unique) your browser fingerprint really is." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d4679f3c-ce07-4010-b9bc-441fd4b67bad/id-preview-bed3db96--b6e69cd6-b32c-4266-aed6-c1dd4a02da84.lovable.app-1776707827764.png" },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={pepperMascot} alt="Pepper mascot" className="h-9 w-9 animate-wiggle" />
            <span className="font-extrabold text-lg tracking-tight">ChiliCheck</span>
          </div>
          <Link to="/app">
            <Button size="sm" className="shadow-[var(--shadow-spicy)]">Open the app 🌶️</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: `url(${chiliBanner})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-warm)", opacity: 0.55 }} aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">🔥 Hot & Fresh</Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            How <span style={{ background: "var(--gradient-spicy)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>spicy</span> is your browser?
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            ChiliCheck reveals your IP, host, provider and browser fingerprint — and grades your uniqueness on the Scoville scale, from mild Bell Pepper to the dreaded Carolina Reaper.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/app">
              <Button size="lg" className="text-lg px-8 py-6 h-auto shadow-[var(--shadow-spicy)] animate-float">
                🌶️ Launch ChiliCheck →
              </Button>
            </Link>
          </div>
          <img src={pepperMascot} alt="" className="mx-auto mt-10 h-32 w-32 animate-flame" aria-hidden />
        </div>
      </section>

      {/* What it does */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-center">What ChiliCheck cooks up 🍲</h2>
        <p className="text-center text-muted-foreground mt-2">Three ingredients, one spicy result.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            { e: "🌐", t: "IP & Network", d: "See your public IP, hostname, ISP/ASN, city, region and country." },
            { e: "🧠", t: "Browser Fingerprint", d: "A stable visitor ID derived from dozens of browser signals." },
            { e: "🌶️", t: "Pepper Score", d: "Your uniqueness mapped to a pepper — from Bell to Carolina Reaper." },
          ].map((c) => (
            <Card key={c.t} className="p-6 border-2 hover:shadow-[var(--shadow-spicy)] transition-shadow">
              <div className="text-4xl">{c.e}</div>
              <h3 className="mt-3 font-bold text-lg">{c.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech */}
      <section className="bg-muted/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-black text-center">The recipe 👨‍🍳 — tech & methods</h2>
          <p className="text-center text-muted-foreground mt-2">What's simmering under the hood.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { t: "React 19 + TanStack Start", d: "File-based routing, SSR-ready, type-safe links via TanStack Router." },
              { t: "Vite 7 build", d: "Lightning-fast dev server and optimized production bundles." },
              { t: "Tailwind CSS v4", d: "Theme-driven design tokens in OKLCH for a juicy, consistent palette." },
              { t: "shadcn/ui components", d: "Accessible Button, Card, Input, Textarea and Badge primitives." },
              { t: "FingerprintJS (open source)", d: "Generates a stable visitorId from browser signals — runs 100% client-side." },
              { t: "ipapi.co REST API", d: "Resolves IPs to hostname, ASN/org and geolocation via HTTPS." },
              { t: "React hooks", d: "useState / useEffect / useCallback drive lookup state and re-fetches." },
              { t: "Custom hash → pepper mapping", d: "A tiny deterministic function converts the fingerprint into a Scoville grade." },
            ].map((c) => (
              <Card key={c.t} className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌶️</span>
                  <div>
                    <h3 className="font-bold">{c.t}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Badge className="bg-accent text-accent-foreground">🛡️ Data Security</Badge>
            <h2 className="text-3xl font-black mt-3">Locked tighter than a jar of habaneros</h2>
            <p className="text-muted-foreground mt-3">
              ChiliCheck is a client-side app. Your fingerprint is computed in your browser and never sent to our servers — because we don't run any.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>✅ HTTPS everywhere — all API calls are encrypted in transit.</li>
              <li>✅ No backend database, no user accounts, no passwords to leak.</li>
              <li>✅ Fingerprint generation runs entirely in your browser via FingerprintJS open-source.</li>
              <li>✅ IP lookup uses a public read-only API (ipapi.co) — no write access, no tokens.</li>
              <li>✅ Static hosting on a hardened edge runtime (Cloudflare Workers).</li>
            </ul>
          </div>
          <Card className="p-6 bg-card border-2" style={{ boxShadow: "var(--shadow-glow)" }}>
            <h3 className="font-bold text-lg">🔐 What we never touch</h3>
            <p className="text-sm text-muted-foreground mt-2">
              No cookies for tracking. No third-party ad scripts. No analytics SDKs lurking in the salsa. Just code that loads, runs, and minds its own business.
            </p>
          </Card>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-muted/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="p-6 bg-card border-2">
              <h3 className="font-bold text-lg">🌶️ The honest truth</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Yes, ChiliCheck shows you how identifiable you are — that's the whole point. We use that knowledge to teach, not to track. Nothing you do here is logged or stored by us.
              </p>
            </Card>
            <div>
              <Badge className="bg-secondary text-secondary-foreground">🕵️ Data Privacy</Badge>
              <h2 className="text-3xl font-black mt-3">Your data stays in your kitchen</h2>
              <p className="text-muted-foreground mt-3">
                We believe privacy should be the default ingredient, not an upsell.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>🚫 No personal data collection — we don't ask for your name or email.</li>
                <li>🚫 No tracking cookies, no localStorage profiling, no cross-site identifiers.</li>
                <li>🚫 No data sold or shared with third parties.</li>
                <li>📡 Only outbound call: ipapi.co for IP geolocation (their privacy policy applies).</li>
                <li>🌍 GDPR-friendly by design: nothing to delete because nothing is stored.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black">Ready to taste the heat? 🔥</h2>
        <p className="mt-3 text-muted-foreground">Open the app and find your pepper grade in seconds.</p>
        <div className="mt-8">
          <Link to="/app">
            <Button
              size="lg"
              className="text-xl md:text-2xl px-10 py-8 h-auto shadow-[var(--shadow-spicy)] animate-float"
            >
              🌶️ Launch ChiliCheck App →
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
          Made with 🌶️ &amp; React. ChiliCheck is for fun and education — eat responsibly.
        </div>
      </footer>
    </div>
  );
}
