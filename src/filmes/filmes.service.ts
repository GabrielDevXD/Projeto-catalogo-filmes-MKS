import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto, user: User) {
    if (user.isAdmin) {
      const data: Prisma.FilmesCreateInput = {
        title: createFilmeDto.title,
        description: createFilmeDto.description,
        coverImageUrl: createFilmeDto.coverImageUrl,
        year: createFilmeDto.year,
        imdbScore: createFilmeDto.imdbScore,
        trailerYoutubeUrl: createFilmeDto.trailerYoutubeUrl,
        charactersMain: createFilmeDto.charactersMain,

        Genre: {
          connect: {
            name: createFilmeDto.genreName,
          },
        },
      };

      return await this.prisma.filmes
        .create({
          data,
          include: {
            Genre: true,
          },
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  findAll() {
    return this.prisma.filmes.findMany({
      include: {
        Genre: true,
      },
    });
  }
  async findById(id: string) {
    const record = await this.prisma.filmes.findUnique({
      where: {
        id: id,
      },
      include: {
        Genre: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async update(id: string, dto: UpdateFilmeDto, user: User) {
    if (user.isAdmin) {
      const filmeAtual = await this.findById(id);
      const data: Prisma.FilmesUpdateInput = {
        title: dto.title,
        description: dto.description,
        coverImageUrl: dto.coverImageUrl,
        year: dto.year,
        imdbScore: dto.imdbScore,
        trailerYoutubeUrl: dto.trailerYoutubeUrl,
        Genre: {
          disconnect: {
            name: filmeAtual.Genre[0].name,
          },
          connect: {
            name: dto.genreName,
          },
        },
      };
      return await this.prisma.filmes
        .update({
          where: { id },
          data,
          include: {
            Genre: true,
          },
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);
      await this.prisma.filmes.delete({ where: { id } });
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    throw new UnprocessableEntityException(
      lastErrorLine || `Algum erro inesperado ocorreu`,
    );
  }
}
