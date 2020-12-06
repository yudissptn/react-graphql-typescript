import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Int,
  Query,
  ObjectType,
  Field,
} from "type-graphql";
import { TopupBalance } from "../entities/TopupBalance";
import { MyContext } from "../types";
import { CustomerProfile } from "../entities/CustomerProfile";
import { getConnection, getRepository } from "typeorm";

@ObjectType()
class PaginatedTopUp {
  @Field(() => [TopupBalance])
  topUpList: TopupBalance[];
  @Field()
  hasMore: boolean;
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

    // const topUp = await getConnection().query(
    //   `
    // select p.*
    //   from topup_balance p
    //   inner join customer_profile
    //   on p."custId" = customer_profile."custId"
    //   ${cursor ? `where p."createdAt" < $2` : ""}
    //   order by p."createdAt" DESC
    //   limit $1
    // `,
    //   replacements
    // );

    const topUp = await getRepository(TopupBalance)
      .createQueryBuilder("tb")
      .innerJoinAndSelect(`tb.customer`, "customer_profile")
      .where(`tb."createdAt" < :createdAt`, {
        createdAt: cursor ? cursorReplacements : new Date(1807221924423),
      })
      .limit(limitPlusOne)
      .orderBy(`tb."createdAt"`, "DESC")
      .getMany();

    console.log(topUp);

    return {
      topUpList: topUp.slice(0, limit),
      hasMore: topUp.length === limitPlusOne,
    };
  }
}
