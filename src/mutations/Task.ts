import { builder } from "../builder";
import { prisma } from "../db";


builder.mutationField("addTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      taskListId: t.arg.int({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args) => {
      return prisma.task.create({
        ...query,
        data: {
          title: args.title,
          taskListId: args.taskListId,
        },
      });
    },
  })
);