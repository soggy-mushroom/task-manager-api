import { builder } from "../builder";
import { prisma } from "../db";
import { taskQuerySchema, tasksQuerySchema } from "../validation/Task";

builder.queryField("task", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, __root, args) => {
      const validated = taskQuerySchema.parse(args);
      return prisma.task.findUniqueOrThrow({
        ...query,
        where: {
          id: validated.id,
        },
      });
    },
  })
);

builder.queryField("tasks", (t) =>
  t.prismaField({
    type: ["Task"],
    args: {
      taskListId: t.arg.int({ required: true }),
      completed: t.arg.boolean({ required: false }),
      skip: t.arg.int({ defaultValue: 0 }),
      take: t.arg.int({ defaultValue: 10 }),
    },
    resolve: async (query, _root, args) => {
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
    },
  })
);