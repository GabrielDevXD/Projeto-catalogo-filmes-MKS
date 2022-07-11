import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'Gabriel henrique',
  })
  title: string;
  @IsString()
  @ApiProperty({
    description: 'imagem do perfil',
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA9gk_HntcbgP55bX4R2zgDHVnLqk8Fc5wEw&usqp=CAU',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Insira o id do filme',
    example: 'id',
  })
  FilmeId?: string

  @ApiProperty({
    description: 'Insira o id do filme',
    example: 'id',
  })
  favoitefilmeId?: string;
}
