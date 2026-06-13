import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Tag } from "lucide-react";

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  content: string;
}

export function LatestNews({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState(0);

  const next = useCallback(
    () => setActive((i) => (i + 1) % items.length),
    [items.length]
  );

  const prev = useCallback(
    () => setActive((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (items.length === 0) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, items.length]);

  // Swipe/drag support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) next();
    else if (diff < -threshold) prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (items.length === 0) return null;

  const item = items[active];

  return (
    <div className="w-full max-w-4xl mx-auto mb-14">
      <Link
        to={`/noticias/${item.slug}`}
        className="card-lift rounded-2xl overflow-hidden bg-card border-[3px] border-foreground shadow-2xl shadow-black/20 block group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col sm:flex-row sm:h-[220px]">
          <div className="sm:w-3/5 p-6 md:p-8 flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5" />
                {item.date}
              </span>
              <span className="inline-flex items-center gap-1 text-primary">
                <Tag className="size-3.5" />
                {item.tag}
              </span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold leading-tight mb-2">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {item.excerpt.length > 100 ? item.excerpt.slice(0, 100).trimEnd() + "…" : item.excerpt}
            </p>
            <span className="mt-4 self-start text-sm font-bold text-primary group-hover:underline">
              Leer más →
            </span>
          </div>

          <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Noticia ${i + 1}`}
              className={`transition-all cursor-pointer ${
                i === active
                  ? "size-4.5 rounded-[6px] rotate-45 bg-white/80"
                  : "size-2.5 rounded-full bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <Link
          to="/noticias"
          className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
        >
          Ver todas las noticias →
        </Link>
      </div>
    </div>
  );
}
