import { EventField } from '@prisma/client'; 
import { CreateEventFieldRequestDTO, UpdateEventFieldRequestDTO } from '../../dtos/events/EventField.DTO'; 
import { EventFieldRepository } from '../../repository/event/eventFieldRepository';
import prisma from '../../prisma/client';
import { Prisma } from '@prisma/client'; 
import { ValidateError } from 'tsoa'; 
export class EventFieldService {
  private repository: EventFieldRepository;

  constructor() {
    this.repository = new EventFieldRepository();
  }

  async create(data: CreateEventFieldRequestDTO): Promise<EventField> {
    const eventExists = await prisma.event.findUnique({
      where: { id: data.eventId },
    });
    if (!eventExists) {
      throw new Prisma.PrismaClientKnownRequestError(
        `Event with ID ${data.eventId} not found.`,
        { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'Event', target: ['id'] } }
      );
    }

    return await this.repository.create({
        ...data,
        required: data.required ?? false, 
    });
  }

  async findAll(): Promise<EventField[]> {
    return await this.repository.findAll();
  }

  async update(id: number, data: Partial<UpdateEventFieldRequestDTO>): Promise<EventField> {
    const eventField = await this.repository.findById(id);
    if (!eventField) {
      throw new Prisma.PrismaClientKnownRequestError(
        `Event field with ID ${id} not found.`,
        { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'EventField', target: ['id'] } }
      );
    }
    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const eventField = await this.repository.findById(id);
    if (!eventField) {
      throw new Prisma.PrismaClientKnownRequestError(
        `Event field with ID ${id} not found.`,
        { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'EventField', target: ['id'] } }
      );
    }
    await this.repository.delete(id);
  }
}