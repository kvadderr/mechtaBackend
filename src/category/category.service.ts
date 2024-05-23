import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async findAll() {
    const categories = await this.categoryRepository.find({
      relations: ['products'],
    });
    const categoryTree = this.buildCategoryTree(categories);
    return categoryTree;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id },
    });
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id },
    });
    return this.categoryRepository.remove(category);
  }

  buildCategoryTree(
    categories: Category[],
    parentId: number = null,
  ): Category[] {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => ({
        ...category,
        children: this.buildCategoryTree(categories, category.id),
      }));
  }
}
