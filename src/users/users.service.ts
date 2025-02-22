import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Chef } from '../chefs/chef.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
        @InjectRepository(Chef) private chefsRepo: Repository<Chef>,
    ) { }

    async createUser(email: string, passwordHash: string, role: string) {
        const user = this.usersRepo.create({ email, passwordHash, role });
        return this.usersRepo.save(user);
    }

    async findAll() {
        return this.usersRepo.find()
    }

    async findOne(id: number) {
        return this.usersRepo.findOne({ where: { id } });
    }

    async findByEmail(email: string) {
        return this.usersRepo.findOne({ where: { email } });
    }

    async update(id: number, updateData: Partial<User>) {
        await this.usersRepo.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number) {
        return this.usersRepo.delete(id);
    }

    async promoteToChef(userId: number, bio: string, complianceAck: boolean, defaultCuisineType: string) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const chef = this.chefsRepo.create({ user, bio, complianceAck, defaultCuisineType });
        return this.chefsRepo.save(chef);
    }
}
