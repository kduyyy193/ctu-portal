import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler'

import appConfig from './config/app.config'
import databaseConfig from './config/database.config'
import jwtConfig from './config/jwt.config'
import { envValidationSchema } from './config/env.validation'
import { LoggerMiddleware } from './common/middlewares/logger.middlewares';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        `.env`,
      ],
      load: [
        appConfig,
        databaseConfig,
        jwtConfig
      ],
      validationSchema: envValidationSchema,
      cache: true,
      expandVariables: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 60_000,
          limit: 100,
        },
        {
          name: 'auth',
          ttl: 60_000,
          limit: 5,
        },
        {
          name: 'strict',
          ttl: 300_000,
          limit: 50,
        },
        {
          name: 'webhook',
          ttl: 1_000,
          limit: 2000,
        },
        {
          name: 'health',
          ttl: 60_000,
          limit: 10_000,
        },
      ],
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
