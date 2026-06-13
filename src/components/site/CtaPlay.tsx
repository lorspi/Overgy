import { useState } from "react";
import { PlayDialog } from "./PlayDialog";

const BG = "/images/fondo-fucsia.svg";

export function CtaPlay() {
  const [open, setOpen] = useState(false);
  return (
    <section
      className="section-fixed-bg relative"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-purple-deep)]/20 to-transparent" />
      <div className="relative container mx-auto px-5 py-24 md:py-32 text-center text-white">
        <h2 className="text-4xl md:text-6xl font-display font-extrabold leading-tight" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.15)" }}>
          ¿Listo para entrar a <span className="text-[var(--brand-cyan)]">Overgy</span>?
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-white/90">
          Únete ahora mismo y descubre por qué cientos de jugadores ya forman parte de nuestra comunidad.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={() => setOpen(true)}
            className="btn-chunky btn-chunky-cyan text-lg !px-10 !py-4"
          >
            ¡Juega ahora!
          </button>
          <a
            href="/tienda"
            target="_self"
            rel="noreferrer"
            className="btn-chunky btn-chunky-white"
          >
            Visita nuestra tienda
          </a>
        </div>
      </div>
      <PlayDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}