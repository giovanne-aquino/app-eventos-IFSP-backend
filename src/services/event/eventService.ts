import { EventRepository } from '../../repository/event/eventRepository';
import { CreateEventDto, UpdateEventDto, EventResponseDto} from '../../dtos/events/Event.DTO';
import { Event } from '@prisma/client';
import { Prisma } from '@prisma/client'; 
import prisma from '../../prisma/client';
import { ValidateError } from 'tsoa'; 


export class EventService {
    private eventRepository: EventRepository;

    constructor() {
        this.eventRepository = new EventRepository();
    }

    async createEvent(data: CreateEventDto): Promise<EventResponseDto> {
        //Validar se o organizador existe no banco de dados
        const organizerExists = await prisma.user.findUnique({
            where: { id: data.organizerId },
        });
        if (!organizerExists) {
            throw new Prisma.PrismaClientKnownRequestError(
                `Organizer with ID ${data.organizerId} not found.`,
                { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'User', target: ['id'] } }
            );
        }

        if (data.startDate <= new Date()) {
            throw new ValidateError({
                startDate: { message: "Start date must be in the future." }
            }, "Validation failed"); 
        }

        if (data.endDate <= data.startDate) {
            throw new ValidateError({
                endDate: { message: "End date must be after start date." }
            }, "Validation failed");
        }

        const createdEvent = await this.eventRepository.create({
            ...data,
            location: data.location ?? null,
            banner: data.banner ?? null,
            maxCapacity: data.maxCapacity ?? null,
            complementaryHours: data.complementaryHours ?? null,
            category: data.category ?? null,
        });

        return createdEvent as EventResponseDto;
    }

    async getAllEvents(): Promise<EventResponseDto[]> {
        const events = await this.eventRepository.findAll();
        return events as EventResponseDto[];
    }

    async getEvents({
        page,
        pageSize,
        format,
        eventType,
        searchTerm,
    }: {
        page: number;
        pageSize: number;
        format?: string;
        eventType?: string;
        searchTerm?: string;
    }): Promise<{ events: Event[]; total: number }> {
        return await this.eventRepository.findEvents({ page, pageSize, format, eventType, searchTerm });
    }

    async getEventById(id: string): Promise<EventResponseDto> {
        const event = await this.eventRepository.findById(id);
        if (!event) {
            throw new Prisma.PrismaClientKnownRequestError(
                `Event with ID ${id} not found.`,
                { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'Event', target: ['id'] } }
            );
        }
        return event as EventResponseDto;
    }

    async getEventsByFormat(format: string): Promise<EventResponseDto[]> {
        const events = await this.eventRepository.findByFormat(format);
        if (!events || events.length === 0) {
            throw new ValidateError({
                format: { message: `No events found with format: ${format}` }
            }, "Bad Request");
        }
        return events as EventResponseDto[];
    }

    async getEventsByType(eventType: string): Promise<EventResponseDto[]> {
        const events = await this.eventRepository.findByType(eventType);
        if (!events || events.length === 0) {
            throw new ValidateError({
                eventType: { message: `No events found with Event Type: ${eventType}` }
            }, "Bad Request");
        }
        return events as EventResponseDto[];
    }

    async updateEvent(id: string, data: Partial<UpdateEventDto>): Promise<EventResponseDto> {
        const event = await this.eventRepository.findById(id);
        if (!event) {
            throw new Prisma.PrismaClientKnownRequestError(
                `Event with ID ${id} not found.`,
                { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'Event', target: ['id'] } }
            );
        }
        const updatedEvent = await this.eventRepository.update(id, data);
        return updatedEvent as EventResponseDto;
    }

    async deleteEvent(id: string): Promise<void> {
        const event = await this.eventRepository.findById(id);
        if (!event) {
            throw new Prisma.PrismaClientKnownRequestError(
                `Event with ID ${id} not found.`,
                { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'Event', target: ['id'] } }
            );
        }
        await this.eventRepository.delete(id);
    }
}