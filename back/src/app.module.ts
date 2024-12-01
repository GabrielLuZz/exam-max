import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [__dirname + '/../../.env', __dirname + '/../.env'],
    }),
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
