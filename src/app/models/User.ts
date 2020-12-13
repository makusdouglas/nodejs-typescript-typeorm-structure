import {Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

@Entity('users')
class User {
  @PrimaryColumn({
    type: "varchar",
  })
  id: string

  @Column('varchar')
  email: string
  
  @Column('varchar')
  private passwordhash: string

  public password: string

  // Functions
  public isPasswordCorrect(password) {
    return bcrypt.compareSync(password, this.passwordhash)
  }

  // Hoooks
  @BeforeInsert()
  @BeforeUpdate() 
   private createPasswordHash(){
    if (this.password) {
      this.passwordhash = bcrypt.hashSync(this.password, 8)
    }
  }

  @BeforeInsert()
  private insertUuid(){
    this.id = uuidv4()
  }

  // Relations
  /**
   * ----------
   */


}

export default User