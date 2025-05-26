import prisma from "../../prisma/client";
import { Event, Format, EventType } from "@prisma/client";
import { CreateEventDto ,  UpdateEventDto } from "../../dtos/events/Event.DTO";

export class EventRepository {

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
                category: data.category ?? null,
            },
        });
    }

    async findAll(): Promise<Event[]> {
        return await prisma.event.findMany();
    }

    async findEvents({
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
        const where: any = {};

        if (format && format !== "ALL") {
            where.format = format as Format;
        }
        if (eventType && eventType !== "ALL") {
            where.eventType = eventType as EventType;
        }

        if (searchTerm) {
            where.name = { contains: searchTerm, mode: 'insensitive' };
        }

        const [events, total] = await prisma.$transaction([
            prisma.event.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize
            }),
            prisma.event.count({ where }),
        ]);

        return { events, total };
    }

    async findById(id: string): Promise<Event | null> {
        return await prisma.event.findUnique({
            where: { id: Number(id) },
        });
    }

    async findByFormat(format: string): Promise<Event[]> {
        return await prisma.event.findMany({
            where: {
                format: format as Format, 
            },
        });
    }

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

    async delete(id: string): Promise<void> {
        await prisma.event.delete({
            where: { id: Number(id) }, 
        });
    }

}