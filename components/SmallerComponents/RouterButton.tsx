"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  route: string;
  label: string;
};

const RouterButton = ({ route, label }: Props) => {
  const router = useRouter();
  return (
    <Button
      className="mt-2 w-full"
      onClick={() => {
        router.push(route);
      }}
    >
      {label}
    </Button>
  );
};

export default RouterButton;
