import prisma from "../prisma/client";
import { CreateActivityDto } from "../dtos/activities/CreateActivityRequestDTO";

export const activityRepository = {
    create: (data: CreateActivityDto) => prisma.activity.create({ data })
};