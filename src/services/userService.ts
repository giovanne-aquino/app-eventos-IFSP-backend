import { CreateUserDto } from '../dtos/users/CreateUserRequestDTO';
import { userRepository } from '../repository/userRepository';

export class UserService {
  async createUser(data: CreateUserDto) {
    return userRepository.create(data);
  }

  async getUsers() {
    console.log("chegou no findall");
    return userRepository.findAll()
  }

  async getUser(id: number) {
    return userRepository.findById(id)
  }

  async updateUser(id: number, data: Partial<CreateUserDto>) {
    return userRepository.update(id, data)
  }

  async deleteUser(id: number) {
    return userRepository.delete(id)
  }
}
