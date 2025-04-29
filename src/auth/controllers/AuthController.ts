import { Body, Controller, Get, Post, Route, Security, Request, ValidateError, Tags } from 'tsoa';
import { AuthService } from '../services/AuthService';
import { LoginDto } from "../dtos/LoginDto";
import {AuthResponseDto} from "../dtos/AuthResponseDto"
import { CreateUserDto } from '../../dtos/users/CreateUserRequestDTO';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { User } from '@prisma/client';
import { loginSchema, refreshTokenSchema } from '../../zod/schemas/auth/authSchema';
import { zodToTsoaErrors } from '../../utils/zodToTsoaErrors';
import { UserResponseDto } from '../../dtos/users/UserResponseDTO';

@Route('auth')
@Tags('Auth') 
export class AuthController extends Controller {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  /**
   * Login de usuário
   */

  /**
    Podemos usar essa abordagem de não usar scopes aqui porque o login, register e logout
    vão ser comuns a todas as entidades. Aí, só é necessário proteger o dashboard de cada um.

  */

  @Post('/login')
  public async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    const parsed = loginSchema.safeParse(loginDto);
    if (!parsed.success) {
      throw new ValidateError(zodToTsoaErrors(parsed.error.issues), "Validation failed");
    }
    return this.authService.login(parsed.data);
  }

  /**
   * Registro de novo usuário
   */
  @Post('/register')
  public async register(@Body() userData: CreateUserDto): Promise<AuthResponseDto> {
    
  
    return this.authService.register(userData);
  }

  /**
   * Renovação de token
   */
  @Post('/refresh')
  public async refreshToken(
    @Body() body: { refreshToken: string }
  ): Promise<AuthResponseDto> {
    const parsed = refreshTokenSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidateError(zodToTsoaErrors(parsed.error.issues), "Validation failed");
    }
    return this.authService.refreshToken(parsed.data.token);
  }

  /**
   * Logout de usuário
   */
  @Post('/logout')
  @Security('jwt')
  public async logout(@Request() req: AuthenticatedRequest): Promise<void> {
    if (!req.user?.id) {
      this.setStatus(401);
      return;
    }
    return this.authService.logout(req.user.id);
  }

  /**
   * Obter dados do usuário atual
   */
  @Get('/me')
  @Security('jwt')
  public async getCurrentUser(@Request() req: AuthenticatedRequest): Promise<UserResponseDto> {
    if (!req.user?.id) {
      this.setStatus(401);
      return {} as Omit<User, 'password' | 'refreshToken'>;
    }

    // O token já foi validado pelo middleware
    const user = await this.authService.validateToken(req.headers.authorization?.split(' ')[1] || '');
    const userResponse = UserResponseDto.fromEntity(user);
    return userResponse;
  }
} 