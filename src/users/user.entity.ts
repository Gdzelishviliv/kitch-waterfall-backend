import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { Chef } from '../chefs/chef.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'viewer' }) // 'viewer' | 'chef'
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Chef, (chef) => chef.user)
  chef: Chef;
}
