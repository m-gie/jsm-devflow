import React from "react";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import UserCard from "@/components/cards/UserCard";
import { getUsers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection | DevOverflow",
  description: "Collection of your saved questions",
};

const CommunityPage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="max-md:flex"
        />
      </div>

      <div className="mt-10 flex w-full flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              clerkId={user.clerkId}
              username={user.username}
              name={user.name}
              picture={user.picture}
            />
          ))
        ) : (
          <NoResult
            title="There are no users to show"
            description="Be the first to break the silence! 🚀 Sign in and kickstart the discussion. Get involved! 💡"
            link="/sign-up"
            linkTitle="Sign up"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default CommunityPage;
