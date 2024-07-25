import CheckoutComponent from "@/components/CheckoutComponent";
import PageWrapper from "@/components/PageWrapper";
import React, { Suspense } from "react";

const page = () => {
  return (
    <PageWrapper>
      <Suspense fallback={<LoadingCheckout />}>
        <CheckoutComponent />
      </Suspense>
    </PageWrapper>
  );
};

export default page;

const LoadingCheckout = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
};
