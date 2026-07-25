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

builder.mutationField("updateTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.int({ required: true }),
      title: t.arg.string(),
      completed: t.arg.boolean(),
    },
    resolve: async (query, _root, args) => {
      return prisma.task.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          ...(args.title != null && {
            title: args.title,
          }),
          ...(typeof args.completed === "boolean" && {
            completed: args.completed,
          }),
        },
      });
    },
  })
);

builder.mutationField("deleteTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _root, args) => {
      return prisma.task.delete({
        ...query,
        where: {
          id: args.id,
        },
      });
    },
  })
);