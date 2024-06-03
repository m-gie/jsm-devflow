import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <Skeleton className="size-36 rounded-full object-cover" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-16 w-44" />
      </div>
      <div className="mt-32">
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="size-36 rounded-2xl" />
          ))}
        </div>
      </div>
      <div className="mt-24">
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Skeleton className="h-48 w-full rounded-xl" key={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
