import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Category } from 'src/category/entities/category.entity';

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

  @Column({ name: 'category_id' })
	public category_id: string

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

}
