import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
