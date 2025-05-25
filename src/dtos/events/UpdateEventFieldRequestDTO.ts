import { FieldType } from '@prisma/client';

export class UpdateEventFieldRequestDTO {
  name?: string;
  type?: FieldType;
  required?: boolean;
}