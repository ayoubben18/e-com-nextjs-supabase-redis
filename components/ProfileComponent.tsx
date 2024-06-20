import ActiveItemsCard from "./SmallerComponents/ActivrItemsCard";
import ProfileCard from "./SmallerComponents/ProfileCard";

export default function ProfileComponent() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-3">
      <ProfileCard />
      <ActiveItemsCard />
    </div>
  );
}
