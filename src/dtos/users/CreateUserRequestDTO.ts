export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  CPFCNPJ?: string;
  CRM?: string;
  nationalID?: string;
}