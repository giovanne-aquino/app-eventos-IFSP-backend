import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is mandatory"),
  email: z.string().email("Invalid Email "),
  password: z.string().min(6, "The password must have at least 6 digits."),
  cpf: z.string().optional(),
  crm: z.string().optional(),
  cnpj: z.string().optional(),
  nationalId: z.string().optional(),
  userRole: z.enum(['ADMIN', 'ORGANIZER', 'PARTICIPANT'], {
    required_error: 'The user role is mandatory.',
    invalid_type_error: 'Invalid user role.',
  })
}).strict();

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
})

//expansion..