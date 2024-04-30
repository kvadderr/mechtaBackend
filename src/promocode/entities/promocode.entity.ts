import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Promocode {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({ default: 200 })
  discount: number;

  @Column()
  count: number;

}