import React from "react";
import Question from "@/components/forms/Question";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a question | DevOverflow",
  description: "Ask a question and get answers from pros around the world.",
};

const AskQuestion = async () => {
  const userId = auth().userId;

  // const userId = "12345";
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  // console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
