import { activityRepository } from '../repository/activityRepository';
import { CreateActivityDto } from '../dtos/activities/CreateActivityRequestDTO';

export class ActivityService {
  async createActivity(data: CreateActivityDto) {
    return activityRepository.create(data);
  }

  async getAllActivities() {
    return activityRepository.findAll();
  }

  async getActivityById(id: number) {
    return activityRepository.findById(id);
  }

  async getActivitiesByEventId(eventId: number) {
    return activityRepository.findByEventId(eventId);
  }

  async updateActivity(id: number, data: Partial<CreateActivityDto>) {
    return activityRepository.update(id, data);
  }

  async deleteActivity(id: number) {
    return activityRepository.delete(id);
  }
}
