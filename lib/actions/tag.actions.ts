"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

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

export async function getTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

    const query = searchQuery
      ? {
          name: { $regex: new RegExp(searchQuery, "i") },
        }
      : {};

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query).sort(sortOptions);
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopTags() {
  try {
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
