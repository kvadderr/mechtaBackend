import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './auth/middleware/auth.middleware';

import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { StockModule } from './stock/stock.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { AddressModule } from './address/address.module';
import { PromocodeModule } from './promocode/promocode.module';

import { User } from './user/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { Promocode } from './promocode/entities/promocode.entity';
import { Order } from './order/entities/order.entity';
import { OrderProduct } from './order/entities/orderProduct.entity';
import { MainPageModule } from './mainPage/mainPage.module';
import { Stock } from './stock/entities/stock.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Zsxdcf123',
      username: 'postgres',
      entities: [
        User,
        Category,
        Product,
        Promocode,
        Order,
        OrderProduct,
        Stock,
      ],
      database: 'mechta',
      synchronize: true,
      logging: false,
    }),
    CategoryModule,
    UserModule,
    StockModule,
    ProductModule,
    OrderModule,
    AddressModule,
    PromocodeModule,
    MainPageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
