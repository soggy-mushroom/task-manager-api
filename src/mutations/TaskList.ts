import { builder } from "../builder.js";
import { prisma } from "../db.js";
import { addTaskListSchema } from "../validation/TaskList.js";

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