import React from "react";
import Image from "next/image";
import RenderTag from "../shared/RenderTag";
// import Link from "next/link";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import { Badge } from "../ui/badge";
import Link from "next/link";
interface UserProps {
  id: string;
  clerkId: string;
  username: string;
  name: string;
  picture: string;
}

const UserCard = async (props: UserProps) => {
  const interactedTags = await getTopInteractedTags({ userId: props.id });
  return (
    <div className="shadow-light100_darknone background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 max-xs:min-w-full xs:w-[260px] ">
      <Link
        href={`/profile/${props.clerkId}`}
        className="flex flex-col items-center"
      >
        <Image
          src={props.picture}
          alt="user avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {props.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{props.username}
          </p>
        </div>
      </Link>

      <div className="mt-6">
        {interactedTags.length > 0 ? (
          <div className="flex items-center gap-2">
            {interactedTags.map((tag) => (
              // TODO: fix hydration error here - RenderTag contains a Link, which cannot be rendered inside a Link declared in this file.
              <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
            ))}
          </div>
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div>
    </div>
  );
};

export default UserCard;
