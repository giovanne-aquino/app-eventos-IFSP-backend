import { User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/users/CreateUserRequestDTO";
import { z } from 'zod';
import { loginSchema, authResponseSchema } from '../../zod/schemas/auth/authSchema';
import {AuthResponseDto} from "../dtos/AuthResponseDto"
import { LoginDto } from "../dtos/LoginDto";


//Retirei os tipos inferidos já que o TSOA não lida bem com eles. 


export interface IAuthService {
  login(loginDto: LoginDto): Promise<AuthResponseDto>;
  register(user: CreateUserDto): Promise<AuthResponseDto>;
  refreshToken(token: string): Promise<AuthResponseDto>;
  logout(userId: number): Promise<void>;
  validateToken(token: string): Promise<User>;
} 