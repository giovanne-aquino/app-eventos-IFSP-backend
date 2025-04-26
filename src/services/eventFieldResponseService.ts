import { EventFieldResponse } from "@prisma/client";
import { CreateEventFieldResponseDto } from "../dtos/events/CreateEventFieldResponseResquestDTO";
import { EventFieldResponseRepository } from "../repository/eventFielResponseRepository";

export class EventFieldResponseService {
  private repository: EventFieldResponseRepository;

  constructor() {
    this.repository = new EventFieldResponseRepository();
  }

  async create(data: CreateEventFieldResponseDto): Promise<EventFieldResponse> {
    return await this.repository.create(data);
  }

}
