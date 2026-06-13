import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton for the CategoryTabs component.
 * Displays a horizontal row of pill-shaped placeholders
 * matching the tab bar dimensions.
 */
export function CategorySkeleton() {
  return (
    <div className="flex items-center gap-3 overflow-hidden py-2">
      <Skeleton className="h-10 w-28 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-24 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-32 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-20 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-28 shrink-0 rounded-full" />
    </div>
  );
}
