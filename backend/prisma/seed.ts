import { Role } from "@prisma/client";
import prisma from "../src/lib/prisma";
import { hashSync } from "bcrypt";

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@bacacerdas.ai",
      username: "admin",
      password: hashSync("admin", 10),
      name: "Admin",
      role: Role.ROOT,
    },
  });

  await prisma.user.create({
    data: {
      email: "student@bacacerdas.ai",
      username: "student",
      password: hashSync("student", 10),
      name: "Student",
      role: Role.STUDENT,
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
