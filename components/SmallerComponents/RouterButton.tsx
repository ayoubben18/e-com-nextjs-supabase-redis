"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

type Props = {
  route: string;
  label: string;
};

const RouterButton = ({ route, label }: Props) => {
  const router = useRouter();
  return (
    <Button
      variant="expandIcon"
      Icon={ArrowRightIcon}
      iconPlacement="right"
      className="mt-2 w-full items-center"
      onClick={() => {
        router.push(route);
      }}
    >
      {label}
    </Button>
  );
};

export default RouterButton;
