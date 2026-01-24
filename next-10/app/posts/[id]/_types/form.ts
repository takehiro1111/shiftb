import { PostModel } from "@/app/generated/prisma/models/Post";
import { z } from "zod";
import { PostFormSchema } from "@/app/_schemas/form";

export type FormData = z.infer<typeof PostFormSchema>;

export type PostWithCategories = PostModel & {
  postCategories?: { categoryId: number }[];
};
