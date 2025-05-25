import {
  Body,
  Controller,
  Get,
  Path,
  Put,
  Post,
  Delete,
  Route,
  Tags,
  SuccessResponse,
  Response,
} from 'tsoa';

import { EventFieldResponse } from '@prisma/client';
import { CreateEventFieldResponseDto, EventFieldResponse2Dto} from '../../dtos/events/EventFieldResponse.DTO';
import { EventFieldResponseService } from '../../services/event/eventFieldResponseService';
import { ValidateError } from 'tsoa';
import { createEventFieldResponseSchema } from '../../zod/schemas/event/eventFieldResponseSchema';
import { zodToTsoaErrors } from '../../utilis/zodToTsoaErrors';

@Route('eventFieldResponses')
@Tags('Event Field Response')
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

  @Get('/')
  @SuccessResponse('200', 'OK')
  public async getAllEventFieldResponses(): Promise<EventFieldResponse2Dto[]> {
    return await this.service.findAll();
  }

  @Put('/:id')
  @SuccessResponse('200', 'OK')
  public async updateEventFieldResponse(
    @Path() id: string,
    @Body() body: Partial<CreateEventFieldResponseDto>
  ): Promise<EventFieldResponse> {
    return await this.service.update(id, body);
  }

  @Delete('/:id')
  @SuccessResponse('204', 'deleted successfully')
  public async deleteEventFieldResponse(@Path() id: string): Promise<void> {
    await this.service.delete(id);
  }
}