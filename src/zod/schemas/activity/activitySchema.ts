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

export const updateActivitySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  format: z.enum(['PRESENTIAL', 'ONLINE', 'HYBRID']).optional(),
  location: z.string().optional(),
  userDocument: z.boolean().optional(),
  banner: z.string().optional(),
  startDate: z.date().optional(), 
  startTime: z.string().optional(),
  activityType: z.enum(['LECTURE', 'SHORT_COURSE', 'WORKSHOP', 'SEMINAR']).optional(),
  maxCapacity: z.number().optional(),
  complementaryHours: z.number().optional(),
}).strict();
