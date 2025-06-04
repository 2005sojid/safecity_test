import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/database.config';
import { SeederModule } from './modules/seeder/seeder.module';
import { RegionModule } from './modules/region/region.module';
import { DistrictModule } from './modules/district/district.module';
import { ProjectModule } from './modules/project/project.module';
import { OrderModule } from './modules/order/order.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { ModelModule } from './modules/model/model.module';
import { ModelTypeModule } from './modules/model_type/model_type.module';
import { ObjectModule } from './modules/object/object.module';

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
    ProjectModule,
    OrderModule,
    ClassificationModule,
    ModelModule,
    ModelTypeModule,
    ObjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
