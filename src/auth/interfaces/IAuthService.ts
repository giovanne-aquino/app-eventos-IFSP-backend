import { User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/users/CreateUserRequestDTO";
import { z } from 'zod';
import { loginSchema, authResponseSchema } from '../../zod/schemas/auth/authSchema';

// Tipos inferidos dos schemas
export type LoginDto = z.infer<typeof loginSchema>;
export type AuthResponseDto = z.infer<typeof authResponseSchema>;

export interface IAuthService {
  login(loginDto: LoginDto): Promise<AuthResponseDto>;
  register(user: CreateUserDto): Promise<AuthResponseDto>;
  refreshToken(token: string): Promise<AuthResponseDto>;
  logout(userId: number): Promise<void>;
  validateToken(token: string): Promise<User>;
} 