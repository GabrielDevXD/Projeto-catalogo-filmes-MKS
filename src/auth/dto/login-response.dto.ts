import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class ResponseLogin {
  @ApiProperty({
    description: 'Token gerado pelo jwt',
    example:
      'TokeneyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbGxiYmVyYmFyY2Fyb2xvQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAzNDk2OSwiZXhwIjoxNjU0MTIxMzY5fQ.hb8VdUIK07O3-vV3UUbq_nCvNvChE5ceQuXaQz51v-U',
  })
  @ApiProperty({
    description: 'Dados do user autenticado',
  })
  token: string;
  user: User;
}
