import { User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/users/CreateUserRequestDTO";

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export interface IAuthService {
  login(loginDto: LoginDto): Promise<AuthResponseDto>;
  register(user: CreateUserDto): Promise<AuthResponseDto>;
  refreshToken(token: string): Promise<AuthResponseDto>;
  logout(userId: number): Promise<void>;
  validateToken(token: string): Promise<User>;
} 