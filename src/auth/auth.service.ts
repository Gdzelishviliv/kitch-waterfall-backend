import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {}

  async register(email: string, password: string, role: string = 'viewer') {
    if(!password){
      throw new Error('password is required')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(email, hashedPassword, role);
    const payload = { sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async verifyFirebaseToken(idToken: string) {
    return this.firebaseService.verifyToken(idToken);
  }
}
