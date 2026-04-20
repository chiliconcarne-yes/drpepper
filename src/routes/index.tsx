import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import pepperMascot from "@/assets/pepper-mascot.png";
import chiliBanner from "@/assets/chili-banner.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ChiliCheck 🌶️ — Spicy IP & Fingerprint Lookup" },
      { name: "description", content: "Find your IP, host, provider and browser fingerprint with a spicy chili con carne twist." },
    ],
  }),
});

type IpInfo = {
  ip: string;
  hostname?: string;
  org?: string;
  city?: string;
  region?: string;
  country_name?: string;
  asn?: string;
};

const PEPPERS = [
  { name: "Bell Pepper", emoji: "🫑", desc: "Mild & common — you blend right in!", scoville: "0 SHU" },
  { name: "Banana Pepper", emoji: "🌶️", desc: "A little zing, mostly mellow.", scoville: "500 SHU" },
  { name: "Poblano", emoji: "🌶️", desc: "Smoky & approachable.", scoville: "1k SHU" },
  { name: "Jalapeño", emoji: "🌶️", desc: "Classic kick — a recognizable browser.", scoville: "5k SHU" },
  { name: "Serrano", emoji: "🌶️", desc: "Sharper than average. Memorable!", scoville: "20k SHU" },
  { name: "Cayenne", emoji: "🔥", desc: "Hot stuff — fairly unique fingerprint.", scoville: "50k SHU" },
  { name: "Habanero", emoji: "🔥", desc: "Burning bright — quite identifiable.", scoville: "200k SHU" },
  { name: "Ghost Pepper", emoji: "👻🔥", desc: "Spooky unique. Trackers love you.", scoville: "1M SHU" },
  { name: "Carolina Reaper", emoji: "💀🔥", desc: "ONE OF A KIND. Maximum heat & uniqueness!", scoville: "2.2M SHU" },
];

function pepperFromHash(hash: string) {
  let sum = 0;
  for (let i = 0; i < hash.length; i++) sum += hash.charCodeAt(i);
  const idx = sum % PEPPERS.length;
  const score = (sum % 1000) / 10; // 0-99.9
  return { ...PEPPERS[idx], score: Math.min(99.9, 50 + score / 2) };
}

function Index() {
  const [ipInput, setIpInput] = useState("");
  const [info, setInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fingerprint, setFingerprint] = useState<string>("");
  const [pepper, setPepper] = useState<ReturnType<typeof pepperFromHash> | null>(null);
  const [userAgent, setUserAgent] = useState("");

  const fetchInfo = useCallback(async (ip?: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = ip ? `https://ipapi.co/${ip}/json/` : `https://ipapi.co/json/`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) throw new Error(data.reason || "Lookup failed");
      setInfo({
        ip: data.ip,
        hostname: data.hostname,
        org: data.org,
        city: data.city,
        region: data.region,
        country_name: data.country_name,
        asn: data.asn,
      });
      if (!ip) setIpInput(data.ip);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfo();
    const ua = `User-Agent: ${navigator.userAgent}\nPlatform: ${navigator.platform}\nLanguage: ${navigator.language}\nLanguages: ${navigator.languages?.join(", ")}\nScreen: ${screen.width}x${screen.height} @ ${window.devicePixelRatio}x\nViewport: ${innerWidth}x${innerHeight}\nTimezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\nCookies enabled: ${navigator.cookieEnabled}\nHardware concurrency: ${navigator.hardwareConcurrency}\nColor depth: ${screen.colorDepth}-bit`;
    setUserAgent(ua);

    FingerprintJS.load().then((fp) => fp.get()).then((r) => {
      setFingerprint(r.visitorId);
      setPepper(pepperFromHash(r.visitorId));
    });
  }, [fetchInfo]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Banner background */}
      <div
        className="absolute inset-0 opacity-20 bg-repeat"
        style={{ backgroundImage: `url(${chiliBanner})`, backgroundSize: "600px" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" aria-hidden />

      <main className="relative z-10 container mx-auto px-4 py-10 max-w-4xl">
        {/* Hero */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-5xl animate-flame inline-block">🔥</span>
            <img
              src={pepperMascot}
              alt="Chili pepper mascot"
              width={120}
              height={120}
              className="animate-float drop-shadow-2xl"
            />
            <span className="text-5xl animate-flame inline-block" style={{ animationDelay: "0.4s" }}>🔥</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-spicy)" }}>
            ChiliCheck 🌶️
          </h1>
          <p className="mt-3 text-lg text-muted-foreground font-medium">
            Sniff out your IP, network, and browser uniqueness — served with extra <span className="text-primary font-bold">picante</span>!
          </p>
        </header>

        {/* IP lookup card */}
        <Card className="p-6 mb-6 border-2 shadow-[var(--shadow-spicy)]" style={{ borderColor: "oklch(0.7 0.25 35 / 0.3)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌮</span>
            <h2 className="text-2xl font-bold">IP Lookup</h2>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); fetchInfo(ipInput || undefined); }}
            className="flex flex-col sm:flex-row gap-3 mb-5"
          >
            <Input
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="Enter any IP, e.g. 8.8.8.8"
              className="text-base h-12 border-2"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-6 font-bold text-base shadow-md"
              style={{ backgroundImage: "var(--gradient-spicy)" }}
            >
              {loading ? "🌶️ Cooking..." : "🔥 Spice it up!"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => { setIpInput(""); fetchInfo(); }}
              className="h-12 border-2"
            >
              📍 My IP
            </Button>
          </form>

          {error && <p className="text-destructive font-semibold">😵‍💫 {error}</p>}

          {info && !error && (
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="IP Address" value={info.ip} icon="🌐" />
              <Field label="Hostname" value={info.hostname || "—"} icon="🏠" />
              <Field label="Provider / Org" value={info.org || "—"} icon="🏢" />
              <Field label="ASN" value={info.asn || "—"} icon="🔢" />
              <Field label="City" value={info.city || "—"} icon="🌆" />
              <Field label="Country" value={`${info.country_name || "—"}${info.region ? ` (${info.region})` : ""}`} icon="🌎" />
            </div>
          )}
        </Card>

        {/* Fingerprint card */}
        <Card className="p-6 mb-6 border-2 shadow-[var(--shadow-spicy)]" style={{ borderColor: "oklch(0.7 0.22 140 / 0.3)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🫑</span>
            <h2 className="text-2xl font-bold">Pepper Uniqueness Score</h2>
          </div>
          {pepper ? (
            <div className="text-center py-4">
              <div className="text-7xl mb-3 animate-wiggle inline-block">{pepper.emoji}</div>
              <h3 className="text-3xl font-black text-primary">{pepper.name}</h3>
              <p className="text-muted-foreground mt-1 italic">"{pepper.desc}"</p>
              <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                <Badge className="text-base px-4 py-1" style={{ backgroundImage: "var(--gradient-spicy)" }}>
                  Heat: {pepper.scoville}
                </Badge>
                <Badge variant="secondary" className="text-base px-4 py-1">
                  Uniqueness: {pepper.score.toFixed(1)}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-4 font-mono break-all">
                fingerprint: {fingerprint}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">🌶️ Tasting your fingerprint...</p>
          )}
        </Card>

        {/* Raw browser info */}
        <Card className="p-6 mb-6 border-2 shadow-[var(--shadow-spicy)]" style={{ borderColor: "oklch(0.85 0.18 70 / 0.5)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📜</span>
            <h2 className="text-2xl font-bold">Raw Browser Salsa</h2>
          </div>
          <Textarea
            value={userAgent}
            readOnly
            className="font-mono text-xs h-56 border-2 resize-none"
          />
        </Card>

        <footer className="text-center text-sm text-muted-foreground mt-8">
          Made with 🌶️, 🧀 and a dash of 🔥 — no beans were harmed.
        </footer>
      </main>
    </div>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-muted/60 rounded-xl p-3 border border-border">
      <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold flex items-center gap-1">
        <span>{icon}</span> {label}
      </div>
      <div className="font-mono text-sm font-semibold mt-1 break-all">{value}</div>
    </div>
  );
}
