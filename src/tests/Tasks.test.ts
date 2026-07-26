import { beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "../db.js";
import { getTasks } from "../queries/Task.js";
import { addTaskResolver } from "../mutations/Task.js";
import { ZodError } from "zod";

describe("Tasks operations", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("getTasks", () => {
    it("returns tasks for a task list", async () => {
      const mockTasks = [
        {
          id: 1,
          title: "Do laundry",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          taskListId: 1,
        },
      ];

      const spy = vi
        .spyOn(prisma.task, "findMany")
        .mockResolvedValue(mockTasks as never);

      const result = await getTasks({}, {
        taskListId: 1,
        skip: 0,
        take: 10,
      });

      expect(result).toEqual(mockTasks);

      expect(spy).toHaveBeenCalledWith({
        where: {
          taskListId: 1,
        },
        skip: 0,
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });
    });
  });
  describe("addTaskResolver", () => {
    it("creates a task", async () => {
      const task = {
        id: 1,
        title: "Buy milk",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        taskListId: 1,
      };
  
      const spy = vi
        .spyOn(prisma.task, "create")
        .mockResolvedValue(task as never);
  
      const result = await addTaskResolver({}, {
        taskListId: 1,
        title: "Buy milk",
      });
  
      expect(result).toEqual(task);
  
      expect(spy).toHaveBeenCalledWith({
        data: {
          title: "Buy milk",
          taskListId: 1,
        },
      });
    });
  
    it("throws when the title is empty", async () => {
      await expect(
        addTaskResolver({}, {
          taskListId: 1,
          title: "",
        }),
      ).rejects.toThrow(ZodError);
  
      const spy = vi.spyOn(prisma.task, "create");

      expect(spy).not.toHaveBeenCalled();
    });
  });
})