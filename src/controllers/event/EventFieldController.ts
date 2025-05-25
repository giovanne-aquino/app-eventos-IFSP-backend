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
import { EventFieldService } from '../../services/event/eventFieldService'; // Ajuste o caminho
import { ValidateError } from 'tsoa';
// Importe o schema Zod e utilitário se você tiver validação Zod para EventField
import { createEventFieldSchema } from '../../zod/schemas/event/eventFieldSchema';
import { zodToTsoaErrors } from '../../utilis/zodToTsoaErrors';

@Route('eventFields') // A rota será 'eventFields'
@Tags('Event Field') // A tag para a documentação Tsoa
export class EventFieldController extends Controller {
  private service = new EventFieldService();

  @Post()
  @SuccessResponse('201', 'Created')
  @Response<ValidateError>('400', 'Validation failed')
  public async createEventField(
    @Body() body: CreateEventFieldRequestDTO
  ): Promise<EventField> {
    // Se você tiver um schema Zod para CreateEventFieldRequestDTO, use-o aqui
    // const parsed = await createEventFieldSchema.parseAsync(body).catch((error) => {
    //   throw new ValidateError(zodToTsoaErrors(error.issues), 'Validation failed');
    // });
    // return this.service.create(parsed);

    // Caso contrário, apenas passe o body diretamente
    return this.service.create(body);
  }

  @Get('/')
  @SuccessResponse('200', 'OK')
  @Response<ValidateError>('400', 'Bad Request')
  public async getAllEventFields(): Promise<EventField[]> {
    // Não usamos try/catch aqui, o erro será capturado pelo ErrorHandlerMiddleware
    return await this.service.findAll();
  }

  @Put('{id}')
  @SuccessResponse('200', 'OK')
  @Response<ValidateError>('400', 'Bad Request')
  @Response<Error>('404', 'Not Found') // Adicionado para documentar 404
  public async updateEventField(
    @Path() id: number,
    @Body() body: Partial<UpdateEventFieldRequestDTO>
  ): Promise<EventField> {
    // Não usamos try/catch aqui, o erro será capturado pelo ErrorHandlerMiddleware
    return await this.service.update(id, body);
  }

  @Delete('{id}')
  @SuccessResponse('204', 'Deleted successfully')
  @Response<ValidateError>('400', 'Bad Request')
  @Response<Error>('404', 'Not Found') // Adicionado para documentar 404
  public async deleteEventField(@Path() id: number): Promise<void> {
    // Não usamos try/catch aqui, o erro será capturado pelo ErrorHandlerMiddleware
    await this.service.delete(id);
  }
}