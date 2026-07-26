import { builder } from "../builder.js";
import { prisma } from "../db.js";
import { taskQuerySchema, tasksQuerySchema } from "../validation/Task.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import z from "zod";

builder.queryField("task", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.int({ required: true }),
    },

    resolve: async (query, __root, args) => {
      const validated = taskQuerySchema.parse(args);
      const task = await prisma.task.findUnique({
        ...query,
        where: {
          id: validated.id,
        },
      });

      if (!task) {
        throw new NotFoundError("Task");
      }

      return task;
    },
  })
);

export async function getTasks(
  query: object,
  args: z.infer<typeof tasksQuerySchema>,
) {
  const validated = tasksQuerySchema.parse(args);

  return prisma.task.findMany({
    ...query,
    where: {
      taskListId: validated.taskListId,
      ...(typeof validated.completed === "boolean"
        ? { completed: validated.completed }
        : {}),
    },
    skip: validated.skip ?? 0,
    take: validated.take ?? 10,
    orderBy: {
      createdAt: "desc",
    },
  });
}

builder.queryField("tasks", (t) =>
  t.prismaField({
    type: ["Task"],
    args: {
      taskListId: t.arg.int({ required: true }),
      completed: t.arg.boolean({ required: false }),
      skip: t.arg.int({ defaultValue: 0 }),
      take: t.arg.int({ defaultValue: 10 }),
    },
    resolve: (query, _root, args) => getTasks(query, args),
  })
);