import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Chef {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // Explicitly naming the FK
  user: User;

  @Column()
  userId: number; // Explicit foreign key

  @Column()
  bio: string;

  @Column({ default: false })
  complianceAck: boolean;

  @Column()
  defaultCuisineType: string;
}
