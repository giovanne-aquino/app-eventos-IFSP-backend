import { z } from "zod";

export const createEventSchema = z
  .object({
    name: z.string().min(1, "Event name is required"),
    description: z.string().min(1, "Event description is required"),
    format: z.enum(["PRESENTIAL", "ONLINE", "HYBRID"], {
      required_error: "Event format is mandatory",
    }),
    location: z.string().optional().nullable(),
    userDocument: z.boolean(),
    banner: z.string().optional(),
    eventType: z.enum(["SIMPLE", "LARGE"], {
      required_error: "Event type is mandatory",
    }),
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
    maxCapacity: z
      .number()
      .int()
      .positive("Max capacity must be a positive integer")
      .optional(),
    complementaryHours: z
      .number()
      .int()
      .positive("Complementary hours must be a positive integer")
      .optional(),
    status: z.enum(["PENDING", "CONFIRMED", "CANCELED"], {
      required_error: "Status is required",
    }),
    organizerId: z
      .number()
      .int()
      .positive("Organizer ID must be a positive integer"),
    category: z.enum(
      ["TALK", "LECTURE", "WORKSHOP", "SEMINAR", "SHORT_COURSE", "OTHER"],
      {
        required_error: "Category is required",
      }
    ),
  })