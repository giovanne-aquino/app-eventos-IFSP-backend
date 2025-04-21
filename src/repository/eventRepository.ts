import prisma from "../prisma/client";
import { Event, Format, EventType } from "@prisma/client";
import { CreateEventDto } from "../dtos/events/CreateEventRequestDTO";
import { UpdateEventDto } from "../dtos/events/UpdateEventDto";

export class EventRepository {

    // Criar novo evento
    async create(data: CreateEventDto): Promise<Event> {
        return await prisma.event.create({
            data: {
                name: data.name,
                description: data.description,
                organizerId: data.organizerId,
                format: data.format,
                location: data.location ?? null,
                userDocument: data.userDocument,
                banner: data.banner ?? null,
                eventType: data.eventType,
                startDate: data.startDate,
                endDate: data.endDate,
                maxCapacity: data.maxCapacity ?? null,
                complementaryHours: data.complementaryHours ?? null,
                status: data.status,
            },
        });
    }

    // Buscar todos os eventos
    async findAll(): Promise<Event[]> {
        return await prisma.event.findMany();
    }

    //findbyid
    async findById(id: string): Promise<Event | null> {
        return await prisma.event.findUnique({
            where: { id: Number(id) },
        });
    }

    //findByFormat
    async findByFormat(format: string): Promise<Event[]> {
        return await prisma.event.findMany({
            where: {
                format: format as Format, // Faz o cast de string para enum Format
            },
        });
    }

    //findbyType
    async findByType(eventType: string): Promise<Event[]> {
        return await prisma.event.findMany({
            where: {
                eventType: eventType as EventType , 
            },
        });
    }

    async update(id: string, data: Partial<UpdateEventDto>): Promise<Event> {
        return await prisma.event.update({
            where: { id: Number(id) },
            data,
        });
    }

}