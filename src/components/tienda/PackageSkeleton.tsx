import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton card that matches the dimensions of a PackageCard.
 * Displays placeholder areas for: image, category label, title,
 * description lines (features), price, and action buttons.
 */
export function PackageSkeleton() {
  return (
    <div className="rounded-2xl border-[3px] border-foreground bg-card text-card-foreground overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="flex flex-col space-y-3 p-6">
        {/* Category label */}
        <Skeleton className="h-4 w-20" />

        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Feature lines (up to 5) */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
          <Skeleton className="h-3.5 w-4/6" />
          <Skeleton className="h-3.5 w-5/6" />
          <Skeleton className="h-3.5 w-3/6" />
        </div>

        {/* Price */}
        <Skeleton className="h-7 w-24 mt-2" />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 p-6 pt-0">
        <Skeleton className="h-11 flex-1 rounded-xl" />
        <Skeleton className="h-11 flex-1 rounded-xl" />
      </div>
    </div>
  );
}
