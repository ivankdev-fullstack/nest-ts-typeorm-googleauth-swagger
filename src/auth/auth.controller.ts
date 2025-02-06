import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() body: LoginDto): Promise<User> {
    return this.authService.login(body);
  }

  @Post('/register')
  public async register(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.register(body);
  }
}
