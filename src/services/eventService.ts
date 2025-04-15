import { EventRepository } from '../repository/eventRepository';
import { CreateEventDto } from '../dtos/events/CreateEventRequestDTO';
import { Event } from '@prisma/client';

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  // Criar um novo evento
    async createEvent(data: CreateEventDto): Promise<Event> {
        return await this.eventRepository.create(data);
    }
}
