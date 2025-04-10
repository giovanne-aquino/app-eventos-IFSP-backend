export class UserResponseDto {
    id!: number;
    name!: string;
    email!: string;
    CPFCNPJ?: string | null;
    CRM?: string | null;
    nationalId?: string | null;
  }