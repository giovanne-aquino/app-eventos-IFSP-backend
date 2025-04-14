export class ActivityResponseDTO{
    id!: number;
    name!: string;
    description!: string;
    format!: 'PRESENTIAL' | 'ONLINE' | 'HYBRID';
    location?: string | null;
    userDocument!: boolean;
    startDate!: Date;
    startTime!: string;
    activityType!: 'LECTURE' | 'SHORT_COURSE' | 'WORKSHOP' | 'SEMINAR';
    maxCapacity!: number;
    complementaryHours!: number;
}