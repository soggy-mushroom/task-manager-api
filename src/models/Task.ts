import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Task", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    completed: t.exposeBoolean("completed"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
    }),
    taskListId: t.exposeInt("taskListId"),
    taskList: t.relation("taskList"),
  })
});

builder.queryField("task", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, __root, args) => {
      return prisma.task.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id,
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
      return prisma.task.findMany({
        ...query,
        where: {
          taskListId: args.taskListId,
          ...(typeof args.completed === "boolean"
            ? { completed: args.completed }
            : {}),
        },
        skip: args.skip ?? 0,
        take: args.take ?? 10,
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })
);