import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Int,
  Query,
  ObjectType,
  Field,
  InputType,
} from "type-graphql";
import { TopupBalance, TopUpStatus } from "../entities/TopupBalance";
import { MyContext } from "../types";
import { CustomerProfile } from "../entities/CustomerProfile";
import { getConnection, getRepository } from "typeorm";
import { Admin } from "../entities/Admin";

@ObjectType()
class PaginatedTopUp {
  @Field(() => [TopupBalance])
  topUpList: TopupBalance[];
  @Field()
  hasMore: boolean;
}

@InputType()
export class SetTopUpStatusInput {
  @Field()
  id: number;
  @Field((_type) => TopUpStatus)
  status: TopUpStatus;
}

@Resolver(TopupBalance)
export class TopupBalanceResolver {
  @Mutation(() => TopupBalance, { nullable: true })
  async requestTopUp(
    @Ctx() { req }: MyContext,
    @Arg("amount", () => Int) amount: number,
    @Arg("pictUrl") pictUrl: string
  ) {
    if (!req.session.custId) {
      return null;
    }

    const customer = await CustomerProfile.findOne({
      where: {
        custId: req.session.custId,
      },
    });

    if (!customer) {
      console.log("customer error");
    }

    return await TopupBalance.create({
      custId: req.session.custId,
      pictUrl,
      amount,
      customer: customer,
    }).save();
  }

  @Query(() => PaginatedTopUp, { nullable: true })
  async topUpList(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.adminId) {
      return null;
    }

    const limitPlusOne = limit + 1;
    let cursorReplacements;

    if (cursor) {
      cursorReplacements = new Date(parseInt(cursor));
    }

    const topUp = await getRepository(TopupBalance)
      .createQueryBuilder("tb")
      .innerJoinAndSelect(`tb.customer`, "customer_profile")
      .where(`tb."createdAt" < :createdAt`, {
        createdAt: cursor ? cursorReplacements : new Date(1807221924423),
      })
      .limit(limitPlusOne)
      .orderBy(`tb."createdAt"`, "DESC")
      .getMany();

    return {
      topUpList: topUp.slice(0, limit),
      hasMore: topUp.length === limitPlusOne,
    };
  }

  @Mutation(() => Boolean, { nullable: true })
  async setTopUpStatus(
    @Arg("options") options: SetTopUpStatusInput,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.adminId) {
      return null;
    }

    const admin = await Admin.findOne({ where: { id: req.session.adminId } });
    
    const topup =  await TopupBalance.findOne({where: { id: options.id},  relations: ["customer"],})

    if(options.status === "CONFIRMED" && topup?.status !== "CONFIRMED"){
      const newBalance = (topup?.customer.balance || 0) + (topup?.amount || 0)
      console.log(newBalance)
      await getConnection()
      .createQueryBuilder()
      .update(CustomerProfile)
      .set({balance: newBalance})
      .where(`"custId" = :custId`, {custId: topup?.custId})
      .execute()
    }

    await getConnection()
    .createQueryBuilder()
    .update(TopupBalance)
    .set({status: options.status, adminId: admin?.username})
    .where("id = :id", {id: options.id})
    .execute()
    
    return true
  }
}
