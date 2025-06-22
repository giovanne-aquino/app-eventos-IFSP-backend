import { User } from '@prisma/client';

export class UserResponseDto {
  id!: number;
  name!: string;
  email!: string;
  CPFCNPJ?: string | null;
  CRM?: string | null;
  nationalId?: string | null;

  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.CPFCNPJ = user.cpf ?? user.cnpj ?? null;
    dto.CRM = user.crm ?? null;
    dto.nationalId = user.nationalId ?? null;
    return dto;
  }
}