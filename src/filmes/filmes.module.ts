import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { FilmeController } from './filmes.controller';
import { FilmeService } from './filmes.service';
FilmeService

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [FilmeController],
  providers: [FilmeService],
})
export class FilmesModule {}
