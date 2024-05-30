import React from "react";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { BadgeCounts } from "@/types";

interface StatsProps {
  totalQuestions: number;
  totalAnswers: number;
  badgeCounts: BadgeCounts;
  reputation: number;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">
          {formatNumber(value)}
        </p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

const Stats = ({
  totalQuestions,
  totalAnswers,
  badgeCounts,
  reputation,
}: StatsProps) => {
  return (
    <>
      <div className="mt-10">
        <h4 className="text-dark200_light900 h3-semibold text-xl">
          Reputation: {reputation}
        </h4>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          <div className="light-border background-light900_dark300 flex flex-wrap justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {formatNumber(totalQuestions)}
              </p>
              <p className="body-medium text-dark400_light700">Questions</p>
            </div>
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {formatNumber(totalAnswers)}
              </p>
              <p className="body-medium text-dark400_light700">Answers</p>
            </div>
          </div>
          <StatsCard
            imgUrl="/assets/icons/gold-medal.svg"
            value={badgeCounts.GOLD}
            title="Gold Badges"
          />
          <StatsCard
            imgUrl="/assets/icons/silver-medal.svg"
            value={badgeCounts.SILVER}
            title="Silver Badges"
          />
          <StatsCard
            imgUrl="/assets/icons/bronze-medal.svg"
            value={badgeCounts.BRONZE}
            title="Bronze Badges"
          />
        </div>
      </div>
    </>
  );
};

export default Stats;
