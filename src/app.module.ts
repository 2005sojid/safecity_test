import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/database.config';
import { SeederModule } from './modules/seeder/seeder.module';
import { RegionModule } from './modules/region/region.module';
import { DistrictModule } from './modules/district/district.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    SeederModule,
    RegionModule,
    DistrictModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
