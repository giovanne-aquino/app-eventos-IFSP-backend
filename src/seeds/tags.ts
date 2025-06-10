import prisma from "../prisma/client";
import { log } from "./utils";

export default async function createTags() {
  const tags = [
    { name: "Tech" },
    { name: "Science" },
    { name: "Health" },
    { name: "Education" },
    { name: "Music" },
  ];

  for (const tag of tags) {
    const existingTag = await prisma.tag.findUnique({
      where: { name: tag.name },
    });

    if (!existingTag) {
      await prisma.tag.create({
        data: tag,
      });
      log(`Tag named ${tag.name} was created!`)
    } else {
      log(`Tag ${tag.name} already exists!`)
    }
  }
}