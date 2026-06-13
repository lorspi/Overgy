import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageShell } from "@/components/site/PageShell";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { fetchNews, type NewsItem } from "@/lib/content";

export function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  useDocumentTitle("Noticias — Overgy");

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return (
    <PageShell title="Noticias" subtitle="Actualizaciones, eventos y novedades del servidor.">
      <div className="container max-w-5xl mx-auto px-5 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <Link
            key={n.slug}
            to={`/noticias/${n.slug}`}
            className="card-lift group rounded-2xl overflow-hidden bg-card border-[3px] border-foreground flex flex-col"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={n.image} alt={n.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground mb-2">
                <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" />{n.date}</span>
                <span className="inline-flex items-center gap-1 text-primary"><Tag className="size-3.5" />{n.tag}</span>
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{n.title}</h3>
              <p className="text-sm text-muted-foreground flex-1 mb-4">{n.excerpt}</p>
              <span className="inline-flex items-center gap-2 font-bold text-primary text-sm group-hover:gap-3 transition-all">
                Leer más <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
