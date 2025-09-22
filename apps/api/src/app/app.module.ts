import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { Organization, Permission, Role, Task, User } from '@rbac/auth';
import { InitializationService } from './initialization.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [User, Task, Role, Permission, Organization],
        synchronize: configService.get<string>('DB_SYNC_DEV_MODE') === 'true',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Role, Organization]),
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [InitializationService],
})
export class AppModule {}
