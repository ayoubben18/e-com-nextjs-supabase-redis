import { MountainIcon } from "@/svgs";
import Link from "next/link";

export default function HomeIconComponent() {
  return (
    <Link href="/" className="mr-6 flex items-center" prefetch={false}>
      <MountainIcon className="h-6 w-6" />
      <span className="sr-only">Acme Store</span>
    </Link>
  );
}
