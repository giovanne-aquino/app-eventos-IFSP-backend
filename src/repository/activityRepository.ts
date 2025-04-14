import prisma from "../prisma/client";
import { CreateActivityDTO } from "../dtos/activities/CreateActivityRequestDTO";

export const activityRepository = {
    create: (data: CreateActivityDTO) => prisma.activity.create({ data })
};