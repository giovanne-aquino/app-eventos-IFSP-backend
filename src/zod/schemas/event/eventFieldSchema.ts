import { z } from 'zod';
import prisma from './../../../prisma/client';
import { FieldType } from '@prisma/client'; 

export const createEventFieldSchema = z.object({
  eventId: z.number()
    .int("Event ID must be an integer")
    .positive("Event ID must be a positive number"),

  name: z.string()
    .min(1, "Name is required")
    .max(255, "Name cannot exceed 255 characters"), 

  // O tipo deve ser um dos valores do enum FieldType
  type: z.nativeEnum(FieldType, {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: `Type must be one of: ${Object.values(FieldType).join(', ')}` };
      }
      return { message: ctx.defaultError };
    },
  }),

  required: z.boolean().optional(), 
}).superRefine(async (data, ctx) => {
  // Validação assíncrona para verificar se o EventId existe
  const eventExists = await prisma.event.findUnique({
    where: { id: data.eventId },
  });

  if (!eventExists) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Event with ID ${data.eventId} not found.`,
      path: ['eventId']
    });
  }
});