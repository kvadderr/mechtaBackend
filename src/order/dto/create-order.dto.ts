import { OrderProduct } from "../entities/orderProduct.entity";

export class CreateOrderDto {
  id: string;
  promocode?: string;
  discount?: number;
  user_id: string;
  orderProducts: OrderProduct[];
  price: number;
}
