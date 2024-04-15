import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

@Entity('category')
export class Category {

	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

  @Column({nullable: true})
	parent_id: string

  @ManyToOne(() => Category, category => category.children)
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

}
