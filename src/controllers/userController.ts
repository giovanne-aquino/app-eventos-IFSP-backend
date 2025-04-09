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
    ValidateError
  } from 'tsoa'
  
  import { CreateUserDto } from '../dtos/users/CreateUserRequestDTO'
  import { UserService } from '../services/userService'
  import { UserResponseDto } from '../dtos/users/UserResponseDTO'
  import { updateUserSchema } from '../zod/schemas/user/userSchema'
  import { numericIdParamSchema } from '../zod/schemas/common/validateParmsId';
  import { validateParams } from '../utilis/validateParams';
  import { createUserSchema } from '../zod/schemas/user/userSchema';
import { zodToTsoaErrors } from '../utilis/zodToTsoaErrors'
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
      return this.userService.getUsers();
    }
  
    @Get('{id}')
    public async getUser(@Path() id: string): Promise<UserResponseDto | null> {
        console.log("chegou aqui");
        const { id: userId } = validateParams(numericIdParamSchema, { id });
        return this.userService.getUser(userId);
    }
  
    @Put('{id}')
    public async updateUser(@Path() id: string, @Body() body: Partial<CreateUserDto>): Promise<UserResponseDto> {
      updateUserSchema.parse(body);
      const { id: userId } = validateParams(numericIdParamSchema, { id });
      return this.userService.updateUser(userId, body);
    }
  
    @Delete('{id}')
    public async deleteUser(@Path() id: string): Promise<void> {
      const { id: userId } = validateParams(numericIdParamSchema, { id });
      await this.userService.deleteUser(userId);
    }
  }
  