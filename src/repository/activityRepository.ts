import prisma from '../prisma/client';
import { CreateActivityDto } from '../dtos/activities/CreateActivityRequestDTO';

export const activityRepository = {
  create: (data: CreateActivityDto) => prisma.activity.create({ data }),
  findAll: () => prisma.activity.findMany(),
  findById: (id: number) =>
    prisma.activity.findUnique({
      where: { id },
    }),
  findByEventId: async(
    eventId: number,
    skip: number,
    take: number
  ) => {
    const [activities, total] = await prisma.$transaction([
      prisma.activity.findMany({
        where: { eventId },
        skip,
        take,
        orderBy: { startDate: 'asc' },
      }),
      prisma.activity.count({
        where: { eventId },
      }),
    ]);

    return { activities: activities as CreateActivityDto[], total };
  },
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
