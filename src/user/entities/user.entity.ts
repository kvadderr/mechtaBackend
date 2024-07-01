import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany
} from 'typeorm';
import { UserRole } from 'src/constants';
import { Order } from 'src/order/entities/order.entity';

@Entity('user')
export class User {

  @Index()
	@PrimaryGeneratedColumn('uuid')
	id: string

  @Column({ default: UserRole.USER })
	role: UserRole

	@Column()
	phone: string

  @Column({ nullable: true })
	email: string

  @Column({ nullable: true })
	telegram: string

  @Column({ nullable: true })
	name: string

  @Column({ default: 200 })
	bonus: number

  @OneToMany(() => Order, orders => orders.user_id)
  orders: Order[];

}
