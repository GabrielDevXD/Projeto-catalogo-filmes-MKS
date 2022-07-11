import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Filme } from 'src/filmes/entities/filme.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.profile.findMany({
      include: {
        user: true,
        filme: true,
        favoitefilme: {
          select: {
            filme: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: {
        filme: true,
        favoitefilme: {
          select: {
            filme: true,
            id: true,
          },
        },
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro de ID '${id}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  async create(userId: string, dto: CreateProfileDto) {
    if (dto.FilmeId) {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
            filme: {
              connect: {
                id: dto.FilmeId,
              },
            },
          },
          include: {
            filme: true,
            favoitefilme: true,
          },
        })
        .catch(this.handleError);
    } else {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { filme: true, favoitefilme: true },
        })
        .catch(this.handleError);
    }
  }
  async addOrRemoveFavoriteFilme(profileId: string, FilmeId: string) {
    const user = await this.findById(profileId);
    let favoitedfilme = false;
    if (user.favoitefilme != null) {
      user.favoitefilme.filme.map((filme) => {
        if (FilmeId === filme.id) {
          favoitedfilme = true;
        }
      });
    } else {
      return this.prisma.favoriteFilmes.create({
        data: {
          profile: {
            connect: {
              id: profileId,
            },
          },
          filme: {
            connect: {
              id: FilmeId,
            },
          },
        },
      });
    }
    if (favoitedfilme) {
      return await this.prisma.favoriteFilmes.update({
        where: {
          id: user.favoitefilme.id,
        },
        data: {
          filme: {
            disconnect: {
              id: FilmeId,
            },
          },
        },
      });
    } else {
      return await this.prisma.favoriteFilmes.update({
        where: {
          id: user.favoitefilme.id,
        },
        data: {
          filme: {
            connect: {
              id: FilmeId,
            },
          },
        },
      });
    }
  }
  async update(userId: string, id: string, dto: UpdateProfileDto) {
    const user = await this.findById(id);

    if (dto.FilmeId) {
      let FilmeExist = false;
      user.filme.map((FilmeId) => {
        if (FilmeId.id == dto.FilmeId) {
          FilmeExist = true;
        }
      });
      if (FilmeExist) {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: userId,
              filme: {
                disconnect: {
                  id: dto.FilmeId,
                },
              },
            },
            include: { filme: true },
          })
          .catch(this.handleError);
      } else {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: userId,
              filme: {
                connect: {
                  id: dto.FilmeId,
                },
              },
            },
            include: { filme: true },
          })
          .catch(this.handleError);
      }
    } else {
      return this.prisma.profile
        .update({
          where: { id: id },
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { filme: true },
        })
        .catch(this.handleError);
    }
  }

  async delete(userId: string, id: string) {
    const profile = await this.findById(id);
    await this.prisma.favoriteFilmes.delete({
      where: {
        id: profile.favoitefilme.id,
      },
    });
    await this.prisma.profile.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    console.error(error);
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    throw new UnprocessableEntityException(
      lastErrorLine || `Ocorreu um erro ao executar`,
    );
  }
}
