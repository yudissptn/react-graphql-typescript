import { Field, ObjectType, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ServiceType } from "../resolvers/types/ServiceRegisterInput";
import { OrderStatus } from "../resolvers/types/OrderRegisterInput";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  orderId!: string;

  @Field()
  @Column()
  custId!: string;

  @Field()
  @Column({ type: "enum", enum: ServiceType, default: ServiceType.NORMAL })
  serviceId!: ServiceType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  adminId?: number;

  @Field()
  @Column({ type: "int" })
  lockerId!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field()
  @Column()
  endOrder!: Date;

  @Field()
  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.SUBMITTED })
  status: OrderStatus;

  @Field()
  @Column()
  pictUrl: string;

  @Field()
  @Column({ type: "int" })
  amount!: number;

  @Field()
  @Column({ type: "int" })
  totalPrice!: number;
}
