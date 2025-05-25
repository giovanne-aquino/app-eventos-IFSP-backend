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

import { EventField } from '@prisma/client';
import { CreateEventFieldRequestDTO } from '../../dtos/events/CreateEventFieldRequestDTO';
import { UpdateEventFieldRequestDTO } from '../../dtos/events/UpdateEventFieldRequestDTO';
import { EventFieldService } from '../../services/event/eventFieldService'; 
import { ValidateError } from 'tsoa';
import { createEventFieldSchema } from '../../zod/schemas/event/eventFieldSchema';
import { zodToTsoaErrors } from '../../utilis/zodToTsoaErrors';


@Route('eventFields') 
@Tags('Event Field') 
export class EventFieldController extends Controller {
  private service = new EventFieldService();

  @Post()
  @SuccessResponse('201', 'Created')
  @Response<ValidateError>('400', 'Validation failed')
  public async createEventField(
    @Body() body: CreateEventFieldRequestDTO
  ): Promise<EventField> {
    const parsed = await createEventFieldSchema.parseAsync(body)
      .catch((error) => { 
        throw new ValidateError(zodToTsoaErrors(error.issues), 'Validation failed');
      });
    return this.service.create(parsed);
  }

  @Get('/')
  @SuccessResponse('200', 'OK')
  public async getAllEventFields(): Promise<EventField[]> {
    return await this.service.findAll();
  }

  @Put('{id}')
  @SuccessResponse('200', 'OK')
  @Response<ValidateError>('400', 'Bad Request')
  @Response<Error>('404', 'Not Found')
  public async updateEventField(
    @Path() id: number,
    @Body() body: Partial<UpdateEventFieldRequestDTO>
  ): Promise<EventField> {
    return await this.service.update(id, body);
  }

  @Delete('{id}')
  @SuccessResponse('204', 'Deleted successfully')
  @Response<ValidateError>('400', 'Bad Request')
  @Response<Error>('404', 'Not Found') 
  public async deleteEventField(@Path() id: number): Promise<void> {
    await this.service.delete(id);
  }
}