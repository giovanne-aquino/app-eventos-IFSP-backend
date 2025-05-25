import prisma from '../../prisma/client'; 
import { EventField } from '@prisma/client';
import {CreateEventFieldRequestDTO } from '../../dtos/events/CreateEventFieldRequestDTO'; 
import { UpdateEventFieldRequestDTO } from '../../dtos/events/UpdateEventFieldRequestDTO';

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