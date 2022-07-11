""
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { LoggedUser } from '../auth/logged-user.decorator';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from './entities/filme.entity';
import { FilmeService } from './filmes.service';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Filmes } from '@prisma/client';




@ApiTags('Filmes')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('Filmes')
export class FilmeController{
  constructor(private readonly filmeService: FilmeService) {}
  @Get()
  @ApiOperation({
    summary: 'Listar todos os filmes',
  })
  findAll(): Promise<Filmes[]> {
    return this.filmeService.findAll();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Achar um filmes por ID',
  })
  findOne(@Param('id') id: string): Promise<Filmes> {
    return this.filmeService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar um filme',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateFilmeDto): Promise<Filmes> {
    return this.filmeService.create(dto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Fazer a atualização do filme por um id',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateFilmeDto,
  ): Promise<Filmes> {
    return this.filmeService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um filme por id',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    return this.filmeService.delete(id, user);
  }
}
