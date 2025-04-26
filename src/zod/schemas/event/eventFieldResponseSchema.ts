import { z } from 'zod';
import prisma from './../../../prisma/client';

export const createEventFieldResponseSchema = z.object({
  eventRegistrationId: z.number()
    .int("Event registration ID must be an integer")
    .positive("Event registration ID must be a positive number"),
    
  eventFieldId: z.number()
    .int("Event field ID must be an integer")
    .positive("Event field ID must be a positive number"),

  value: z.string().min(1, "Value is required")
}).superRefine(async (data, ctx) => {
  const eventRegistrationExists = await prisma.eventRegistration.findUnique({
    where: { id: data.eventRegistrationId },
  });

  if (!eventRegistrationExists) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Event registration with ID ${data.eventRegistrationId} not found.`,
      path: ['eventRegistrationId']
    });
  }

  const eventFieldExists = await prisma.eventField.findUnique({
    where: { id: data.eventFieldId },
  });

  if (!eventFieldExists) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Event field with ID ${data.eventFieldId} not found.`,
      path: ['eventFieldId']
    });
  }
});
