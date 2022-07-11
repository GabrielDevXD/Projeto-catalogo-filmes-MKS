import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmesModule } from './filmes/filmes.module';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { ProfileModule } from './profile/profile.module';
import { HomepageModule } from './homepage/homepage.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [FilmesModule, AuthModule, GenreModule, ProfileModule, HomepageModule, UserModule, PrismaModule],
})
export class AppModule {}
