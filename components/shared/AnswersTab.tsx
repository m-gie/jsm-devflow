import { getAnswersByUser } from "@/lib/actions/answer.actions";
import React from "react";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface AnswersTabParams {
  searchParams: { [key: string]: string | undefined };
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswersTabParams) => {
  const result = await getAnswersByUser({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {result.answers.map((answer) => (
        <div key={answer._id} className="mt-2">
          <AnswerCard
            key={answer._id}
            _id={answer._id}
            clerkId={clerkId}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes}
            createdAt={answer.createdAt}
          />
        </div>
      ))}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default AnswersTab;
