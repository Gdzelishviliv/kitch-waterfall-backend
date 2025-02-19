import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Chef } from '../chefs/chef.entity';
import { StreamIngredient } from '../stream-ingredients/stream-ingredient.entity';

@Entity('streams')
export class Stream {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chef, (chef) => chef.id, { onDelete: 'CASCADE' })
  chef: Chef;

  @Column()
  title: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ default: false })
  isLive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'geometry', nullable: true }) // PostGIS location
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => StreamIngredient, (streamIngredient) => streamIngredient.stream)
  streamIngredients: StreamIngredient[];
}
