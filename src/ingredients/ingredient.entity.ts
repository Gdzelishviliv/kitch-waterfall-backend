import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StreamIngredient } from '../stream-ingredients/stream-ingredient.entity';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => StreamIngredient, (streamIngredient) => streamIngredient.ingredient)
  streamIngredients: StreamIngredient[];
}
