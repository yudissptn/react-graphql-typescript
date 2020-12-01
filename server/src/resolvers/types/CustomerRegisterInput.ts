import { InputType, Field, Int } from "type-graphql";
@InputType()
export class CustomerRegisterInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  dob: Date;
  @Field()
  phone: string;
  @Field()
  gender?: string;
  @Field()
  age: number;
  @Field()
  occupation: string;
  @Field()
  address: string;
}

@InputType()
export class CustomerDeleteInput {
  @Field(() => Int)
  id: number;
  @Field()
  custId: string;
}
