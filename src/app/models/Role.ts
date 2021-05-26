import { IsLowercase, IsNotEmpty, IsUppercase } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Permission from './Permission';

@Entity('Role')
class Role extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  @IsUppercase()
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'varchar',
  })
  @IsLowercase()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * Relations
   * --------------------
   */

  @ManyToMany((type) => Permission, { eager: true, cascade: true })
  @JoinTable()
  permissions: Permission[];
}
export default Role;
