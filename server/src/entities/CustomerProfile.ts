import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class CustomerProfile extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  custId!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  dob!: Date;

  @Field()
  @Column()
  phone!: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  age: number;

  @Field()
  @Column()
  occupation: string;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  balance!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
