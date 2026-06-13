import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { QueSomos } from "@/components/site/QueSomos";
import { Modalidades } from "@/components/site/Modalidades";
import { CtaPlay } from "@/components/site/CtaPlay";
import { Footer } from "@/components/site/Footer";
import { fetchNews, type NewsItem } from "@/lib/content";

export function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  useDocumentTitle("Overgy — Servidor de Hytale");

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <QueSomos news={news.slice(0, 3)} />
        <Modalidades />
        <CtaPlay />
      </main>
      <Footer />
    </div>
  );
}
