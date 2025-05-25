import { EventField } from '@prisma/client';
import { CreateEventFieldRequestDTO } from '../../dtos/events/EventField.DTO';
import { UpdateEventFieldRequestDTO } from '../../dtos/events/UpdateEventFieldRequestDTO';
import { EventFieldRepository } from '../../repository/event/eventFieldRepository';

export class EventFieldService {
  private repository: EventFieldRepository;

  constructor() {
    this.repository = new EventFieldRepository();
  }

  async create(data: CreateEventFieldRequestDTO): Promise<EventField> {
    return await this.repository.create(data);
  }

  async findAll(): Promise<EventField[]> {
    return await this.repository.findAll();
  }

  async update(id: number, data: Partial<UpdateEventFieldRequestDTO>): Promise<EventField> {
    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}