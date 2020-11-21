import { ObjectType, Field, Mutation, Arg, Resolver } from "type-graphql";
import { Locker } from "../entities/Locker";
import { LockerRegisterInput } from "./types/LockerRegisterInput";

@ObjectType()
class LockerError {
  @Field()
  field?: string;
  @Field()
  message?: string;
}

@ObjectType()
class LockerResponse {
  @Field(() => [LockerError], { nullable: true })
  errors?: LockerError[];

  @Field(() => Locker, { nullable: true })
  locker?: Locker;
}

@Resolver(Locker)
export class LockerResolver {
  @Mutation(() => LockerResponse)
  async registerLocker(@Arg("options") options: LockerRegisterInput) {
    return await Locker.create({
      lockerId: options.lockerId,
      lockerIp: options.lockerIp,
      address: options.address,
    }).save();
  }
}
