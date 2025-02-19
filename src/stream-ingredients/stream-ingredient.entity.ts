import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Stream } from '../streams/stream.entity';
import { Ingredient } from '../ingredients/ingredient.entity';

@Entity('stream_ingredients')
export class StreamIngredient {
  @PrimaryColumn()
  streamId: number;

  @PrimaryColumn()
  ingredientId: number;

  @ManyToOne(() => Stream, (stream) => stream.streamIngredients, { onDelete: 'CASCADE' })
  stream: Stream;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.streamIngredients, { onDelete: 'CASCADE' })
  ingredient: Ingredient;
}
