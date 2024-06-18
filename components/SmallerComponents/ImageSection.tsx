import Image from "next/image";
import { ImageSmallPreview } from "../MappingCompenents/ImageSmallPreview";

interface Props {
  images: string[];
}

export function ImageSection({ images }: Props) {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid items-start gap-3 md:grid-cols-5">
        <div className="flex items-start gap-3 md:flex-col">
          {[1, 2, 3, 4, 5].map((i) => (
            <ImageSmallPreview key={i} />
          ))}
        </div>
        <div className="md:col-span-4">
          <Image
            src="/product.webp"
            alt="Product Image"
            priority
            width={600}
            height={900}
            className="aspect-[2/3] w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
