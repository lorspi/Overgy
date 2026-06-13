import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.36-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.02.03.05.03.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"/>
    </svg>
  );
}
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.6 6.4a5.5 5.5 0 0 1-3.3-1.1 5.5 5.5 0 0 1-2-3.3h-3.5v13.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .9.1V9a6.2 6.2 0 1 0 5.3 6.1V9.6a8.9 8.9 0 0 0 5.3 1.7v-3.5l-.0-.0z"/>
    </svg>
  );
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const socials = [
  { href: "https://discord.mochos.xyz", label: "Discord", Icon: DiscordIcon },
  { href: "https://www.youtube.com/@Overgy", label: "YouTube", Icon: YouTubeIcon },
  { href: "https://www.instagram.com/overgy", label: "Instagram", Icon: Instagram },
  { href: "https://www.tiktok.com/@overgy", label: "TikTok", Icon: TikTokIcon },
  { href: "https://x.com/Overgy", label: "X", Icon: XIcon },
];

export function Footer() {
  return (
    <footer className="bg-[var(--brand-navy)] text-white">
      <div className="container max-w-5xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-4 text-center md:text-left">
        <div className="md:col-span-2">
          <img
            src="/images/logo-blanco.png"
            alt="Overgy"
            className="h-6 w-auto mb-4 mx-auto md:mx-0"
          />
          <p className="text-white/70 max-w-md mx-auto md:mx-0">
            Una experiencia creada junto a la comunidad.<br /> No afiliado a Hypixel Studios.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid place-items-center size-11 rounded-full bg-white/10 hover:bg-[var(--brand-cyan)] hover:text-[var(--brand-navy)] transition-colors border-2 border-white/15"
              >
                <s.Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Explora</h4>
          <ul className="space-y-2 text-white/80">
            <li><Link to="/ayuda/general" className="hover:text-[var(--brand-cyan)]">Ayuda</Link></li>
            <li><Link to="/reglas" className="hover:text-[var(--brand-cyan)]">Reglas</Link></li>
            <li><Link to="/noticias" className="hover:text-[var(--brand-cyan)]">Noticias</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Comunidad</h4>
          <ul className="space-y-2 text-white/80">
            <li><a href="/tienda" rel="noreferrer" className="hover:text-[var(--brand-cyan)]">Tienda</a></li>
            <li><a href="https://discord.mochos.xyz" target="_blank" rel="noreferrer" className="hover:text-[var(--brand-cyan)]">Discord</a></li>
            <li><a href="https://www.youtube.com/@Overgy" target="_blank" rel="noreferrer" className="hover:text-[var(--brand-cyan)]">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container max-w-5xl mx-auto px-5 py-5 text-sm text-white/60 flex flex-wrap items-center justify-center md:justify-between gap-3 text-center">
          <span>© {new Date().getFullYear()} Mochos Studio. Todos los derechos reservados.</span>
          <span>Web creada por <a href="https://lorspi.com/" target="_blank" rel="noreferrer" className="hover:text-[var(--brand-cyan)] underline">lorspi</a></span>
        </div>
      </div>
    </footer>
  );
}
