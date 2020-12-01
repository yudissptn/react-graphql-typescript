import {
  ObjectType,
  Field,
  Mutation,
  Arg,
  Resolver,
  Query,
  Int,
} from "type-graphql";
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
    const locker = await Locker.create({
      lockerId: options.lockerId,
      lockerIp: options.lockerIp,
      address: options.address,
    }).save();

    return { locker };
  }

  @Query(() => LockerResponse, { nullable: true })
  async identifyLocker(@Arg("lockerId", () => Int) lockerId: number) {
    const locker = await Locker.findOne({ where: { lockerId } });

    return { locker };
  }
}
