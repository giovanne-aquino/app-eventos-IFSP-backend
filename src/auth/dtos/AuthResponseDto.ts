import {UserResponseDto} from "../../dtos/users/UserResponseDTO"

export class AuthResponseDto{
    token!: string;
    refreshToken!: string;
    user!: UserResponseDto;
}