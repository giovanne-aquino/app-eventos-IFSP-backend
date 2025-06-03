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
  Query,
} from 'tsoa';
  
import { CreateActivityDto } from '../../dtos/activities/CreateActivityRequestDTO';
import { UpdateActivityDTO } from '../../dtos/activities/UpdateActivityDTO';
import { createActivitySchema } from '../../zod/schemas/activity/activitySchema';
import { updateActivitySchema } from '../../zod/schemas/activity/activitySchema';
import { ActivityService } from '../../services/activityService';
import { zodToTsoaErrors } from '../../utilis/zodToTsoaErrors';
import { numericIdParamSchema } from '../../zod/schemas/common/validateParmsId';
import { validateParams } from '../../utilis/validateIdParams';
import { ActivityResponseDTO } from '../../dtos/activities/ActivityResponseDTO';

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
    const { id: activityId } = validateParams(numericIdParamSchema, { id })
    return this.activityService.getActivityById(activityId);
  }
  
  //Obter todas as atividades de um evento
  @Get('event/{eventId}')
  public async getActivitiesByEventId(
    @Path() eventId: number,
    @Query() page?: number,
    @Query() pageSize?: number
  ) {
    const { id: activityId } = validateParams(numericIdParamSchema, { id: eventId })

    const currentPage = (page && Number(page) > 0) ? Number(page) : 1;
    const intemsPerPage = (pageSize && Number(pageSize) > 0) ? Number(pageSize) : 10;

    const skip = (currentPage - 1) * intemsPerPage;
    const take = intemsPerPage;

    return this.activityService.getActivitiesByEventId(activityId, skip, take); 
  }

  //Obter todas as atividades
  @Get()
  public async getAllActivities() {
    return this.activityService.getAllActivities();
  }

  // Atualizar uma atividade por ID
  @Put('{id}')
  public async updateActivity(@Path() id: string, @Body() body: Partial<UpdateActivityDTO>): Promise<ActivityResponseDTO> {
    console.log('entrou aqui no updateActivity');
    updateActivitySchema.parse(body);
    
    const { id: activityId } = validateParams(numericIdParamSchema, { id });
    return this.activityService.updateActivity(activityId, body);
  }

  // Deletar uma atividade por ID
  @Delete('{id}')
  public async deleteActivity(@Path() id: number) {
    return this.activityService.deleteActivity(id);
  }
}