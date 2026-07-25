import { builder } from "../builder";
import { prisma } from "../db";

builder.mutationField("addTaskList", (t) =>
  t.prismaField({
    type: "TaskList",
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args) => {
      return prisma.taskList.create({
        ...query,
        data: {
          name: args.name,
        },
      });
    },
  })
);