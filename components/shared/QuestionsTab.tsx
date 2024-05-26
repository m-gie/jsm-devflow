import { getQuestionByUser } from "@/lib/actions/question.actions";
import Pagination from "./Pagination";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface QuestionsTabParams {
  searchParams: { [key: string]: string | undefined };
  userId: string;
  clerkId?: string | null;
}

const QuestionsTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionsTabParams) => {
  const result = await getQuestionByUser({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.questions.map((question) => (
        <div key={question._id} className="mt-2">
          <QuestionCard
            key={question._id}
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
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

export default QuestionsTab;
