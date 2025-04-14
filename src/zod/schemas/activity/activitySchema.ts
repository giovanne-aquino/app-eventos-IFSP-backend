import { z } from 'zod';

export const createActivitySchema = z.object({
    name: z.string().min(1, "Activity name is required"),
    description: z.string().min(1, "Activity description is required"),
    format: z.enum(['PRESENTIAL', 'ONLINE', 'HYBRID'], {
        required_error: "Activity format is mandatory",
        invalid_type_error: "Activity format must be one of 'PRESENTIAL', 'ONLINE', or 'HYBRID'"
    }),
    location: z.string().optional(),
    userDocument: z.boolean(),
    banner: z.string().optional(),
    startDate: z.date().refine(date => date > new Date(), {
        message: "Start date must be in the future",
    }),
    startTime: z.string().min(1, "Start time is required"),
    activityType: z.enum(['LECTURE', 'SHORT_COURSE', 'WORKSHOP', 'SEMINAR'], {
        required_error: "Activity type is mandatory",
        invalid_type_error: "Activity type must be one of 'LECTURE', 'SHORT_COURSE', 'WORKSHOP', or 'SEMINAR'"
    }),
    maxCapacity: z.number().int().positive("Max capacity must be a positive integer"),
    complementaryHours: z.number().int().positive("Complementary hours must be a positive integer"),
});