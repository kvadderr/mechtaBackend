import { forwardRef, Module } from '@nestjs/common';
import { MainPageController } from './mainPage.controller';
import { RedisService } from '../redis/redis.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [forwardRef(() => CategoryModule)],
  providers: [RedisService],
  controllers: [MainPageController],
})
export class MainPageModule {}
