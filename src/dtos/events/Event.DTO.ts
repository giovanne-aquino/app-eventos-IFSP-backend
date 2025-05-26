export class CreateEventDto {
    name!: string;
    description!: string;
    organizerId!: number;
    format!: 'PRESENTIAL' | 'ONLINE' | 'HYBRID';
    location?: string | null;
    userDocument!: boolean;
    banner?: string | null;
    eventType!: 'SIMPLE' | 'LARGE';
    startDate!: Date;
    endDate!: Date;
    maxCapacity?: number | null;
    complementaryHours?: number | null;
    status!: 'PENDING' | 'CONFIRMED' | 'CANCELED';
    category?: 'TALK' | 'LECTURE' | 'WORKSHOP' | 'SEMINAR' | 'SHORT_COURSE' | 'OTHER' | null; 
}

export type UpdateEventDto = Partial<CreateEventDto>;

export class EventResponseDto extends CreateEventDto {
    id!: number; 
}