import  prisma from "../prisma/client";
import { CreateUserDto } from '../dtos/users/CreateUserRequestDTO';
 //toDoRefactor types
export const userRepository = {
  findAll: () => prisma.user.findMany(),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (data: CreateUserDto) => prisma.user.create({ data }),
  update: (id: number, data: any) => prisma.user.update({ where: { id }, data }),
  delete: (id: number) => prisma.user.delete({ where: { id } }),
}