import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
declare const prisma: PrismaClient<{
    adapter: PrismaPg;
    log: ("error" | "info" | "query" | "warn")[];
}, "error" | "info" | "query" | "warn", import("@prisma/client/runtime/client").DefaultArgs>;
declare const connectToDatabase: () => Promise<void>;
declare const disconnectFromDatabase: () => Promise<void>;
export { prisma, connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=db.d.ts.map