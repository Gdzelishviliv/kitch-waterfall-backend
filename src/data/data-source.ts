import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Chef } from '../chefs/chef.entity';
import { Stream } from '../streams/stream.entity';
import { Ingredient } from '../ingredients/ingredient.entity';
import { StreamIngredient } from '../stream-ingredients/stream-ingredient.entity';
import * as dotenv from 'dotenv';


dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Chef, Stream, Ingredient, StreamIngredient],
    synchronize: false,
    migrations: ['dist/migrations/*.js']
});

export default AppDataSource;
