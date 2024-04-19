import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index
} from 'typeorm';

@Entity('stock')
export class Stock {

  @Index()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	lat: number

  @Column()
	laq: string

  @Column()
  name: string

}
