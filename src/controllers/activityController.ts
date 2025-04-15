import {
    Body,
    Controller,
    Get,
    Post,
    Route,
    Tags,
    Path,
    Put,
    Delete,
    ValidateError,
  } from 'tsoa';
  
  import { CreateActivityDto } from '../dtos/activities/CreateActivityRequestDTO';
  import { createActivitySchema } from '../zod/schemas/activity/activitySchema';
  import { ActivityService } from '../services/activityService';
  import { zodToTsoaErrors } from '../utilis/zodToTsoaErrors';
  
  @Route('activities')
  @Tags('Activities')
  export class ActivityController extends Controller {
    private activityService = new ActivityService();
  
    // Criar atividade
    @Post()
    public async createActivity(@Body() body: CreateActivityDto) {
      const parsed = createActivitySchema.safeParse(body);
      if (!parsed.success) {
        throw new ValidateError(zodToTsoaErrors(parsed.error.issues), 'Validation failed');
      }
  
      return this.activityService.createActivity(body);
    }
  
    // Obter uma atividade por ID
    @Get('{id}')
    public async getActivity(@Path() id: number) {
      return this.activityService.getActivityById(id);
    }
  
    // Atualizar uma atividade por ID
    @Put('{id}')
    public async updateActivity(
      @Path() id: number,
      @Body() body: CreateActivityDto
    ) {
      const parsed = createActivitySchema.safeParse(body);
      if (!parsed.success) {
        throw new ValidateError(zodToTsoaErrors(parsed.error.issues), 'Validation failed');
      }
  
      return this.activityService.updateActivity(id, body);
    }
  
    // Deletar uma atividade por ID
    @Delete('{id}')
    public async deleteActivity(@Path() id: number) {
      return this.activityService.deleteActivity(id);
    }
  }
  