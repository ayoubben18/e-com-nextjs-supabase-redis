"use client";
import React from "react";
import { Input } from "../ui/input";
import { redirect } from "next/navigation";

const SearchRedirect = () => {
  return <Input onFocus={() => redirect(`/search`)} />;
};

export default SearchRedirect;
