import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/user.dto';
import { UserResponseType } from './types/userResponse.type';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) {
      throw new HttpException(
        'Email is alreay taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async loginUser(loginDto: LoginDto): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');

    if (!user) {
      throw new HttpException(
        'User not found!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect password!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      username: userEntity.username,
      email: userEntity.email,
    };
  }
}
