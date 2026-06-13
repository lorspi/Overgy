import type { TebexPackage } from "@/lib/api/tebex.types";
import { PackageCard } from "./PackageCard";
import { PackageSkeleton } from "./PackageSkeleton";

interface PackageGridProps {
  packages: TebexPackage[];
  isLoading: boolean;
  onViewDetails: (pkg: TebexPackage) => void;
  onBuy: (pkg: TebexPackage) => void;
  buyingPackageId: number | null;
}

/**
 * Responsive CSS grid container that renders PackageCards or
 * skeleton placeholders during loading.
 *
 * Layout: 1 column on mobile, 2 on sm (≥640px), 3 on lg (≥1024px).
 */
export function PackageGrid({
  packages,
  isLoading,
  onViewDetails,
  onBuy,
  buyingPackageId,
}: PackageGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PackageSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No hay paquetes disponibles en esta categoría
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          package={pkg}
          onViewDetails={() => onViewDetails(pkg)}
          onBuy={() => onBuy(pkg)}
          isBuying={buyingPackageId === pkg.id}
        />
      ))}
    </div>
  );
}
