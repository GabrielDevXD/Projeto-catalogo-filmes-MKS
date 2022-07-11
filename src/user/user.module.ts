import { Module } from '@nestjs/common';


import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
HomepageModule
import { PassportModule } from '@nestjs/passport';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';
import { FilmesModule } from 'src/filmes/filmes.module';
import { ProfileModule } from 'src/profile/profile.module';
import { HomepageModule } from 'src/homepage/homepage.module';
import { GenreModule } from 'src/genre/genre.module';

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
