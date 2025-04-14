import { CreateActivityDto } from "../dtos/activities/CreateActivityRequestDTO";
import { activityRepository } from "../repository/activityRepository";

export class ActivityService {
    async createActivity(data: CreateActivityDto) {
        return activityRepository.create(data);
    }
}