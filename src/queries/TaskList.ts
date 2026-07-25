import { builder } from "../builder";
import { prisma } from "../db";

builder.queryField("taskLists", (t) =>
  t.prismaField({
    type: ["TaskList"],
    resolve: async (query) => {
      return prisma.taskList.findMany(query);
    },
  })
);