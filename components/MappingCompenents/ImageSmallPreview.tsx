import Image from "next/image";
export function ImageSmallPreview() {
  return (
    <button className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50">
      <Image
        priority
        src="/product.webp"
        alt="Preview thumbnail"
        width={100}
        height={120}
        className="aspect-[5/6] object-cover"
      />
      <span className="sr-only">View Image 4</span>
    </button>
  );
}
