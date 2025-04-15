import {
    Body,
    Controller,
    Get,
    Post,
    Route,
    Tags,
    Path,
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
        const parsed = createEventSchema.safeParse(body);
        if (!parsed.success) {
            throw new ValidateError(zodToTsoaErrors(parsed.error.issues), 'Validation failed');
        }
        return this.eventService.createEvent(body);
    }
}
