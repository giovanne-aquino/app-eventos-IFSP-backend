import {
    Body,
    Controller,
    Post,
    Route,
    Tags,
    SuccessResponse,
    Response,
  } from 'tsoa';
  import { EventFieldResponse } from '@prisma/client';
  import { CreateEventFieldResponseDto } from '../dtos/events/CreateEventFieldResponseResquestDTO';
  import { EventFieldResponse2Dto } from "../dtos/events/EventFieldResponse2DTO";
  import { EventFieldResponseService } from '../services/eventFieldResponseService';
  import { ValidateError } from 'tsoa';
  import { createEventFieldResponseSchema } from '../zod/schemas/event/eventFieldResponseSchema';
  import { zodToTsoaErrors } from '../utilis/zodToTsoaErrors';
  
  @Route('event-field-responses')
  @Tags('EventFieldResponse')
  export class EventFieldResponseController extends Controller {
    private service = new EventFieldResponseService();
  
    @Post()
    @SuccessResponse('201', 'Created')
    @Response<ValidateError>('400', 'Validation failed')
    public async createEventFieldResponse(
      @Body() body: CreateEventFieldResponseDto
    ): Promise<EventFieldResponse> {
      const parsed = await createEventFieldResponseSchema.parseAsync(body).catch((error) => {
        throw new ValidateError(zodToTsoaErrors(error.issues), 'Validation failed');
      });
  
      return this.service.create(parsed);
    }
  }
  