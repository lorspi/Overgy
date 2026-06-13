import { Section, SectionHeading } from "./Section";
import { LatestNews, type NewsItem } from "./LatestNews";
import { Sparkles, HeartHandshake, RefreshCw } from "lucide-react";

const BG = "/images/fondo-degradado.svg";

const pillars = [
  {
    icon: Sparkles,
    title: "Experiencia única",
    text: "Modalidades diseñadas desde cero para ofrecer algo que no encontrarás en ningún otro servidor de Hytale.",
  },
  {
    icon: RefreshCw,
    title: "Siempre evolucionando",
    text: "Cada semana hay algo nuevo: mapas, armas, eventos y ajustes basados en el feedback de los jugadores.",
  },
  {
    icon: HeartHandshake,
    title: "Comunidad primero",
    text: "Los jugadores deciden hacia dónde va el servidor. Votaciones, sugerencias abiertas y desarrollo transparente.",
  },
];

export function QueSomos({ news }: { news: NewsItem[] }) {
  return (
    <Section bg={BG} overlay="bg-[var(--brand-navy)]/40">
      <LatestNews items={news} />

      <SectionHeading
        eyebrow="¿Qué somos?"
        title="Hytale llevado al siguiente nivel"
        description="Un servidor independiente creado por jugadores apasionados. Aquí no hay relleno: cada modalidad, cada sistema y cada actualización existe porque la comunidad lo pidió."
        light
      />

      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="card-lift rounded-2xl bg-white/95 border-[3px] border-foreground p-6 text-center"
          >
            <div className="mx-auto mb-4 grid place-items-center size-14 rounded-2xl bg-[var(--brand-purple)]/10 border-2 border-[var(--brand-purple)]/30 text-[var(--brand-purple)]">
              <p.icon className="size-7" />
            </div>
            <h3 className="text-xl font-display mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}