import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full flex-col">
      <Skeleton className="h-6 w-44" />
      <div className="mt-2">
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="mt-2">
        <Skeleton className="h-44 w-full" />
      </div>
      <div className="mt-8">
        <Skeleton className="mt-2 h-44 w-full" />
        <Skeleton className="mt-2 h-44 w-full" />
        <Skeleton className="mt-2 h-44 w-full" />
        <Skeleton className="mt-2 h-44 w-full" />
      </div>
    </div>
  );
};

export default Loading;
