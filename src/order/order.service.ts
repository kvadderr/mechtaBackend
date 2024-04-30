import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/orderProduct.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    console.log('createOrderDto', createOrderDto)
    const { orderProducts } = createOrderDto;
    const savedOrder = await this.orderRepository.save(createOrderDto);
    console.log('savedOrder', savedOrder)
    for (const op of orderProducts) {
      const orderProduct = new OrderProduct();
      orderProduct.order_id = savedOrder.id;  // link to the saved Order
      orderProduct.product_id = op.product_id;   // link to the fetched Product
      orderProduct.quantity = op.quantity;
      await this.orderProductRepository.save(orderProduct);
    }
    return await this.orderRepository.findOne({ relations: ['orderProducts', 'orderProducts.product'],where: {id: savedOrder.id}})
  }

  findAll() {
    return this.orderRepository.find({ relations: ['orderProducts', 'orderProducts.product'] })
  }

  findOne(user_id: string) {
    return this.orderRepository.find({ relations: ['orderProducts', 'orderProducts.product'], where: { user_id } })
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
