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
    Query,
} from 'tsoa';
import { EventService } from '../../services/event/eventService';
import { CreateEventDto, UpdateEventDto, EventResponseDto } from "../../dtos/events/Event.DTO";
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

  @Get('/manage')
  @SuccessResponse('200', 'OK')
  @Response<ValidateError>('400', 'Bad Request')
  public async getEvents(
      @Query() page: number = 1,
      @Query() pageSize: number = 12,
      @Query() format?: string,
      @Query() eventType?: string,
      @Query() searchTerm?: string,
      @Query() category?: string
  ): Promise<{ events: EventResponseDto[]; total: number }> {
      try {
          const { events, total } = await this.eventService.getEvents({ page, pageSize, format, eventType, searchTerm, category });
          return { events, total };
      } catch (err) {
          if (err instanceof Error) {
              throw new ValidateError({ general: { message: err.message } }, 'Bad Request');
          }
          throw new ValidateError({ general: { message: 'Unknown error while fetching events' } }, 'Bad Request');
      }
  }

    @Get('/:id')
    @SuccessResponse('200', 'OK')
    @Response<ValidateError>('400', 'Bad Request')
    @Response<string>('404', 'Not found')
    public async getEventById(@Path() id: string): Promise<EventResponseDto> {
        try {
            return await this.eventService.getEventById(id);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Not found') {
                    throw new ValidateError({ general: { message: error.message } }, 'Not Found');
                }
                throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
            }
            throw new ValidateError({ general: { message: 'Unknown error fetching the event' } }, 'Bad Request');
        }
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