import { InputType, Field, registerEnumType, Int } from "type-graphql";

export enum ServiceType {
  NORMAL,
  EXPRESS,
  KILAT,
}

registerEnumType(ServiceType, {
  name: "ServiceType",
});

@InputType()
export class ServiceRegisterInput {
  @Field((_type) => ServiceType)
  serviceId!: ServiceType;
  @Field()
  type!: string;
  @Field((_type) => Int)
  duration: number;
  @Field((_type) => Int)
  price: number;
}
