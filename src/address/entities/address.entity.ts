import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  apartment: number;

  @Column({ nullable: true })
  entrance: number;

  @Column({ nullable: true })
  floor: number;
}
