import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<any> {}
}
