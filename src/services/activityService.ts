import { activityRepository } from '../repository/activityRepository';
import { CreateActivityDto } from '../dtos/activities/CreateActivityRequestDTO';

interface PaginatedActivitiesResponse {
  activities: CreateActivityDto[];
  total: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

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

  async getActivitiesByEventId(
    eventId: number,
    skip: number,
    take: number
  ): Promise<{ activities: CreateActivityDto[], total: number }> {
    const result = await activityRepository.findByEventId(eventId, skip, take);
    return result;
  }

  async updateActivity(id: number, data: Partial<CreateActivityDto>) {
    return activityRepository.update(id, data);
  }

  async deleteActivity(id: number) {
    return activityRepository.delete(id);
  }
}
