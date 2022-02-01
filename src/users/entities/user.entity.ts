import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  @Exclude()
  isUserEmailConfirmed: boolean;

  @Column()
  @Exclude()
  emailConfirmationToken: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  hashedRefreshToken?: string;
}

export default User;
