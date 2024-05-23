import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock')
export class Stock {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  lat: number;

  @Column({ default: 0 })
  laq: string;

  @Column()
  name: string;
}
