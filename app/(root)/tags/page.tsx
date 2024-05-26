import React from "react";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { TagFilters } from "@/constants/filters";
import { getTags } from "@/lib/actions/tag.actions";
import NoResult from "@/components/shared/NoResult";
import TagCard from "@/components/cards/TagCard";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="max-md:flex"
        />
      </div>

      <div className="mt-10 flex w-full flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <TagCard
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              count={tag.questions.length}
            />
          ))
        ) : (
          <NoResult
            title="There are no tags to show"
            description="Be the first to break the silence! 🚀 Ask a question and kickstart the discussion. Get involved! 💡"
            link="/ask-question"
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

export default TagsPage;
