import { Module } from '@nestjs/common';
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
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    SeederModule,
    RegionModule,
    DistrictModule,
    ProjectModule,
    OrderModule,
    ClassificationModule,
    ModelModule,
    ModelTypeModule,
    ObjectModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
