import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

import { Category } from 'src/category/entities/category.entity';
import { OrderProduct } from 'src/order/entities/orderProduct.entity';

@Entity('product')
export class Product {

	@PrimaryGeneratedColumn('uuid')
	public id: string
	
  @Column()
	public name: string

  @Column()
  public price: number

  @Column()
  public value: string

  @Column()
  public measurement: string

  @Column({default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5sNFoSxYCgsxsn-rPpQKcp_LqwvLUkpbQw6I4mUbcfg&s'})
  public img: string

  @Column({ name: 'category_id' })
	public category_id: string

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orderProducts: OrderProduct[];

}
