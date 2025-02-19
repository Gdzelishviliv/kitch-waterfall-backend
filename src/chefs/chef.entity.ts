import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('chefs')
export class Chef {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.chef, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ default: false })
  complianceAck: boolean;

  @Column('decimal', { nullable: true })
  defaultDishPrice: number;

  @CreateDateColumn()
  createdAt: Date;
}
