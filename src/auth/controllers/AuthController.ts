import { Body, Controller, Get, Path, Post, Route, Security, Request } from 'tsoa';
import { AuthService } from '../services/AuthService';
import { LoginDto, AuthResponseDto } from '../interfaces/IAuthService';
import { CreateUserDto } from '../../dtos/users/CreateUserRequestDTO';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { User } from '@prisma/client';

@Route('auth')
export class AuthController extends Controller {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  /**
   * Login de usuário
   */
  @Post('/login')
  public async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
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
    return this.authService.refreshToken(body.refreshToken);
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
  public async getCurrentUser(@Request() req: AuthenticatedRequest): Promise<Omit<User, 'password' | 'refreshToken'>> {
    if (!req.user?.id) {
      this.setStatus(401);
      return {} as Omit<User, 'password' | 'refreshToken'>;
    }
    const user = await this.authService.validateToken(req.headers.authorization?.split(' ')[1] || '');
    const { password, refreshToken, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;
  }
} 