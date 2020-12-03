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

registerEnumType(OrderStatus, {
  name: "OrderStatus",
});

@InputType()
export class OrderRegisterInput {
  @Field()
  custId: string;
  @Field((_type) => ServiceType)
  serviceId: ServiceType;
  @Field((_type) => Int)
  lockerId: number;
  @Field()
  pictUrl: string;
  @Field((_type) => Int)
  amount: number;
}

@InputType()
export class SetOrderStatusInput {
  @Field()
  orderId: string;
  @Field((_type) => OrderStatus)
  status: OrderStatus;
}
