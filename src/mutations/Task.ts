import { builder } from "../builder.js";
import { prisma } from "../db.js";
import { addTaskSchema, updateTaskSchema, deleteTaskSchema } from "../validation/Task.js";
import { NotFoundError } from "../errors/NotFoundError.js";

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
      const task = await prisma.task.findUnique({
        where: {
          id: validated.id,
        },
      });
      
      if (!task) {
        throw new NotFoundError("Task");
      }

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
      const task = await prisma.task.findUnique({
        where: {
          id: validated.id,
        },
      });
      
      if (!task) {
        throw new NotFoundError("Task");
      }
      return prisma.task.delete({
        ...query,
        where: {
          id: validated.id,
        },
      });
    },
  })
);