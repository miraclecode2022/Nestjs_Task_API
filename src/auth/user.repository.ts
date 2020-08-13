import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as brypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { userName, password } = authCredentialDto;

    const salt = await brypt.genSaltSync(8);

    // console.log(salt);

    const user = new User();
    user.userName = userName;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    console.log(user.password);

    try {
      await user.save();
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        // duplicate userName
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialDto,
  ): Promise<string> {
    const { userName, password } = authCredentialsDto;

    const user = await this.findOne({ userName });

    if (user) {
      const matchPass = await brypt.compare(password, user.password);
      if (matchPass) {
        return user.userName;
      } else {
        return null;
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return brypt.hashSync(password, salt);
  }
}
