import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promocode } from './entities/promocode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromocodeService {

  constructor(
    @InjectRepository(Promocode)
    private readonly promocodeRepository: Repository<Promocode>,
  ) { }

  create(createPromocodeDto: CreatePromocodeDto) {
    return this.promocodeRepository.save(createPromocodeDto)
  }

  findAll() {
    return `This action returns all promocode`;
  }

  async findOne(code: string) {
    const promocode = await this.promocodeRepository.findOne({ where: { code } });
    if (!promocode) {
      throw new NotFoundException();
    }
    return promocode
  }

  update(id: number, updatePromocodeDto: UpdatePromocodeDto) {
    return `This action updates a #${id} promocode`;
  }

  remove(id: number) {
    return `This action removes a #${id} promocode`;
  }
}
