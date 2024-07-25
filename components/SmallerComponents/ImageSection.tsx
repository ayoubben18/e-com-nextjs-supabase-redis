"use client";
import Image from "next/image";
import { ImageSmallPreview } from "../MappingCompenents/ImageSmallPreview";
import { ImageCache } from "@/types/ImageCache";
import { useState } from "react";

interface Props {
  images: ImageCache[];
}

export function ImageSection({ images }: Props) {
  const [image, setImage] = useState(images[0].url || "/not-available.jpg");
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid items-start gap-3 md:grid-cols-5">
        <div className="flex items-start gap-3 md:flex-col">
          {images.map((image, i) => (
            <ImageSmallPreview key={i} image={image} setImage={setImage} />
          ))}
        </div>
        <div className="md:col-span-4">
          <Image
            src={image}
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
