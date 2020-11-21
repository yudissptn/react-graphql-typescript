import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from "typeorm";
import { RoleTypeId } from "../resolvers/types/AdminRegisterInput";

@ObjectType()
@Entity()
export class Admin extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @PrimaryColumn({ type: "enum", enum: RoleTypeId, default: RoleTypeId.FLEET })
  roleId!: RoleTypeId;
}
