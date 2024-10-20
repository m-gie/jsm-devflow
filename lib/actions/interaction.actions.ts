"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    //  Update view count for question we're viewing

    const question = await Question.findOne({ _id: questionId });
    console.log(question);
    if (!question) {
      console.log("Question not found");
      return;
    }

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingInteraction) {
        return;
      }
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
        tags: question.tags,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
