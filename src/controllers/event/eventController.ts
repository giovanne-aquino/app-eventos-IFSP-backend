import {
  Body,
  Path,
  Controller,
  Post,
  Delete,
  Get,
  Put,
  Route,
  Tags,
  Response,
  SuccessResponse,
} from 'tsoa';
import { EventService } from '../../services/event/eventService';
import { CreateEventDto } from "../../dtos/events/CreateEventRequestDTO";
import { EventResponseDto } from "../../dtos/events/EventResponseDTO";
import { UpdateEventDto } from "../../dtos/events/UpdateEventDto";
import { createEventSchema } from '../../zod/schemas/event/eventSchema';
import { ValidateError } from 'tsoa';
import { zodToTsoaErrors } from '../../utilis/zodToTsoaErrors';

@Route('events')
@Tags('Events')
export class EventController extends Controller {
  private eventService = new EventService();

  @Post()
  @SuccessResponse('201', 'Created')
  @Response<ValidateError>('400', 'Validation failed')
  public async createEvent(@Body() body: CreateEventDto): Promise<EventResponseDto> {

    const parsed = await createEventSchema.parseAsync(body).catch((error) => {
      throw new ValidateError(zodToTsoaErrors(error.issues), 'Validation failed');
    });
    return this.eventService.createEvent(parsed);
  }

  @Get('/')
  @SuccessResponse('200', 'OK')
  public async getAllEvents(): Promise<EventResponseDto[]> {
    return await this.eventService.getAllEvents();
  }

  @Get('/:id')
  @SuccessResponse('200', 'OK')
  public async getEventById(@Path() id: string): Promise<EventResponseDto> {
    return await this.eventService.getEventById(id);
  }

  @Get('/format/:format')
  @SuccessResponse('200', 'OK')
  public async getEventsByFormat(@Path() format: string): Promise<EventResponseDto[]> {
    return await this.eventService.getEventsByFormat(format);
  }

  @Get('/type/:eventType')
  @SuccessResponse('200', 'OK')
  public async getEventsByType(@Path() eventType: string): Promise<EventResponseDto[]> {
    return await this.eventService.getEventsByType(eventType);
  }

  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async updateEvent(
    @Path() id: string,
    @Body() body: UpdateEventDto
  ): Promise<EventResponseDto> {
    return await this.eventService.updateEvent(id, body);
  }

  @Delete('/:id')
  @SuccessResponse('200', 'Event deleted successfully')
  public async deleteEvent(@Path() id: string): Promise<{ message: string }> {
    await this.eventService.deleteEvent(id);
    return { message: 'Event deleted successfully' };
  }
}