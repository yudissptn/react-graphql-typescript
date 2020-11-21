import { ObjectType, Field, Mutation, Arg, Resolver } from "type-graphql";
import { ServiceTypes } from "../entities/ServiceTypes";
import { ServiceRegisterInput } from "./types/ServiceRegisterInput";

@ObjectType()
class ServiceError {
  @Field()
  field?: string;
  @Field()
  message?: string;
}

@ObjectType()
class ServiceResponse {
  @Field(() => [ServiceError], { nullable: true })
  errors?: ServiceError[];

  @Field(() => ServiceTypes, { nullable: true })
  service?: ServiceTypes;
}

@Resolver(ServiceTypes)
export class ServiceResolver {
  @Mutation(() => ServiceResponse)
  async registerService(@Arg("options") options: ServiceRegisterInput) {
    const service = await ServiceTypes.create({
      serviceId: options.serviceId,
      type: options.type,
      duration: options.duration,
      price: options.price,
    }).save();

    return { service };
  }
}
