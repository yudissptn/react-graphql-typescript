import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
  Query,
} from "type-graphql";
import { CustomerRegisterInput } from "./types/CustomerRegisterInput";
import { MyContext } from "../types";
import { validateRegister } from "../utils/validateRegister";
import { getConnection } from "typeorm";
import argon2 from "argon2";
import { Customer } from "../entities/Customer";
import { CustomerProfile } from "../entities/CustomerProfile";
import { v4 } from "uuid";

@ObjectType()
class CustomerError {
  @Field()
  field?: string;
  @Field()
  message?: string;
}

@ObjectType()
class CustomerResponse {
  @Field(() => [CustomerError], { nullable: true })
  errors?: CustomerError[];

  @Field(() => Customer, { nullable: true })
  customer?: Customer;

  @Field(() => CustomerProfile, { nullable: true })
  profile?: CustomerProfile;
}

@Resolver(Customer)
export class CustumerResolver {
  @Mutation(() => CustomerResponse)
  async registerCustomer(
    @Arg("options") options: CustomerRegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<CustomerResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    const token = v4();
    let customer;
    try {
      //User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Customer)
        .values({
          username: options.username,
          password: hashedPassword,
          custId: token.slice(-12),
        })
        .returning("*")
        .execute();
      customer = result.raw[0];
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      console.log(err);
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    req.session!.customerId = customer.id;

    const profileQuery = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CustomerProfile)
      .values({
        firstName: options.firstName,
        lastName: options.lastName,
        email: options.email,
        address: options.address,
        age: options.age,
        dob: options.dob,
        occupation: options.occupation,
        gender: options.gender,
        phone: options.phone,
        custId: token.slice(-12),
      })
      .returning("*")
      .execute();
    const profile = profileQuery.raw[0];

    return { profile, customer };
  }

  @Mutation(() => CustomerResponse)
  async loginCustomer(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<CustomerResponse> {
    let customer;
    if (usernameOrEmail.includes("@")) {
      const cust = await CustomerProfile.findOne({
        where: { email: usernameOrEmail },
      });
      customer = await Customer.findOne({ where: { custId: cust?.custId } });
    } else {
      customer = await Customer.findOne({
        where: { username: usernameOrEmail },
      });
    }

    if (!customer) {
      return {
        errors: [
          { field: "usernameOrEmail", message: "username doesn't exist" },
        ],
      };
    }

    const valid = await argon2.verify(customer.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    // Store user id session, keep logged in
    req.session!.custId = customer.custId;

    return { customer };
  }

  @Query(() => Customer, { nullable: true })
  async identifyCustomer(@Ctx() { req }: MyContext) {
    if (!req.session!.custId) {
      return null;
    }

    return Customer.findOne({ where: { custId: req.session!.custId } });
  }
}
