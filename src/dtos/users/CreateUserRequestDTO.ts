export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  cpf?: string;
  cnpj?: string;
  crm?: string;
  nationalId?: string;
  userRole!: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT'; 
}