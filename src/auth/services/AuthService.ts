import { PrismaClient, User } from '@prisma/client';
import { IAuthService} from '../interfaces/IAuthService';
import {AuthResponseDto} from "../dtos/AuthResponseDto"
import { LoginDto } from "../dtos/LoginDto";
import { CreateUserDto } from '../../dtos/users/CreateUserRequestDTO';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { createUserSchema } from '../../zod/schemas/user/userSchema';
import { UnauthorizedError } from '../../utils/errors/apiErrors';
import { UserResponseDto } from '../../dtos/users/UserResponseDTO';

/*
  Seria bom refatorar esse service...talvez jogar um pouco pro Repository para encapsular a 
  lógica de dados somente lá e regra de negócio aqui. Instânciar o Prisma diretamente e poder
  manipular todas as db pode ser bem entendível, mas viola o SOLID.

*/

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

// #region: GenerateTokens
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
// #endregion


// #region: Login
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email }
    });

    if (!user) {
      throw new UnauthorizedError('Bad credentials.');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Bad credentials.');
    }

    const { token, refreshToken } = this.generateTokens(user);

    // Atualiza o refreshToken no banco
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

     /*
      Alteranativa ao pick, achei mais intuitivo e menos estranho apenas fazer um método estático.
      Antes estava retornando dois refresh tokens diferentes, e agora não é necessário fazer a desturutração 
      já que o tipo é UserResponseDTO. Melhora a legibilidade do código, a semântica e reuzabilidade.
   */
   const userResponseDTO = UserResponseDto.fromEntity(user);
  
    return { token, refreshToken, user:userResponseDTO  };
  }

// #endregion


// #region: Register
  async register(userData: CreateUserDto): Promise<AuthResponseDto> {
    // Valida os dados do usuário
    const validatedData = createUserSchema.parse(userData);

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);


    /*
      Se um usuário se registar, ele automaticamente será participant.
      A escolha da role deve ser feita apenas pelo ADMIN(rota users pura, será reformulada)
      No caso, no front nem vai ter a opção de setar role, mas, se vier, será sobrescrita.
      O próprio prisma já seta PARTICIPANT como default, mas é bom ter certeza em uma possível 
      tentativa de injection.
    */

    //Adicionando a senha criptografada ao banco e a role default.
    const user = await this.prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
        userRole: 'PARTICIPANT',
      }
    });

    const { token, refreshToken } = this.generateTokens(user);

    // Atualiza o refreshToken no banco
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    const userResponse = UserResponseDto.fromEntity(user);
    return { token, refreshToken, user: userResponse };
  }

// #endregion


// #region: RefreshToken
  async refreshToken(token: string): Promise<AuthResponseDto> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { refreshToken: token }
      });

      if (!user) {
        throw new UnauthorizedError('Refresh token invalid.');
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
      throw new UnauthorizedError('Refresh token invalid.');
    }
  }
// #endregion


  // #region: Logout
    async logout(userId: number): Promise<void> {
      await this.prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null }
      });
    }
  // #endregion


  // #region: ValidateToken
    async validateToken(token: string): Promise<User> {
      try {
        const decoded = jwt.verify(token, this.JWT_SECRET) as { id: number };
        const user = await this.prisma.user.findUnique({
          where: { id: decoded.id }
        });

        if (!user) {
          throw new UnauthorizedError('User not found.');
        }

        return user;
      } catch (error) {
        throw new UnauthorizedError('Invalid Token.');
      }
    }
  // #endregion
} 