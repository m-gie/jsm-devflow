import React from "react";
import Link from "next/link";

interface TagProps {
  _id: string;
  name: string;
  count: number;
}

const TagCard = (props: TagProps) => {
  return (
    <Link href={`/tags/${props._id}`}>
      <div className="shadow-light100_darknone background-light900_dark200 light-border flex w-full flex-col rounded-2xl border p-8 max-xs:min-w-full xs:w-[260px] ">
        <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">
            {props.name}
          </p>
        </div>
        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {props.count}
          </span>
          Questions
        </p>
      </div>
    </Link>
  );
};

export default TagCard;
