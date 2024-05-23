import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Category } from 'src/category/entities/category.entity';
import { OrderProduct } from 'src/order/entities/orderProduct.entity';
import { Stock } from '../../stock/entities/stock.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @Column()
  public value: string;

  @Column()
  public measurement: string;

  @Column({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5sNFoSxYCgsxsn-rPpQKcp_LqwvLUkpbQw6I4mUbcfg&s',
  })
  public img: string;

  @Column({ name: 'category_id' })
  public category_id: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @Column({ name: 'stock_id' })
  public stock_id: number;

  @ManyToOne(() => Stock, (stock) => stock.id)
  @JoinColumn({ name: 'stock_id' })
  public stock: Stock;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
