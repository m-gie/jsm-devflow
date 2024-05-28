"use client";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";

const GlobalSearchResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    { type: "question", id: 1, title: "NextJS question" },
    { type: "tag", id: 2, title: "NextJS" },
    { type: "user", id: 3, title: "Some user" },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setResult([]);
      try {
        // Fetch everything
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    return "/";
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <p className="text-dark400_light900 paragraph-semibold px-5">
        <GlobalFilters />
      </p>
      <div className="my-5 h-px bg-light-700/50 dark:bg-dark-500/50"></div>
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center flex flex-col px-5">
            <ReloadIcon className="my-2 size-8 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular">
              Searching everywhere...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  key={item.type + item.id + index}
                  href={renderLink("type", "id")}
                  className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tag"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_light500 small-medium mt-1">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchResult;
