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

export const addTaskSchema = z.object({
  taskListId: z.number().int().positive("Task list id must be positive."),
  title: z
    .string()
    .trim()
    .min(1, "Task title is required.")
    .max(200, "Task title must not exceed 200 characters."),
});

export const updateTaskSchema = z
  .object({
    id: z.number().int().positive("Task id must be positive."),
    title: z
      .string()
      .trim()
      .min(1)
      .max(200)
      .optional()
      .nullable(),
    completed: z.boolean().optional().nullable(),
  })
  .refine(
    (data) => data.title != null || data.completed != null,
    {
      message: "Provide at least one field to update.",
    }
  );

export const deleteTaskSchema = z.object({
  id: z.number().int().positive("Task id must be positive."),
});