import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default PageWrapper;
