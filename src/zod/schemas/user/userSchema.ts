import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  CPFCNPJ: z.string().optional(),
  CRM: z.string().optional(),
  nationalID: z.string().optional(),
}).strict();

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
})