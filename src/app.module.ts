import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmesModule } from './filmes/filmes.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [FilmesModule],
})
export class AppModule {}
