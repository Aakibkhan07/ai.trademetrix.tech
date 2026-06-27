import { PrismaClient } from '../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const url = process.env.DATABASE_URL || 'postgresql://localhost:5432/trademetrix';

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: new PrismaNeon({ connectionString: url }),
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
