import { EventFieldResponse } from "@prisma/client"; 
import { CreateEventFieldResponseDto, EventFieldResponse2Dto } from "../../dtos/events/EventFieldResponse.DTO";
import { EventFieldResponseRepository } from "../../repository/event/eventFielResponseRepository";
import prisma from '../../prisma/client';
import { Prisma } from '@prisma/client'; 
import { ValidateError } from 'tsoa'; 
export class EventFieldResponseService {
  private repository: EventFieldResponseRepository;

  constructor() {
    this.repository = new EventFieldResponseRepository();
  }

  async create(data: CreateEventFieldResponseDto): Promise<EventFieldResponse> {
    const eventRegistrationExists = await prisma.eventRegistration.findUnique({
      where: { id: data.eventRegistrationId },
    });
    if (!eventRegistrationExists) {
      throw new Prisma.PrismaClientKnownRequestError(
        `Event registration with ID ${data.eventRegistrationId} not found.`,
        { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'EventRegistration', target: ['id'] } }
      );
    }

    const eventFieldExists = await prisma.eventField.findUnique({
      where: { id: data.eventFieldId },
    });
    if (!eventFieldExists) {
      throw new Prisma.PrismaClientKnownRequestError(
        `Event field with ID ${data.eventFieldId} not found.`,
        { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'EventField', target: ['id'] } }
      );
    }
    return await this.repository.create(data);
  }

  async findAll(): Promise<EventFieldResponse2Dto[]> {
    const responses = await this.repository.findAll();
    return responses as EventFieldResponse2Dto[];
  }

  async update(id: string, data: Partial<CreateEventFieldResponseDto>): Promise<EventFieldResponse> {
    const response = await this.repository.findById(id);
    if (!response) {
      throw new Prisma.PrismaClientKnownRequestError(
        `Event field response with ID ${id} not found.`,
        { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'EventFieldResponse', target: ['id'] } }
      );
    }
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const response = await this.repository.findById(id);
    if (!response) {
      throw new Prisma.PrismaClientKnownRequestError(
        `Event field response with ID ${id} not found.`,
        { code: 'P2025', clientVersion: Prisma.prismaVersion.client, meta: { modelName: 'EventFieldResponse', target: ['id'] } }
      );
    }
    await this.repository.delete(id);
  }
}