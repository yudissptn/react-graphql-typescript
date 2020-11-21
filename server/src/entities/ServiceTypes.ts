import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServiceType } from "../resolvers/types/ServiceRegisterInput";

@ObjectType()
@Entity()
export class ServiceTypes extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "enum", enum: ServiceType, default: ServiceType.NORMAL })
  serviceId!: ServiceType;

  @Field()
  @Column()
  type!: string;

  @Field()
  @Column({ type: "int" })
  duration: number;

  @Field()
  @Column({ type: "int" })
  price: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
