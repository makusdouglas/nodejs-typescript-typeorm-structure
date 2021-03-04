import { IsUppercase, IsLowercase, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Permission')
class Permission {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  @IsUppercase()
  @IsNotEmpty()
  module: string;

  @Column({
    type: 'varchar',
  })
  @IsUppercase()
  @IsNotEmpty()
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW';

  @Column({
    type: 'varchar',
  })
  @IsLowercase()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
export default Permission;
