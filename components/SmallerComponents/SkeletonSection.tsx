import React from "react";
import { SkeletonCard } from "../MappingCompenents/SkeletonCard";

const SkeletonSection = () => {
  return (
    <div className="col-span-2 grid gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[100, 80, 70, 60, 50, 40, 30, 20, 10].map((item, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonSection;
