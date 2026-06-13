import type { TebexPackage } from "@/lib/api/tebex.types";
import { Package } from "lucide-react";

interface PackageCardProps {
  package: TebexPackage;
  onViewDetails: () => void;
  onBuy: () => void;
  isBuying: boolean;
}

/**
 * Parses up to 5 feature items from an HTML description string.
 * Extracts text from <li> elements first; if none found, splits by <br> or newlines.
 */
function parseFeatures(html: string): string[] {
  if (!html) return [];

  // Try extracting <li> content first
  const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
  const liMatches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = liRegex.exec(html)) !== null) {
    const text = stripHtml(match[1]).trim();
    if (text) liMatches.push(text);
  }

  if (liMatches.length > 0) {
    return liMatches.slice(0, 5);
  }

  // Fallback: split by <br>, <br/>, or newlines
  const lines = html
    .split(/<br\s*\/?>|\n/)
    .map((line) => stripHtml(line).trim())
    .filter((line) => line.length > 0);

  return lines.slice(0, 5);
}

/** Removes HTML tags from a string. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/** Formats a price with its currency symbol using Intl. */
function formatPrice(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback if currency code is invalid
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Individual package display card using the existing `card`/`card-foreground`
 * CSS variables and the `card-lift` hover effect.
 */
export function PackageCard({
  package: pkg,
  onViewDetails,
  onBuy,
  isBuying,
}: PackageCardProps) {
  const features = parseFeatures(pkg.description);

  return (
    <article className="card-lift flex flex-col rounded-2xl border-[3px] border-foreground bg-card text-card-foreground overflow-hidden">
      {/* Image or placeholder */}
      {pkg.image ? (
        <img
          src={pkg.image}
          alt={pkg.name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-muted">
          <Package className="h-16 w-16 text-muted-foreground opacity-40" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Category label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {pkg.category.name}
        </span>

        {/* Title */}
        <h3 className="mt-1 font-display text-lg font-bold leading-tight">
          {pkg.name}
        </h3>

        {/* Feature list */}
        {features.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price */}
        <p className="mt-auto pt-4 font-display text-xl font-bold text-brand-purple dark:text-brand-cyan">
          {formatPrice(pkg.total_price, pkg.currency)}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 p-6 pt-0">
        <button
          type="button"
          onClick={onViewDetails}
          className="btn-chunky btn-chunky-sm btn-chunky-white flex-1"
        >
          Detalles
        </button>
        <button
          type="button"
          onClick={onBuy}
          disabled={isBuying}
          className="btn-chunky btn-chunky-sm btn-chunky-primary flex-1 disabled:opacity-60 disabled:pointer-events-none"
        >
          {isBuying ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Comprando…
            </span>
          ) : (
            "Comprar"
          )}
        </button>
      </div>
    </article>
  );
}
