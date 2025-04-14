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

import { CreateActivityDto } from '../dtos/activities/CreateActivityRequestDTO';
import { ActivityService } from '../services/activityService';
import { activity} 