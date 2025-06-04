import { Role } from "@prisma/client";
import prisma from "../src/lib/prisma";
import { hashSync } from "bcrypt";
import { faker } from "@faker-js/faker";

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.story.deleteMany({}),
    prisma.storyTag.deleteMany({}),
    prisma.user.deleteMany({}),
  ]);

  await prisma.user.create({
    data: {
      email: "admin@bacacerdas.ai",
      username: "admin",
      password: hashSync("admin", 10),
      name: "Admin",
      role: Role.ROOT,
    },
  });

  const teacher = await prisma.user.create({
    data: {
      email: "teacher@bacacerdas.ai",
      username: "teacher",
      password: hashSync("teacherbcai", 10),
      name: "Teacher",
      role: Role.TEACHER,
    },
  });

  await prisma.user.create({
    data: {
      email: "student@bacacerdas.ai",
      username: "student",
      password: hashSync("studentbcai", 10),
      name: "Student",
      role: Role.STUDENT,
    },
  });

  /**
   * Don't forget to add some tags for the stories.
   */
  const TAGS = [
    "Umum",
    "Anak-anak",
    "Remaja",
    "Pertualangan",
    "Fiksi",
    "Non-fiksi",
    "Teknologi",
    "Pendidikan",
  ];

  await prisma.storyTag.createMany({
    data: TAGS.map((tag) => ({ tag })),
    skipDuplicates: true,
  });

  const tag = faker.helpers.arrayElement(await prisma.storyTag.findMany({}));

  await prisma.story.create({
    data: {
      title: "Belajar Prisma",
      content:
        "<h1>Belajar Prisma</h1><p>Prisma adalah ORM yang sangat powerful untuk Node.js dan TypeScript.</p><p>Dengan Prisma, kita bisa dengan mudah mengelola database kita.</p>",
      Tag: {
        connect: {
          id: tag.id,
        },
      },
      User: {
        connect: {
          id: teacher.id,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
