import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="mt-12 h-96 w-full" />
        <Skeleton className=" mt-12 h-32 w-full" />
      </div>
    </div>
  );
};

export default Loading;
