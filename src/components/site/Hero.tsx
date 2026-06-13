import { useState, useEffect } from "react";
import { PlayDialog } from "./PlayDialog";
import { Users } from "lucide-react";

const HERO_LOGO =
  "images/logo-full.png";
const HERO_BG =
  "images/fondo-fucsia.svg";

export function Hero() {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState<number | null>(null);

  useEffect(() => {
    // Placeholder live count — replace with real server query when available.
    const base = 120 + Math.floor(Math.random() * 80);
    setPlayers(base);
    const t = setInterval(() => {
      setPlayers((p) => {
        const cur = p ?? base;
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(0, cur + delta);
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-dvh flex items-center justify-center overflow-hidden">
      {/* Background video with image fallback */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_BG}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_BG}
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Place a real Hytale gameplay loop at /videos/hero.mp4 to enable */}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-navy)]/60 via-[var(--brand-purple-deep)]/55 to-[var(--brand-navy)]/85" />
      </div>

      <div className="relative z-10 container mx-auto px-5 text-center text-white pt-24 pb-16">
        <div className="relative mx-auto w-[80vmin] max-w-[920px]">
          {/* Rotating lights behind logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[120%] h-[120%] animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgba(70,202,255,0.4),rgba(168,85,247,0.4),rgba(236,72,153,0.3),rgba(70,202,255,0)_70%)]  blur-3xl opacity-70" />
            <div className="absolute w-[100%] h-[100%] animate-spin-slow-reverse rounded-full bg-[conic-gradient(from_180deg,rgba(168,85,247,0.3),rgba(70,202,255,0.3),rgba(34,211,238,0.2),rgba(168,85,247,0)_70%)] blur-2xl opacity-60" />
          </div>
          <img
            src={HERO_LOGO}
            alt="Overgy"
            className="relative z-10 w-full drop-shadow-[0_10px_40px_rgba(70,202,255,0.35)] animate-float-slow"
          />
        </div>

        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 font-medium">
          El servidor de Hytale donde la acción no para. Combate táctico, exploración
          sin límites y una comunidad que lo cambia todo cada semana.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="btn-chunky btn-chunky-cyan text-lg !px-10 !py-4"
          >
            ¡Juega ahora!
          </button>
          <a
            href="https://discord.mochos.xyz"
            target="_blank"
            rel="noreferrer"
            className="btn-chunky btn-chunky-white"
          >
            Únete al Discord
          </a>
        </div>

        <div className="mt-6 inline-flex items-center gap-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-5 py-2.5 text-sm font-semibold">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
          </span>
          <Users className="size-4" />
          {players !== null ? (
            <span>
              <span className="font-bold">{players}</span> jugadores conectados
            </span>
          ) : (
            <span>Cargando jugadores…</span>
          )}
        </div>
      </div>

      <PlayDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}