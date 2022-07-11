import { Injectable } from '@nestjs/common';
import { Filme } from 'src/filmes/entities/filme.entity';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
        imageUrl: true,
        filme: {
          include: {
            genres: true,
          },
        },
        favoitefilme: {
          select: {
            filme: true,
          },
        },
      },
    });
    const listfilme = profileData.filme;
    const favoriteFilme= profileData.favoitefilme;
    const orderedfilme = [];
    const allGenres = await this.prisma.genre.findMany();
    allGenres.map((genre) => {
      const filmeperGenre = [];
      listfilme.map((filme) => {
        if (filme.genres[0].name == genre.name) {
          filmeperGenre.push(filme.title);
        }
      });
      const genderObj = {
        genre: genre.name,
        title: filmeperGenre,
      };
      if (filmeperGenre.length !== 0) {
        orderedfilme.push(genderObj);
      }
    });
    return {
      Filme: orderedfilme,
      favoriteFilme: favoriteFilme,
    };
  }
}
