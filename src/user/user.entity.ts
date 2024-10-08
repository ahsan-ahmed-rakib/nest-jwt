import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserEntity {
  @Prop()
  email: string;
  @Prop()
  username: string;
  @Prop({ select: false })
  password: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
