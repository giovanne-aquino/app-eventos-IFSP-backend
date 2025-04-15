import prisma from '../prisma/client';
import { CreateActivityDto } from '../dtos/activities/CreateActivityRequestDTO';

export const activityRepository = {
  create: (data: CreateActivityDto) => prisma.activity.create({ data }),
  findAll: () => prisma.activity.findMany(),
  findById: (id: number) =>
    prisma.activity.findUnique({
      where: { id },
    }),
  findByEventId: (eventId: number) =>
    prisma.activity.findMany({
      where: { eventId },
    }),
  update: (id: number, data: Partial<CreateActivityDto>) =>
    prisma.activity.update({
      where: { id },
      data,
    }),
  delete: (id: number) =>
    prisma.activity.delete({
      where: { id },
    }),
};
