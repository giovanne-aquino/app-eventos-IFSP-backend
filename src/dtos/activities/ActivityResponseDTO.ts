export class ActivityResponseDTO {
    id!: number;
    description!: string;
    format!: 'PRESENTIAL' | 'ONLINE' | 'HYBRID';
    location?: string;
    userDocument!: boolean;
    banner?: string;
    startDate!: Date; 
    startTime!: string; 
    activityType!: 'LECTURE' | 'SHORT_COURSE' | 'WORKSHOP' | 'SEMINAR';
    maxCapacity!: number;
    complementaryHours!: number;
}