import { Field, ObjectType, Int, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { CustomerProfile } from "./CustomerProfile";

enum TopUpStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
}

registerEnumType(TopUpStatus, {
  name: "TopUpStatus",
});

@ObjectType()
@Entity()
export class TopupBalance extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  custId!: string;

  @Field(() => CustomerProfile, { nullable: true })
  @ManyToOne(() => CustomerProfile, (customer) => customer.topup)
  customer!: CustomerProfile;

  @Field()
  @Column()
  pictUrl!: string;

  @Field()
  @Column()
  amount!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field()
  @Column({ type: "enum", enum: TopUpStatus, default: TopUpStatus.PLACED })
  status!: TopUpStatus;
}
