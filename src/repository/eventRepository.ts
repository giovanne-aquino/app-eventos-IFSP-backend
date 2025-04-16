import prisma from "../prisma/client";
import { Event } from "@prisma/client";
import { CreateEventDto } from "../dtos/events/CreateEventRequestDTO";

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
}
