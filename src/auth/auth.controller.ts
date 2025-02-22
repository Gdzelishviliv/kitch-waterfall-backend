import { Body, Controller, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto.email, createUserDto.password, createUserDto.role);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Post('firebase-login')
  async firebaseLogin(@Body('idToken') idToken: string) {
    try {
      const user = await this.authService.verifyFirebaseToken(idToken);
      return { message: 'Login successful', user };
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}
