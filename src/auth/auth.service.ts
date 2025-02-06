import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async login(data: LoginDto): Promise<User> {
    const user = await this.userService.getBy({ email: data.email });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPassValid = await this.checkUserPass(data.password, user.password);
    if (!isPassValid) {
      throw new BadRequestException('Email or password is not correct.');
    }

    return user;
  }

  public async register(data: CreateUserDto): Promise<User> {
    const isExist = await this.userService.getBy({ email: data.email });
    if (isExist) {
      throw new BadRequestException(
        'User with this email is already registered.',
      );
    }

    const hashedPass = await this.hashUserPass(data.password);
    return this.userService.create({
      ...data,
      password: hashedPass,
    });
  }

  private async hashUserPass(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  private async checkUserPass(
    inputPassword: string,
    passwordToCompare: string,
  ): Promise<boolean> {
    console.log({ inputPassword, passwordToCompare });

    return bcrypt.compare(inputPassword, passwordToCompare);
  }
}
