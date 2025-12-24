import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden py-0">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-b-none" />

      <CardContent className="p-5 pt-0">
        {/* Description skeleton */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Event details skeletons */}
        <div className="space-y-2">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-3 w-24" />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
