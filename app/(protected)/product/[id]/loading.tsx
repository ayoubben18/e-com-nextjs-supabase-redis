import PageWrapper from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <PageWrapper className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <div className="order-2 grid items-start gap-4 md:order-1 md:gap-10">
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-9 w-2/3" /> {/* Product name */}
          <Skeleton className="h-20 w-full" /> {/* Product description */}
        </div>

        <div className="grid gap-10 md:gap-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-20" /> {/* Colors label */}
            <div className="flex gap-2">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-md" />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-20" /> {/* Colors label */}
            <div className="flex gap-2">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ImageSectionSkeleton />
    </PageWrapper>
  );
}

function ImageSectionSkeleton() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid items-start gap-3 md:grid-cols-5">
        <div className="flex items-start gap-3 md:flex-col">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-16 rounded-lg" />
          ))}
        </div>
        <div className="md:col-span-4">
          <Skeleton className="aspect-[2/3] h-[600px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
