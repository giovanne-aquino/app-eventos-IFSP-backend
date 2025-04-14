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
    ValidateError
} from 'tsoa';

import { CreateActivityDTO } from '../dtos/activities/CreateActivityRequestDTO';
import { ActivityService } from '../services/activityService';
import { createActivitySchema } from '../zod/schemas/activity/activitySchema'; 
import { ActivityResponseDTO } from '../dtos/activities/ActivityResponseDTO';
import { numericIdParamSchema } from '../zod/schemas/common/validateParmsId';
import { validateParams } from '../utilis/validateIdParams';
import { zodToTsoaErrors } from '../utilis/zodToTsoaErrors';
@Route('activities')
@Tags('Activities')

export class ActivityController extends Controller {
    private activityService = new ActivityService();

    @Post()
    public async createActivity(@Body() body: CreateActivityDTO): Promise<ActivityResponseDTO> {
        const parsed = createActivitySchema.safeParse(body);
        if (!parsed.success) {
            const issues = parsed.error.issues;
            throw new ValidateError(zodToTsoaErrors(issues), "Validation Failed");
        }
        return this.activityService.createActivity(body)
    }
}