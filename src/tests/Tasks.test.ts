import { beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "../db.js";
import { getTasks } from "../queries/Task.js";

describe("Tasks resolver", () => {
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
})