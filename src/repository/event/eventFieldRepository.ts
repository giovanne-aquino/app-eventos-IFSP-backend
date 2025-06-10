import prisma from '../../prisma/client'; 
import { EventField } from '@prisma/client';
import {CreateEventFieldRequestDTO, UpdateEventFieldRequestDTO } from '../../dtos/events/EventField.DTO'; 

export class EventFieldRepository {
  async create(data: CreateEventFieldRequestDTO): Promise<EventField> {
    return await prisma.eventField.create({
      data: {
        eventId: data.eventId,
        name: data.name,
        type: data.type,
        required: data.required, 
      },
    });
  }

  async findAll(): Promise<EventField[]> {
    return await prisma.eventField.findMany();
  }

  async findById(id: number): Promise<EventField | null> {
        return await prisma.eventField.findUnique({
            where: { id: id },
        });
    }
  async update(id: number, data: Partial<UpdateEventFieldRequestDTO>): Promise<EventField> {
    return await prisma.eventField.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.eventField.delete({
      where: { id },
    });
  }
}