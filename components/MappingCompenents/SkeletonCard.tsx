import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col space-y-3 opacity-50", className)}>
      <Skeleton className="aspect-square w-full rounded-lg object-cover transition-opacity group-hover:opacity-50" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}
