import { getAnswersByUser } from "@/lib/actions/answer.actions";
import React from "react";
import AnswerCard from "../cards/AnswerCard";

interface AnswersTabParams {
  searchParams: { [key: string]: string | undefined };
  userId: string;
  clerkId?: string;
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswersTabParams) => {
  const result = await getAnswersByUser({ userId });
  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  );
};

export default AnswersTab;
