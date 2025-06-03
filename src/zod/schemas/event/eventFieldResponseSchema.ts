import { z } from 'zod';

export const createEventFieldResponseSchema = z.object({
  eventRegistrationId: z.number()
    .int("Event registration ID must be an integer")
    .positive("Event registration ID must be a positive number"),
    
  eventFieldId: z.number()
    .int("Event field ID must be an integer")
    .positive("Event field ID must be a positive number"),

  value: z.string().min(1, "Value is required")
})