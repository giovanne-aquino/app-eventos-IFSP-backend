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
import { CreateEventFieldResponseDto } from '../../dtos/events/CreateEventFieldResponseResquestDTO';
import { EventFieldResponse2Dto } from "../../dtos/events/EventFieldResponse2DTO";
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
  @Response<ValidateError>('400', 'Bad Request')
  public async getAllEventFieldResponses(): Promise<EventFieldResponse2Dto[]> {
    try {
      return await this.service.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
      }
      throw new ValidateError({ general: { message: 'Unknown error while fetching event field responses' } }, 'Bad Request');
    }
  }

  @Put('/:id')
  @SuccessResponse('200', 'OK')
  @Response<ValidateError>('400', 'Bad Request')
  public async updateEventFieldResponse(
    @Path() id: string,
    @Body() body: Partial<CreateEventFieldResponseDto>
  ): Promise<EventFieldResponse> {
    try {
      return await this.service.update(id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
      }
      throw new ValidateError({ general: { message: 'Unknown error updating the event field response' } }, 'Bad Request');
    }
  }

  @Delete('/:id')
  @SuccessResponse('204', 'deleted successfully')
  @Response<ValidateError>('400', 'Bad Request')
  public async deleteEventFieldResponse(@Path() id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidateError({ general: { message: error.message } }, 'Bad Request');
      }
      throw new ValidateError({ general: { message: 'Unknown error deleting the event field response' } }, 'Bad Request');
    }
  }
}