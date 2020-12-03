import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { TopupBalance } from "../entities/TopupBalance";
import { MyContext } from "../types";
import { CustomerProfile } from "../entities/CustomerProfile";

@Resolver(TopupBalance)
export class TopupBalanceResolver {
  @Mutation(() => TopupBalance, { nullable: true })
  async requestTopUp(
    @Ctx() { req }: MyContext,
    @Arg("amount") amount: number,
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
}
