import {
    Body,
    Controller,
    Get,
    Post,
    Route,
    Tags,
    Path,
    Put,
    Delete,
    ValidateError,
    Request,
    Security
  } from 'tsoa'
  
  import { CreateUserDto } from '../dtos/users/CreateUserRequestDTO'
  import { UserService } from '../services/userService'
  import { UserResponseDto } from '../dtos/users/UserResponseDTO'
  import { updateUserSchema } from '../zod/schemas/user/userSchema'
  import { numericIdParamSchema } from '../zod/schemas/common/validateParmsId';
  import { validateParams } from '../utils/validateIdParams';
  import { createUserSchema } from '../zod/schemas/user/userSchema';
import { zodToTsoaErrors } from '../utils/zodToTsoaErrors'
import { AuthenticatedRequest } from '../auth/middlewares/authMiddleware'
import { UnauthorizedError } from '../utils/errors/apiErrors'
  @Route('users')
  @Tags('Users')
  export class UserController extends Controller {
    private userService = new UserService()
  //toDoRefactor this
    @Post()
    public async createUser(@Body() body: CreateUserDto): Promise<UserResponseDto> {
        const parsed = createUserSchema.safeParse(body)
        if (!parsed.success) {
            const issues = parsed.error.issues;
            throw new ValidateError(zodToTsoaErrors(issues), "Validation failed");
          }
        return this.userService.createUser(body);
    }
  
    @Get()
    public async getUsers(): Promise<UserResponseDto[]> {
      console.log("chegou no getUsers");
      return this.userService.getUsers();
    }
  
    @Get('{id}')
    public async getUser(@Path() id: string): Promise<UserResponseDto | null> {
        console.log("chegou aqui");
        const { id: userId } = validateParams(numericIdParamSchema, { id });
        return this.userService.getUser(userId);
    }
  
    @Put('{id}')
    @Security('jwt', ['ADMIN', 'PARTICIPANT', 'ORGANIZER'])
    public async updateUser(
      @Path() id: string, 
      @Body() body: Partial<CreateUserDto>,
      @Request() request: AuthenticatedRequest
    ): Promise<UserResponseDto> {
      updateUserSchema.parse(body);
      const { id: userId } = validateParams(numericIdParamSchema, { id });

      // Verifica se o usuário é admin ou dono da conta
      if (request.user?.role !== 'ADMIN' && request.user?.id !== userId) {
        throw new UnauthorizedError('Você só pode atualizar sua própria conta ou ser um administrador');
      }

      return this.userService.updateUser(userId, body);
    }
  
    @Delete('{id}')
    @Security('jwt', ['ADMIN', 'PARTICIPANT', 'ORGANIZER'])
    public async deleteUser(
      @Path() id: string,
      @Request() request: AuthenticatedRequest
    ): Promise<void> {
      const { id: userId } = validateParams(numericIdParamSchema, { id });
      
      // Verifica se o usuário é admin ou dono da conta
      if (request.user?.role !== 'ADMIN' && request.user?.id !== userId) {
        throw new UnauthorizedError('Você só pode deletar sua própria conta ou ser um administrador');
      }

      await this.userService.deleteUser(userId);
    }
  }
  