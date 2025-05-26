export class CreateEventFieldResponseDto {
  eventRegistrationId!: number;
  eventFieldId!: number;
  value!: string;
}

export type UpdateEventFieldResponseDto = Partial<CreateEventFieldResponseDto>;

export class EventFieldResponse2Dto extends CreateEventFieldResponseDto {
  id!: number;
}