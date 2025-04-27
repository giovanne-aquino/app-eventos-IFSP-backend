import { EventFieldResponse } from "@prisma/client";
import { CreateEventFieldResponseDto } from "../../dtos/events/CreateEventFieldResponseResquestDTO";
import { EventFieldResponseRepository } from "../../repository/event/eventFielResponseRepository";

export class EventFieldResponseService {
  private repository: EventFieldResponseRepository;

  constructor() {
    this.repository = new EventFieldResponseRepository();
  }

  async create(data: CreateEventFieldResponseDto): Promise<EventFieldResponse> {
    return await this.repository.create(data);
  }

  async findAll(): Promise<EventFieldResponse[]> {
    return await this.repository.findAll();
  }

  async update(id: string, data: Partial<CreateEventFieldResponseDto>): Promise<EventFieldResponse> {
    return await this.repository.update(id, data);
  }

}
