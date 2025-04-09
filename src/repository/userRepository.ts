import  prisma from "../prisma/client";
 //toDoRefactor types
export const userRepository = {
  findAll: () => prisma.user.findMany(),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (data: { name: string; email: string; password: string; CPFCNPJ?: string; CRM?:string; nationalID?: string }) => prisma.user.create({ data }),
  update: (id: number, data: any) => prisma.user.update({ where: { id }, data }),
  delete: (id: number) => prisma.user.delete({ where: { id } }),
}