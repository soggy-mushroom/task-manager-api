import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });


async function main() {
  await prisma.taskList.create({
    data: {
      name: "tasklist1",
      tasks: {
        create: [
          {
            title: "do the laundry",
          },
          {
            title: "cook dinner",
          },
        ],
      },
    },
  });
}

main().then(() => {
  console.log("Data seeded...");
});