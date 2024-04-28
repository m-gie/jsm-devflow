"use client";
import React from "react";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.actions";
import { usePathname } from "next/navigation";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.actions";
import { toggleSaveQuestion } from "@/lib/actions/user.actions";

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: VotesProps) => {
  const pathname = usePathname();
  // const router = useRouter();
  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId) {
      return;
    }
    if (action === "upvote") {
      if (type === "question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }
      // TODO: Show a toast
      return;
    }
    if (action === "downvote") {
      if (type === "question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }
      // TODO: Show a toast
    }
  };

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="upvote icon"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => {
              handleVote("upvote");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="downvote icon"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => {
              handleVote("downvote");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="star icon"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => {
            handleSave();
          }}
        />
      )}
    </div>
  );
};

export default Votes;
