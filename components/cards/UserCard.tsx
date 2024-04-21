import React from "react";
import Image from "next/image";
import RenderTag from "../shared/RenderTag";
// import Link from "next/link";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "../ui/badge";

interface UserProps {
  id: string;
  clerkId: string;
  username: string;
  name: string;
  picture: string;
}

const UserCard = async (props: UserProps) => {
  const interactedTags = await getTopInteractedTags({ userId: props.id });
  //   const mockUser = {
  //     _id: { $oid: "6623ec6d8536b6467d9b0e81" },
  //     clerkId: "user_2fN8kH2JfGjiwKdJaOLh4VYiGJW",
  //     name: "Cienki  Cieniass",
  //     username: "cienias",
  //     email: "cieja0@gmail.com",
  //     picture:
  //       "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZjAwbnVGQTVVNzdVNlFRSlF4WU9GNnFmcTIiLCJyaWQiOiJ1c2VyXzJmTjhrSDJKZkdqaXdLZEphT0xoNFZZaUdKVyIsImluaXRpYWxzIjoiQ0MifQ",
  //     reputation: { $numberInt: "0" },
  //     saved: [],
  //     joinedAt: { $date: { $numberLong: "1713630317318" } },
  //     __v: { $numberInt: "0" },
  //   };

  return (
    // <Link href={`/profile/${props.clerkId}`}>
    <div className="shadow-light100_darknone background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 max-xs:min-w-full xs:w-[260px] ">
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
    // </Link>
  );
};

export default UserCard;
