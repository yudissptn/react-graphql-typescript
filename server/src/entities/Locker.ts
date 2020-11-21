import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { LockStatus, FillStatus } from "../resolvers/types/LockerRegisterInput";

@ObjectType()
@Entity()
export class Locker extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn({ type: "int" })
  lockerId!: number;

  @Field()
  @Column({ unique: true })
  lockerIp!: string;

  @Field()
  @Column({ unique: true })
  address!: string;

  @Field()
  @Column({ type: "enum", enum: LockStatus, default: LockStatus.LOCKED })
  lockStatus: LockStatus;

  @Field()
  @Column({ type: "enum", enum: FillStatus, default: FillStatus.EMPTY })
  fillStatus: FillStatus;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
