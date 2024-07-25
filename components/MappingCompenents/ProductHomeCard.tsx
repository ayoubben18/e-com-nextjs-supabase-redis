"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function ProductHomeCard() {
  const { toast } = useToast();
  const handleClick = () =>
    toast({
      variant: "success",
      title: "Item Added to Cart",
      description: new Date().toLocaleTimeString(),
    });

  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Image
        src="/not-available.jpg"
        priority
        alt="Product 1"
        width={400}
        height={400}
        className="h-60 w-full object-cover"
      />
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="text-lg font-semibold md:text-xl">Cashmere Sweater</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Luxurious warmth
        </p>
        <h4 className="text-base font-semibold md:text-lg">$129.99</h4>
        <Button size="sm" className="mt-2" onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
