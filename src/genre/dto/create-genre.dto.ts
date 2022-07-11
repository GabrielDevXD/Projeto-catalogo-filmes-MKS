import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ description: ' gênero do filme', example: 'Terror' })
  @IsString()
  name: string;
}
