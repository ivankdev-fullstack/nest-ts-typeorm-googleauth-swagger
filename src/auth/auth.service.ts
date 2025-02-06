import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async login(email: string, password: string, id: string) {
    const user = this.userService.findOneById('1234');

    return 'SAMPLE_TOKEN';
  }

  public async isAuth() {
    return true;
  }
}
