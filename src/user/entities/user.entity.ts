import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index
} from 'typeorm';
import { UserRole } from 'src/constants';

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

  @Column({ default: 0 })
	bonus: number

}
