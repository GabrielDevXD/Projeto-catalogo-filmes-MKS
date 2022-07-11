import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive,  IsString, IsUrl } from 'class-validator';

export class CreateFilmeDto {
    @ApiProperty({ description: 'Nome do filme',
     example: 'Avangers the end' })
    @IsString()
    title: string;
    @ApiProperty({
      description: 'Image do filme',
      example: 'LinkDaImagem',
    })
    @IsString()
    coverImageUrl: string;
    @IsString()
    @ApiProperty({
      description: 'Descrição do filme',
      example: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
    })
    description: string;
    @ApiProperty({ description: 'ano do filme', example: 2019})
    @IsNumber()
    @IsPositive()
    year: number;
    @ApiProperty({ description: 'Nota do filme', example: 8})
    @IsNumber()
    @IsPositive()
    imdbScore: number;
    @IsUrl()
    @ApiProperty({
      description: 'trailer do filme',
      example: 'Link do trailer',
    })
    trailerYoutubeUrl: string; 
    @ApiProperty ({
      description: 'Personagem do filme',
      example:'Iron man'
    })
    @IsString()
    charactersMain :string
    genreName: string;
  }
