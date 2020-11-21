import { InputType, Field, registerEnumType, Int } from "type-graphql";

export enum LockStatus {
  LOCKED,
  UNLOCK,
}

export enum FillStatus {
  OCCUPIED = "OCCUPIED",
  EMPTY = "EMPTY",
}

registerEnumType(LockStatus, {
  name: "LockStatus",
});

registerEnumType(FillStatus, {
  name: "FillStatus",
});

@InputType()
export class LockerRegisterInput {
  @Field((_type) => Int)
  lockerId!: number;
  @Field()
  lockerIp!: string;
  @Field()
  address: string;
}
