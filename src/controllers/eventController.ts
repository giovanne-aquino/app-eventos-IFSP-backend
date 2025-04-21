import {
    Body,
    Path,
    Controller,
    Post,
    Get,
    Put,
    Route,
    Tags,
    Response,
    SuccessResponse,
} from 'tsoa';
import { EventService } from '../services/eventService';
import { CreateEventDto } from "../dtos/events/CreateEventRequestDTO";
import { EventResponseDto } from "../dtos/events/EventResponseDTO";
import { UpdateEventDto } from "../dtos/events/UpdateEventDto";
import { createEventSchema } from '../zod/schemas/event/eventSchema';
import { ValidateError } from 'tsoa';
import { zodToTsoaErrors } from '../utilis/zodToTsoaErrors';

@Route('events')
@Tags('Events')
export class EventController extends Controller {
    private eventService = new EventService();

    @Post()
    @SuccessResponse('201', 'Created')
    @Response<ValidateError>('400', 'Validation failed')
    public async createEvent(@Body() body: CreateEventDto): Promise<EventResponseDto> {
        // Usando parseAsync para validar com async refinements
        const parsed = await createEventSchema.parseAsync(body).catch((error) => {
            throw new ValidateError(zodToTsoaErrors(error.issues), 'Validation failed');
        });
        return this.eventService.createEvent(parsed); // Usando o parsed, que agora é validado
    }

    @Get('/')
    @SuccessResponse('200', 'OK')
    @Response<ValidateError>('400', 'Bad Request')
    public async getAllEvents(): Promise<EventResponseDto[]> {
        try {
            return await this.eventService.getAllEvents();
        } catch (error) {
            if (error instanceof Error) {
                throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
            }
            throw new ValidateError({ general: { message: 'Unknown error while fetching events' } }, 'Bad Request');
        }
    }

    @Get('/:id')
    @SuccessResponse('200', 'OK')
    @Response<ValidateError>('400', 'Bad Request')
    public async getEventById(@Path() id: string): Promise<EventResponseDto> {
        try {
            return await this.eventService.getEventById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
            }
            throw new ValidateError({ general: { message: 'Unknown error fetching the event' } }, 'Bad Request');
        }
    }

    @Get('/format/:format')
    @SuccessResponse('200', 'OK')
    @Response<ValidateError>('400', 'Bad Request')
    public async getEventsByFormat(@Path() format: string): Promise<EventResponseDto[]> {
        try {
            return await this.eventService.getEventsByFormat(format);
        } catch (error) {
            if (error instanceof Error) {
                throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
            }
            throw new ValidateError({ general: { message: 'Unknown error fetching events by format' } }, 'Bad Request');
        }
    }

    @Get('/type/:eventType')
    @SuccessResponse('200', 'OK')
    @Response<ValidateError>('400', 'Bad Request')
    public async getEventsByType(@Path() eventType: string): Promise<EventResponseDto[]> {
        try {
            return await this.eventService.getEventsByType(eventType); 
        } catch (error) {
            if (error instanceof Error) {
                throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
            }
            throw new ValidateError({ general: { message: 'Unknown error fetching events by Event Type' } }, 'Bad Request');
        }
    }

    @Put('/:id')
    @SuccessResponse('200', 'OK')
    @Response<ValidateError>('400', 'Bad Request')
    public async updateEvent(
        @Path() id: string,
        @Body() body: UpdateEventDto
    ): Promise<EventResponseDto> {
        try {
            return await this.eventService.updateEvent(id, body);
        } catch (error) {
            if (error instanceof Error) {
                throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
            }
            throw new ValidateError({ general: { message: 'Unknown error updating the event' } }, 'Bad Request');
        }
    }

}
