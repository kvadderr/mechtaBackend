import { Body, Controller, Get, Post } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";
import { CategoryService } from "../category/category.service";

@Controller('mainPage')
export class MainPageController {
  constructor(
    private readonly redisService: RedisService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post('sliderImage')
  create(@Body() data: any) {
    console.log(data);
    this.redisService.set('sliderImage', JSON.stringify(data));
    return 201;
  }

  @Post('categoryItems')
  async createCategory(@Body() data: any) {
    data.categories = await Promise.all(
      data?.categories?.map(async (category: any) => {
        const categoryData = await this.categoryService.findOne(
          category.categoryId,
        );
        category.name = categoryData?.name || 'Unknown';
        return category;
      }),
    );
    await this.redisService.set('categoryItems', JSON.stringify(data));
    return 201;
  }

  @Get('sliderImage')
  async findAll() {
    return await this.redisService.get('sliderImage');
  }

  @Get('categoryItems')
  async getCategoryItems() {
    return await this.redisService.get('categoryItems');
  }
}
