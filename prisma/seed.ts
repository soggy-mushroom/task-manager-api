import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });


async function main() {
  await prisma.taskList.createMany({
    data: [],
  });

  await prisma.taskList.create({
    data: {
      name: "Home",
      tasks: {
        create: [
          {
            title: "Do the laundry",
            completed: true,
          },
          {
            title: "Cook dinner",
            completed: false,
          },
          {
            title: "Vacuum the living room",
            completed: true,
          },
          {
            title: "Water the plants",
            completed: false,
          },
        ],
      },
    },
  });

  await prisma.taskList.create({
    data: {
      name: "Work",
      tasks: {
        create: [
          {
            title: "Reply to emails",
            completed: true,
          },
          {
            title: "Finish GraphQL assignment",
            completed: false,
          },
          {
            title: "Review pull requests",
            completed: false,
          },
          {
            title: "Prepare sprint demo",
            completed: true,
          },
        ],
      },
    },
  });

  await prisma.taskList.create({
    data: {
      name: "Shopping",
      tasks: {
        create: [
          {
            title: "Buy milk",
            completed: true,
          },
          {
            title: "Buy bread",
            completed: true,
          },
          {
            title: "Buy eggs",
            completed: false,
          },
          {
            title: "Pick up coffee beans",
            completed: false,
          },
        ],
      },
    },
  });

  await prisma.taskList.create({
    data: {
      name: "Fitness",
      tasks: {
        create: [
          {
            title: "Go for a 5km run",
            completed: false,
          },
          {
            title: "Complete strength workout",
            completed: true,
          },
          {
            title: "Stretch for 15 minutes",
            completed: false,
          },
        ],
      },
    },
  });

  await prisma.taskList.create({
    data: {
      name: "Travel",
      tasks: {
        create: [
          {
            title: "Book flights",
            completed: true,
          },
          {
            title: "Reserve hotel",
            completed: true,
          },
          {
            title: "Pack suitcase",
            completed: false,
          },
          {
            title: "Renew passport",
            completed: false,
          },
        ],
      },
    },
  });
}

main().then(() => {
  console.log("Data seeded...");
});