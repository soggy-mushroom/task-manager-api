import { builder } from "../builder";
import { prisma } from "../db";
import { addTaskSchema, updateTaskSchema, deleteTaskSchema } from "../validation/Task";


builder.mutationField("addTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      taskListId: t.arg.int({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args) => {
      const validated = addTaskSchema.parse(args);
      return prisma.task.create({
        ...query,
        data: {
          title: validated.title,
          taskListId: validated.taskListId,
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
      const validated = updateTaskSchema.parse(args);
      return prisma.task.update({
        ...query,
        where: {
          id: validated.id,
        },
        data: {
          ...(validated.title != null && {
            title: validated.title,
          }),
          ...(typeof validated.completed === "boolean" && {
            completed: validated.completed,
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
      const validated = deleteTaskSchema.parse(args);
      return prisma.task.delete({
        ...query,
        where: {
          id: validated.id,
        },
      });
    },
  })
);