import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string) {
    const exist = await this.prisma.user.findUnique({ where: { email } });
    if (exist) throw new ConflictException('Email already exists');

    const hash = bcrypt.hashSync(password, 10);
    return this.prisma.user.create({
      data: { email, password: hash },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}
