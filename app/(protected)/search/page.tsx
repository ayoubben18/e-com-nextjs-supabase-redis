import PageWrapper from "@/components/PageWrapper";
import SearchPageComponent from "@/components/SearchPageComponent";
import React from "react";

export const revalidate = 0;

const page = () => {
  return (
    <PageWrapper>
      <SearchPageComponent />
    </PageWrapper>
  );
};

export default page;
