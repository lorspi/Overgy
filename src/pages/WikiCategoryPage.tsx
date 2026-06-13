import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageShell } from "@/components/site/PageShell";
import { fetchWikiCategories, type WikiCategory } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import {
  Swords,
  Compass,
  Terminal,
  Users2,
  FileText,
  Shield,
  Coins,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Swords,
  Compass,
  Terminal,
  Users2,
  FileText,
  Shield,
  Coins,
};

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(/`(.*?)`/g, '<code class="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">$1</code>');
}

function renderContent(content: string) {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const blocks = normalized.split("\n\n");

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return (
        <h3 key={idx} className="text-xl font-display font-bold mt-10 mb-4 first:mt-0">
          {trimmed.slice(3)}
        </h3>
      );
    }

    const lines = trimmed.split("\n");
    if (lines.every((l) => l.trim().startsWith("•"))) {
      return (
        <ul key={idx} className="space-y-2.5 mb-6">
          {lines.map((line, li) => {
            const text = line.trim().slice(1).trim();
            return (
              <li key={li} className="flex gap-2 text-base text-foreground/80">
                <span className="text-primary shrink-0 mt-0.5">›</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <p key={idx} className="text-base text-foreground/80 mb-5 leading-relaxed">
        <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
      </p>
    );
  });
}

export function WikiCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<WikiCategory | null>(null);
  const [categories, setCategories] = useState<WikiCategory[]>([]);

  useDocumentTitle(category ? `${category.title} — Overgy` : "Ayuda — Overgy");

  useEffect(() => {
    fetchWikiCategories().then((cats) => {
      setCategories(cats);
      const found = cats.find((c) => c.slug === slug);
      setCategory(found ?? null);
    });
  }, [slug]);

  if (!category) {
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
    <PageShell
      title={category.title}
      subtitle={category.excerpt}
      breadcrumb={[
        { label: "Inicio", to: "/" },
        { label: "Ayuda", to: "/ayuda" },
        { label: category.title },
      ]}
    >
      <div className="container max-w-5xl mx-auto px-5 py-12 md:py-16 grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="rounded-2xl border-2 border-foreground/15 bg-card p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Ayuda
            </p>
            <nav className="flex flex-col gap-1">
              {categories.map((cat) => {
                const CatIcon = iconMap[cat.icon] || FileText;
                const isActive = cat.slug === category.slug;
                return (
                  <Link
                    key={cat.slug}
                    to={`/ayuda/${cat.slug}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                    }`}
                  >
                    <CatIcon className="size-4" />
                    {cat.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <article>
          <div>{renderContent(category.content)}</div>
        </article>
      </div>
    </PageShell>
  );
}
