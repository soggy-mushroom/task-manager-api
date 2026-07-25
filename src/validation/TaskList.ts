import { z } from "zod";

export const addTaskListSchema = z.object({
  name: z
    .string()
    .min(1, "Task list name is required.")
    .max(100, "Task list name must not exceed 100 characters."),
});