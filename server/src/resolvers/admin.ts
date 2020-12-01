import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
  Query,
} from "type-graphql";
import { Admin } from "../entities/Admin";
import { AdminRegisterInput } from "./types/AdminRegisterInput";
import { MyContext } from "../types";
import { validateRegister } from "../utils/validateRegister";
import { getConnection } from "typeorm";
import argon2 from "argon2";
import { CustomerProfile } from "../entities/CustomerProfile";

@ObjectType()
class AdminError {
  @Field()
  field?: string;
  @Field()
  message?: string;
}

@ObjectType()
class AdminResponse {
  @Field(() => [AdminError], { nullable: true })
  errors?: AdminError[];

  @Field(() => Admin, { nullable: true })
  admin?: Admin;
}

@Resolver(Admin)
export class AdminResolver {
  @Mutation(() => AdminResponse)
  async registerAdmin(
    @Arg("options") options: AdminRegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<AdminResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let admin;
    try {
      //User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Admin)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
          roleId: options.roleId,
        })
        .returning("*")
        .execute();
      admin = result.raw[0];
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

    req.session!.userId = admin.id;
    return { admin };
  }

  @Mutation(() => AdminResponse)
  async loginAdmin(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<AdminResponse> {
    const admin = await Admin.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!admin) {
      return {
        errors: [
          { field: "usernameOrEmail", message: "username doesn't exist" },
        ],
      };
    }
    const valid = await argon2.verify(admin.password, password);
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
    req.session!.adminId = admin.id;

    return { admin };
  }

  @Query(() => Admin, { nullable: true })
  async identifyAdmin(@Ctx() { req }: MyContext) {
    if (!req.session!.adminId) {
      return null;
    }

    return Admin.findOne({ where: { id: req.session!.adminId } });
  }

  @Mutation(() => CustomerProfile, { nullable: true })
  async updateCustomerBalance(
    @Arg("custId") custId: string,
    @Arg("nominal") nominal: number
  ) {
    await getConnection()
      .createQueryBuilder()
      .update(CustomerProfile)
      .set({ balance: nominal })
      .where(`"custId" = :id`, { id: custId })
      .execute();

    return await CustomerProfile.findOne({ where: { custId } });
  }
}
