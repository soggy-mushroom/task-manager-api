import { builder } from "../builder.js";
import { prisma } from "../db.js";

builder.queryField("taskLists", (t) =>
  t.prismaField({
    type: ["TaskList"],
    resolve: async (query) => {
      return prisma.taskList.findMany(query);
    },
  })
);