import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  emailConfirmationToken: string;
}

export default CreateUserDto;
