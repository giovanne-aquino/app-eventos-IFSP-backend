import { FieldType } from '@prisma/client';
export class CreateEventFieldRequestDTO {
  eventId!: number;
  name!: string;
  type!: FieldType;
  required?: boolean;
}

export type UpdateEventFieldRequestDTO = Partial<CreateEventFieldRequestDTO>;  

export class EventFieldResponseDTO extends CreateEventFieldRequestDTO {
    id!: number; 
}