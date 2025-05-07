export class UpdateActivityDTO {
    name!: string;
    description!: string;
    format!: 'PRESENTIAL' | 'ONLINE' | 'HYBRID';
    location?: string | null;
    userDocument!: boolean;
    banner?: string | null;
    startDate!: Date; 
    startTime!: string; 
    activityType!: 'LECTURE' | 'SHORT_COURSE' | 'WORKSHOP' | 'SEMINAR';
    maxCapacity!: number;
    complementaryHours!: number;
  }
    