import { ImageCache } from "@/types/ImageCache";
import Image from "next/image";

interface Props {
  image: ImageCache;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

export function ImageSmallPreview({ image, setImage }: Props) {
  return (
    <button
      onClick={() => {
        image.url && setImage(image.url);
      }}
      className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50"
    >
      <Image
        priority
        src={image.url || "/not-available.jpg"}
        alt="Preview thumbnail"
        width={100}
        height={120}
        className="aspect-[5/6] object-cover"
      />
      <span className="sr-only">View Image 4</span>
    </button>
  );
}
