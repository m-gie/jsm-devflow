"use server";

import User from "@/databse/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");

    const mockTags = [
      { _id: "1", name: "javascript" },
      { _id: "2", name: "nextjs" },
      { _id: "3", name: "tailwind" },
    ];
    return mockTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
