// src/lib/prisma.js (or just lib/prisma.js if not using src directory)
import { PrismaClient } from '../generated/prisma';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;