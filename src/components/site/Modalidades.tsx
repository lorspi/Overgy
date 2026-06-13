import { Link } from "react-router-dom";
import { Section, SectionHeading } from "./Section";
import { Crosshair, Compass, ArrowRight } from "lucide-react";

const BG = "/images/fondo-blanco.svg";

const modes = [
  {
    slug: "blitz-ops",
    title: "Blitz Ops",
    icon: Crosshair,
    image: "/images/blitz-ops.jpg",
    description:
      "Combate táctico por equipos en primera persona. Mapas compactos, partidas rápidas y un arsenal que se expande cada temporada.",
    tags: ["Shooter", "Táctico", "Equipos", "Ranked"],
    color: "from-[var(--brand-purple)] to-[var(--brand-purple-deep)]",
  },
  {
    slug: "modo-exploracion",
    title: "Modo Exploración",
    icon: Compass,
    image: "/images/modo-exploracion.jpg",
    description:
      "Únete al mundo de exploración personalizado de Overgy: nuevos jefes, armaduras, economía, clanes y mucho más.",
    tags: ["Survival", "Clanes", "Economía", "Jefes"],
    color: "from-[var(--brand-cyan)] to-[var(--brand-navy)]",
  },
];

export function Modalidades() {
  return (
    <Section bg={BG} overlay="bg-background/30" id="modalidades">
      <SectionHeading
        eyebrow="Modalidades"
        title="Dos formas únicas de jugar"
        description="Ya sea para una partida rápida o para construir tu imperio, tenemos la modalidad perfecta para ti."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {modes.map((m) => (
          <Link
            key={m.slug}
            to={`/ayuda/${m.slug}`}
            className="card-lift group relative overflow-hidden rounded-3xl bg-card border-[3px] border-foreground"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={m.image}
                alt={m.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${m.color} opacity-60 mix-blend-multiply`} />
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-display mb-3">{m.title}</h3>
              <p className="text-muted-foreground">{m.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-foreground/15"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="mt-6 inline-flex items-center gap-2 font-bold text-primary group-hover:gap-3 transition-all">
                Ver guía <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
