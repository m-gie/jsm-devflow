import { getQuestionByUser } from "@/lib/actions/question.actions";
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
  const result = await getQuestionByUser({ userId, page: 1 });

  return (
    <>
      {result.questions.map((question) => (
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
      ))}
    </>
  );
};

export default QuestionsTab;
