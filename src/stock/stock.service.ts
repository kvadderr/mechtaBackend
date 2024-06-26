import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  create(createStockDto: CreateStockDto) {
    return this.stockRepository.save(createStockDto);
  }

  findAll() {
    return this.stockRepository.find();
  }
}
