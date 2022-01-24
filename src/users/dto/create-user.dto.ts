import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export default CreateUserDto;
