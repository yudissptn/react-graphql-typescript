import { InputType, Field, registerEnumType, Int } from "type-graphql";
import { ServiceType } from "./ServiceRegisterInput";

export enum FillStatus {
  OCCUPIED = "OCCUPIED",
  EMPTY = "EMPTY",
}

registerEnumType(FillStatus, {
  name: "FillStatus",
});

export enum OrderStatus {
  SUBMITTED = "SUBMITTED",
  CONFIRMED = "CONFIRMED",
  PROCESS = "PROCESS",
  DELIVERED = "DELIVERED",
}

@InputType()
export class OrderRegisterInput {
  @Field()
  custId: string;
  @Field((type) => ServiceType)
  serviceId: ServiceType;
  @Field((type) => Int)
  lockerId: number;
  @Field()
  pictUrl: string;
  @Field((type) => Int)
  amount: number;
}
