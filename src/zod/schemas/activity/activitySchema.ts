import { z } from 'zod';

export const createActivitySchema = z.object({
  name: z.string(),
  description: z.string(),
  format: z.enum(['PRESENTIAL', 'ONLINE', 'HYBRID']),
  location: z.string().optional(),
  userDocument: z.boolean(),
  banner: z.string().optional(),
  startDate: z.date(), // Valida como uma instância de Date
  startTime: z.string(), // 'HH:mm:ss', você pode adicionar uma regex aqui se quiser validar o formato
  activityType: z.enum(['LECTURE', 'SHORT_COURSE', 'WORKSHOP', 'SEMINAR']),
  maxCapacity: z.number(),
  complementaryHours: z.number(),
  eventId: z.number(),
});
