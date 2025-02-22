import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Chef } from './chefs/chef.entity';
import { Stream } from './streams/stream.entity';
import { Ingredient } from './ingredients/ingredient.entity';
import { StreamIngredient } from './stream-ingredients/stream-ingredient.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Loads .env globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')) || 5432,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Chef, Stream, Ingredient, StreamIngredient],
        synchronize: true,
        migrations: ['dist/migrations/*.js'],
      }),
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
