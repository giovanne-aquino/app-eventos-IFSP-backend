import { PrismaClient, User } from '@prisma/client';
import { IAuthService, LoginDto, AuthResponseDto } from '../interfaces/IAuthService';
import { CreateUserDto } from '../../dtos/users/CreateUserRequestDTO';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { createUserSchema } from '../../zod/schemas/user/userSchema';
import { UnauthorizedError } from '../../utils/errors/apiErrors';

export class AuthService implements IAuthService {
  private prisma: PrismaClient;
  private readonly JWT_SECRET: string;
  private readonly JWT_REFRESH_SECRET: string;
  private readonly TOKEN_EXPIRATION: number;
  private readonly REFRESH_TOKEN_EXPIRATION: number;

  constructor() {
    this.prisma = new PrismaClient();
    this.JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
    this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
    this.TOKEN_EXPIRATION = 24 * 60 * 60; // 24 horas em segundos
    this.REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60; // 7 dias em segundos
  }

  private generateTokens(user: User): { token: string; refreshToken: string } {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.userRole
    };

    const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.TOKEN_EXPIRATION });
    const refreshToken = jwt.sign(payload, this.JWT_REFRESH_SECRET, { expiresIn: this.REFRESH_TOKEN_EXPIRATION });

    return { token, refreshToken };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email }
    });

    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    const { token, refreshToken } = this.generateTokens(user);

    // Atualiza o refreshToken no banco
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    const { password, ...userWithoutPassword } = user;
    return { token, refreshToken, user: userWithoutPassword };
  }

  async register(userData: CreateUserDto): Promise<AuthResponseDto> {
    // Valida os dados do usuário
    const validatedData = createUserSchema.parse(userData);

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword
      }
    });

    const { token, refreshToken } = this.generateTokens(user);

    // Atualiza o refreshToken no banco
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    const { password, ...userWithoutPassword } = user;
    return { token, refreshToken, user: userWithoutPassword };
  }

  async refreshToken(token: string): Promise<AuthResponseDto> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { refreshToken: token }
      });

      if (!user) {
        throw new UnauthorizedError('Refresh token inválido');
      }

      const { token: newToken, refreshToken: newRefreshToken } = this.generateTokens(user);

      // Atualiza o refreshToken no banco
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken }
      });

      const { password, ...userWithoutPassword } = user;
      return { token: newToken, refreshToken: newRefreshToken, user: userWithoutPassword };
    } catch (error) {
      throw new UnauthorizedError('Refresh token inválido');
    }
  }

  async logout(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null }
    });
  }

  async validateToken(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { id: number };
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id }
      });

      if (!user) {
        throw new UnauthorizedError('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedError('Token inválido');
    }
  }
} 