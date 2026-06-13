import { useRef, useState, useEffect, useCallback } from "react";
import type { TebexCategory } from "@/lib/api/tebex.types";
import { CategorySkeleton } from "./CategorySkeleton";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: TebexCategory[];
  activeId: number | null;
  onSelect: (id: number) => void;
  isLoading: boolean;
}

/**
 * Horizontal scrollable tab bar for store categories.
 * Shows fade indicators on mobile when content overflows.
 * Ensures 44×44px minimum touch targets on mobile viewports.
 */
export function CategoryTabs({
  categories,
  activeId,
  onSelect,
  isLoading,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollIndicators = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollIndicators();

    el.addEventListener("scroll", updateScrollIndicators, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollIndicators);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollIndicators);
      resizeObserver.disconnect();
    };
  }, [updateScrollIndicators, categories]);

  if (isLoading) {
    return <CategorySkeleton />;
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Categorías de la tienda" className="relative">
      {/* Left fade indicator */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent transition-opacity duration-200 sm:hidden",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Scrollable tabs container */}
      <div
        ref={scrollRef}
        role="tablist"
        aria-label="Categorías"
        className="flex items-center gap-2 overflow-x-auto scroll-smooth py-2 sm:flex-wrap sm:overflow-x-visible [&]:[-ms-overflow-style:none] [&]:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const isActive = category.id === activeId;

          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-category-${category.id}`}
              onClick={() => onSelect(category.id)}
              className={cn(
                "shrink-0 cursor-pointer whitespace-nowrap rounded-full px-5 font-sans text-sm font-medium transition-all duration-200",
                // 44px min touch target on mobile, relaxed on desktop
                "min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-0",
                isActive
                  ? "bg-brand-purple text-white shadow-md shadow-brand-purple/25"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground",
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Right fade indicator */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent transition-opacity duration-200 sm:hidden",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      />
    </nav>
  );
}
