import { Injectable } from '@nestjs/common';
import { CreateHomepageDto } from './dto/create-homepage.dto';
import { UpdateHomepageDto } from './dto/update-homepage.dto';

@Injectable()
export class HomepageService {
  create(createHomepageDto: CreateHomepageDto) {
    return 'This action adds a new homepage';
  }

  findAll() {
    return `This action returns all homepage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} homepage`;
  }

  update(id: number, updateHomepageDto: UpdateHomepageDto) {
    return `This action updates a #${id} homepage`;
  }

  remove(id: number) {
    return `This action removes a #${id} homepage`;
  }
}
