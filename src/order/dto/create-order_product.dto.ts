import { OrderProduct } from "../entities/orderProduct.entity";
import { Order } from "../entities/order.entity";
import { Product } from "src/product/entities/product.entity";

export class CreateOrderDto {
  id: string;
  order?: Order;
  order_id: string;
  product_id: Product;
  quantity: number;
}
