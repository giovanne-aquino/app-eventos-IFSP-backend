import { FieldType } from '@prisma/client';
export class CreateEventFieldRequestDTO {
  eventId!: number;
  name!: string;
  type!: FieldType;
  required?: boolean;
}