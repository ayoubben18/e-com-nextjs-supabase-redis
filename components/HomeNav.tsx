import { Button } from "./ui/button";
import Link from "next/link";

const HomeNav = () => {
  return (
    <div className="flex h-20 w-full justify-between px-8 py-5">
      <Button>
        <Link href={`/search`}>Find Products</Link>
      </Button>
      <Link href={`/me`} className="hover:underline">
        View Profile
      </Link>
    </div>
  );
};

export default HomeNav;
