import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Role } from './Role';
import { IsDate, IsEmail } from 'class-validator';

@Entity('user')
class User {
  @PrimaryColumn({
    type: 'varchar',
  })
  id: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column()
  @IsDate()
  birth: Date;

  @Column('varchar')
  private passwordhash: string;

  // just in exec time
  public password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Functions
  public isPasswordCorrect(password) {
    return bcrypt.compareSync(password, this.passwordhash);
  }

  // Hoooks
  @BeforeInsert()
  @BeforeUpdate()
  private createPasswordHash() {
    if (this.password) {
      this.passwordhash = bcrypt.hashSync(this.password, 8);
    }
  }

  @BeforeInsert()
  private insertUuid() {
    this.id = uuidv4();
  }

  // Relations
  /**
   * ----------
   */
  @ManyToMany((type) => Role, { eager: true })
  @JoinTable()
  roles: Role;
}

export default User;
