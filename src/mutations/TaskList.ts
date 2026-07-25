import { builder } from "../builder";
import { prisma } from "../db";
import { addTaskListSchema } from "../validation/TaskList";

builder.mutationField("addTaskList", (t) =>
  t.prismaField({
    type: "TaskList",
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args) => {
      const validated = addTaskListSchema.parse(args);
      return prisma.taskList.create({
        ...query,
        data: {
          name: validated.name,
        },
      });
    },
  })
);