import prisma from "../../prisma/client";
import { EventFieldResponse } from "@prisma/client";
import { CreateEventFieldResponseDto, UpdateEventFieldResponseDto } from "../../dtos/events/EventFieldResponse.DTO";

export class EventFieldResponseRepository {

    async create(data: CreateEventFieldResponseDto): Promise<EventFieldResponse> {
        return await prisma.eventFieldResponse.create({
            data: {
                eventRegistrationId: data.eventRegistrationId,
                eventFieldId: data.eventFieldId,
                value: data.value,
            },
        });
    }

    async findAll(): Promise<EventFieldResponse[]> {
        return await prisma.eventFieldResponse.findMany();
    }

    async findById(id: string): Promise<EventFieldResponse | null> {
        return await prisma.eventFieldResponse.findUnique({
            where: { id: Number(id) }, 
        });
    }
    
    async update(id: string, data: Partial<UpdateEventFieldResponseDto>): Promise<EventFieldResponse> {
        return await prisma.eventFieldResponse.update({
            where: { id: Number(id) },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.eventFieldResponse.delete({
            where: { id: Number(id) },
        });
    }
}
