import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageShell } from "@/components/site/PageShell";
import { ShieldCheck, Ban, MessageSquareWarning, Bug } from "lucide-react";

const groups = [
  {
    icon: ShieldCheck,
    title: "Convivencia",
    rules: [
      "Respeta a todos los jugadores y al staff. Cero tolerancia con insultos graves, racismo, sexismo, LGTBfobia o cualquier forma de odio.",
      "Mantén el chat en un idioma legible (español o inglés preferentemente).",
      "No hagas spam, flood ni publicidad de otros servidores.",
    ],
  },
  {
    icon: Ban,
    title: "Juego limpio",
    rules: [
      "Prohibido el uso de hacks, cheats, macros, autoclickers o cualquier modificación que dé ventaja injusta.",
      "Prohibidos los exploits y bugs. Reporta cualquier fallo que encuentres.",
      "Las cuentas alt están permitidas, pero no para evadir sanciones ni manipular el ranking.",
    ],
  },
  {
    icon: MessageSquareWarning,
    title: "Chat y voz",
    rules: [
      "Evita compartir información personal tuya o de otros (doxxing está prohibido).",
      "No suplantes la identidad de otros jugadores ni del staff.",
      "No utilices nicks o skins ofensivas o inapropiadas.",
    ],
  },
  {
    icon: Bug,
    title: "Reportes",
    rules: [
      "Usa /report <jugador> en el juego o el canal #reportes del Discord.",
      "Adjunta pruebas (capturas o vídeo). Sin pruebas, el reporte puede ser desestimado.",
      "No te tomes la justicia por tu cuenta — el staff se encarga.",
    ],
  },
];

export function ReglasPage() {
  useDocumentTitle("Reglas — Overgy");

  return (
    <PageShell title="Reglas" subtitle="Para que todos disfrutemos del servidor. Al jugar aceptas estas normas.">
      <div className="container max-w-5xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <article
              key={g.title}
              className="card-lift rounded-2xl bg-card border-[3px] border-foreground p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="grid place-items-center size-12 rounded-2xl bg-[var(--brand-purple)]/10 border-2 border-[var(--brand-purple)]/30 text-[var(--brand-purple)]">
                  <g.icon className="size-6" />
                </span>
                <h2 className="text-2xl font-display">
                  {String(i + 1).padStart(2, "0")}. {g.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {g.rules.map((r, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 size-2 rounded-full bg-primary shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border-2 border-dashed border-foreground/20 p-6 text-center text-muted-foreground">
          El incumplimiento de las reglas puede resultar en advertencias, mute, kick o ban
          permanente según la gravedad y reincidencia. El staff tiene la última palabra.
        </div>
      </div>
    </PageShell>
  );
}
