import { Filme } from 'src/filmes/entities/filme.entity';
import { User } from 'src/user/entities/user.entity';

export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  user?: User;
  filmes?: Filme;
  favoitefilmeId?: string;
}
