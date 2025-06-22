import { z } from 'zod'
import {createUserSchema} from "../user/userSchema";

// Schema para login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
}).strict();

// Schema para refresh token
export const refreshTokenSchema = z.object({
  token: z.string().min(1, "Token de refresh é obrigatório")
}).strict();

// Schema para resposta de autenticação
export const authResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  user: createUserSchema.omit({
    password: true,
  })
}).strict();

// Schema para validação de token JWT
export const jwtTokenSchema = z.string().min(1, "Token JWT é obrigatório"); 