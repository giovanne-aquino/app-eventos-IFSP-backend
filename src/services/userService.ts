import { CreateUserDto } from '../dtos/users/CreateUserRequestDTO';
import { userRepository } from '../repository/userRepository';
import bcrypt from 'bcryptjs';
import { UserRole } from '../enums/enums';

export class UserService {
  async createUser(data: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userWithPasswordEncrypted = {
      ...data, 
      password: hashedPassword,
      userRole: 'PARTICIPANT' as UserRole
    }

    return userRepository.create(userWithPasswordEncrypted);
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
