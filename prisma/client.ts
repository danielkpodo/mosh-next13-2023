import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// it is a best practice to have a single instance of prisma client running in your application
// Once prisma client is imported into a file , the second time the code is not re-executed but the cached is used.
/**
 *
 * In next.js because we have fast refresh, anytime we change our source code next.js refreshes some of our models , in that case we will end up in a situation where we have too many prisma client, so will see an error in terminal saying too many prisma client. This only happens in development because fast refresh only happens in dev mode.
 */
