import { z } from 'zod';

export const createActivitySchema = z.object({
  name: z.string(),
  description: z.string(),
  format: z.enum(['PRESENTIAL', 'ONLINE', 'HYBRID']),
  location: z.string().optional(),
  userDocument: z.boolean(),
  banner: z.string().optional(),
  startDate: z.date(), 
  startTime: z.string(),
  activityType: z.enum(['LECTURE', 'SHORT_COURSE', 'WORKSHOP', 'SEMINAR']),
  maxCapacity: z.number(),
  complementaryHours: z.number(),
  eventId: z.number(),
});
