import { Suspense } from "react";
import ActiveItemsCard from "./SmallerComponents/ActiveItemsCard";
import ProfileCard from "./SmallerComponents/ProfileCard";
import { Skeleton } from "./ui/skeleton";

export default function ProfileComponent() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-3">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileCard />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-72 w-80" />}>
        <ActiveItemsCard />
      </Suspense>
    </div>
  );
}

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
};
