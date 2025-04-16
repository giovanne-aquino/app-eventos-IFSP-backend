import {
    Body,
    Controller,
    Post,
    Route,
    Tags,
    Response,
    SuccessResponse,
} from 'tsoa';
import { EventService } from '../services/eventService';
import { CreateEventDto } from "../dtos/events/CreateEventRequestDTO";
import { EventResponseDto } from "../dtos/events/EventResponseDTO";
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
}
