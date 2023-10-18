import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
    prisma.$connect();
} catch (x) {
    console.error("!> Couldn't connect to DB!");
}

export default prisma;