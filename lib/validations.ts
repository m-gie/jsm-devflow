import { z } from "zod";

export const questionSchema = z.object({
  title: z
    .string()
    .min(5, "Question title must have at least 5 characters")
    .max(130),
  explanation: z.string().min(50),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const ProfileSchema = z.object({
  name: z.string().min(5),
  username: z.string().min(3),
  bio: z.string(),
  portfolioWebsite: z.string().url(),
  location: z.string(),
});
