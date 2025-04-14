import { CreateActivityDTO } from "../dtos/activities/CreateActivityRequestDTO";
import { activityRepository } from "../repository/activityRepository";

export class ActivityService {
    async createActivity(data: CreateActivityDTO) {
        return activityRepository.create(data);
    }
}