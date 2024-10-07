import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    console.log('createUserDto', createUserDto);
    return 'createUser';
  }
}
