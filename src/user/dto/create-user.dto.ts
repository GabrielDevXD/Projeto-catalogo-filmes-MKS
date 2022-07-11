import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome de usuario',
    example: 'GabrielH',
  })
  name: string;
  @IsString()
  @ApiProperty({
    description: 'Email',
    example: 'MksFilmes123@gmail.com',
  })
  email: string;
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Sua senha Esta muito fraca',
  })
  @ApiProperty({
    description: 'senha usuário',
    example: 'Test123@.',
  })
  password: string;
  @ApiProperty({
    description: 'Confirme sua senha',
    example: 'Test123@.',
  })
  confirmPassword: string;
  @IsString()
  @ApiProperty({
    description: 'cpf do usuário',
    example: '026.160.550-07',
  })
  cpf: string;

  isAdmin: boolean;
}
