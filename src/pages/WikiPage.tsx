import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageShell } from "@/components/site/PageShell";
import { ArrowRight, FileText, type LucideIcon, Swords, Compass, Terminal, Users2, Shield, Coins } from "lucide-react";
import { fetchWikiCategories, type WikiCategory } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Swords,
  Compass,
  Terminal,
  Users2,
  FileText,
  Shield,
  Coins,
};

export function WikiPage() {
  const [categories, setCategories] = useState<WikiCategory[]>([]);
  useDocumentTitle("Ayuda — Overgy");

  useEffect(() => {
    fetchWikiCategories().then(setCategories);
  }, []);

  return (
    <PageShell title="Ayuda" subtitle="Todo lo que necesitas saber para dominar Overgy.">
      <div className="container max-w-5xl mx-auto px-5 py-16 grid md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || FileText;
          return (
            <Link
              key={cat.slug}
              to={`/ayuda/${cat.slug}`}
              className="card-lift group rounded-2xl overflow-hidden bg-card border-[3px] border-foreground flex flex-col"
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cat.excerpt}</p>
                <span className="inline-flex items-center gap-2 font-bold text-primary text-sm group-hover:gap-3 transition-all">
                  Leer guía <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
