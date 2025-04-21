import { EventRepository } from '../repository/eventRepository';
import { CreateEventDto } from '../dtos/events/CreateEventRequestDTO';
import { UpdateEventDto } from '../dtos/events/UpdateEventDto';
import { Event } from '@prisma/client';

export class EventService {
    private eventRepository: EventRepository;

    constructor() {
        this.eventRepository = new EventRepository();
    }

    async createEvent(data: CreateEventDto): Promise<Event> {
        return await this.eventRepository.create(data);
    }

    async getAllEvents(): Promise<Event[]> {
        return await this.eventRepository.findAll();
    }

    //getbyid
    async getEventById(id: string): Promise<Event> {
        const event = await this.eventRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    }

    //getEventsByFormat
    async getEventsByFormat(format: string): Promise<Event[]> {
        const events = await this.eventRepository.findByFormat(format);
        
        if (!events || events.length === 0) {
            throw new Error(`No events found with format: ${format}`);
        }
    
        return events;
    }
    
    //getEventsByEventType
    async getEventsByType(eventType: string): Promise<Event[]> {
        const events = await this.eventRepository.findByType(eventType);
        
        if (!events || events.length === 0) {
            throw new Error(`No events found with Event Type: ${eventType}`);
        }
    
        return events;
    }

     // Método para atualizar um evento
     async updateEvent(id: string, data: Partial<UpdateEventDto>): Promise<Event> {
        // Verifica se o evento existe
        const event = await this.eventRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }

        // Atualiza o evento no banco de dados
        const updatedEvent = await this.eventRepository.update(id, data);
        return updatedEvent;
    }
}
