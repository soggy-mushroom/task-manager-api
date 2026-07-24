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