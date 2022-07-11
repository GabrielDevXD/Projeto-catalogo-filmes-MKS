import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenreModule } from './genre/genre.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HomepageModule } from './homepage/homepage.module';
import { PassportModule } from '@nestjs/passport';
import { FilmesModule } from './filmes/filmes.module';

@Module({
  imports: [
    FilmesModule,
    GenreModule,
    ProfileModule,
    UserModule,
    AuthModule,
    HomepageModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
