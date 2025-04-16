import prisma from "./prisma/client";
import createTags from "./seeds/tags";
import { log } from "./seeds/utils";

import { LogSeedLevel } from "./seeds/utils";

const seedCommands = [
  { entity: "Tag", seedFn: createTags }
];

async function seed() {
  for (const { entity, seedFn } of seedCommands) {
    try {
      log('', entity, LogSeedLevel.START);

      await seedFn();
      
      log('', entity, LogSeedLevel.SUCCESS);
    } catch (error) {
      log('', entity, LogSeedLevel.ERROR);
    }
  }

  await prisma.$disconnect();
  log('Database seeding process completed!');
}

seed();