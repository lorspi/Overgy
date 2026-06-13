import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CtaPlay } from "@/components/site/CtaPlay";
import { Calendar, Tag, Link2, Share2, Check } from "lucide-react";
import { fetchNews, type NewsItem } from "@/lib/content";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function NoticiaPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [copied, setCopied] = useState(false);

  useDocumentTitle(item ? `${item.title} — Overgy` : "Cargando... — Overgy");

  useEffect(() => {
    fetchNews().then((news) => {
      const found = news.find((n) => n.slug === slug);
      setItem(found ?? null);
    });
  }, [slug]);

  function copyUrl() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareTwitter() {
    if (!item) return;
    const text = encodeURIComponent(`${item.title} — Overgy`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  }

  function shareWhatsApp() {
    if (!item) return;
    const text = encodeURIComponent(`${item.title} — Overgy\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Nav />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Cargando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav />

      <header className="relative w-full aspect-[4/3] md:aspect-[16/5] overflow-hidden">
        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 pt-20 md:p-12">
          <div className="container mx-auto max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              <span className="text-white/40">/</span>
              <Link to="/noticias" className="hover:text-white transition-colors">Noticias</Link>
              <span className="text-white/40">/</span>
              <span className="text-white/90 truncate max-w-[200px]">{item.title}</span>
            </nav>
            <div className="flex items-center gap-3 text-xs font-semibold text-white/80 mb-3">
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5" />
                {item.date}
              </span>
              <span className="inline-flex items-center gap-1 text-[var(--brand-cyan)]">
                <Tag className="size-3.5" />
                {item.tag}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
              {item.title}
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <article className="container mx-auto max-w-3xl px-5 py-12 md:py-16">
          <div className="text-base md:text-lg text-foreground/90 leading-relaxed">
            {item.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-6 last:mb-0">
                {paragraph.split("\n").map((line, lidx) => (
                  <span key={lidx}>
                    {lidx > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-foreground/10">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Compartir
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={copyUrl}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                {copied ? <Check className="size-4 text-emerald-500" /> : <Link2 className="size-4" />}
                {copied ? "¡Copiado!" : "Copiar URL"}
              </button>
              <button
                onClick={shareTwitter}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                <XIcon className="size-4" />
                X
              </button>
              <button
                onClick={shareWhatsApp}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                <Share2 className="size-4" />
                WhatsApp
              </button>
            </div>
          </div>
        </article>
      </main>

      <CtaPlay />
      <Footer />
    </div>
  );
}
