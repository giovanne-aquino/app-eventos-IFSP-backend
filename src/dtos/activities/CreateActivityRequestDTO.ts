export interface CreateActivityDto {
    name: string;
    description: string;
    format: 'PRESENTIAL' | 'ONLINE' | 'HYBRID';
    location?: string;
    userDocument: boolean;
    banner?: string;
    startDate: Date; // formato: 'YYYY-MM-DD'
    startTime: string; // formato: 'HH:mm:ss'
    activityType: 'LECTURE' | 'SHORT_COURSE' | 'WORKSHOP' | 'SEMINAR';
    maxCapacity: number;
    complementaryHours: number;
    eventId: number;
  }
  