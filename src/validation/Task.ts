import { z } from "zod";

export const taskQuerySchema = z.object({
  id: z.number().int().positive("Task id must be positive."),
});

export const tasksQuerySchema = z.object({
  taskListId: z.number().int().positive("Task list id must be positive."),
  completed: z.boolean().optional().nullable(),
  skip: z.number().int().min(0).optional().nullable(),
  take: z.number().int().min(1).max(100).optional().nullable(),
});