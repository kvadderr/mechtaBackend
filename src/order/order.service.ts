import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/orderProduct.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log('createOrderDto', createOrderDto);
    const { orderProducts } = createOrderDto;
    const savedOrder = await this.orderRepository.save(createOrderDto);
    console.log('savedOrder', savedOrder);
    for (const op of orderProducts) {
      const orderProduct = new OrderProduct();
      orderProduct.order_id = savedOrder.id; // link to the saved Order
      orderProduct.product_id = op.product_id; // link to the fetched Product
      orderProduct.quantity = op.quantity;
      await this.orderProductRepository.save(orderProduct);
    }
    return await this.orderRepository.findOne({
      relations: ['orderProducts', 'orderProducts.product'],
      where: { id: savedOrder.id },
    });
  }

  async update(id:string, updateOrderDto: UpdateOrderDto){
    const order = await this.orderRepository.findOne({
      where: {id}
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    Object.assign(order, updateOrderDto); // Обновляем поля

    return this.orderRepository.save(order); // Сохраняем обновленную запись
  }

  findAll() {
    return this.orderRepository.find({
      relations: ['orderProducts', 'orderProducts.product'],
    });
  }

  findOne(user_id: string) {
    return this.orderRepository.find({
      relations: ['orderProducts', 'orderProducts.product'],
      where: { user_id },
    });
  }

}
