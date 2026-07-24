import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("TaskList", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    tasks: t.relation("tasks"),
  }),
});

builder.queryField("taskLists", (t) =>
  t.prismaField({
    type: ["TaskList"],
    resolve: async (query) => {
      return prisma.taskList.findMany(query);
    },
  })
);