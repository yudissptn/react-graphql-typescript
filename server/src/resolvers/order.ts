import { ObjectType, Field, Mutation, Arg, Resolver } from "type-graphql";
import { OrderRegisterInput } from "./types/OrderRegisterInput";
import { Order } from "../entities/Order";
import { ServiceTypes } from "../entities/ServiceTypes";
import { v4 } from "uuid";
import { CustomerProfile } from "../entities/CustomerProfile";

@ObjectType()
class OrderError {
  @Field()
  field?: string;
  @Field()
  message?: string;
}

@ObjectType()
class OrderResponse {
  @Field(() => [OrderError], { nullable: true })
  errors?: OrderError[];

  @Field(() => Order, { nullable: true })
  orderRes?: Order;
}

@Resolver(Order)
export class OrderResolver {
  @Mutation(() => OrderResponse)
  async registerOrder(@Arg("options") options: OrderRegisterInput) {
    const serviceType = await ServiceTypes.findOne({
      where: { serviceId: options.serviceId },
    });

    if (!serviceType) {
      return {
        errors: [
          {
            field: "ServiceTypes",
            message: "can't find service type",
          },
        ],
      };
    }

    const totalPrice = serviceType?.price * options.amount;

    const customer = await CustomerProfile.findOne({
      where: { custId: options.custId },
    });

    if (!customer) {
      return {
        errors: [
          {
            field: "CustomerProfile",
            message: "can't find customer",
          },
        ],
      };
    }

    const checkBalance = customer?.balance >= totalPrice;

    if (!checkBalance) {
      return {
        errors: [
          {
            field: "CustomerProfile",
            message: "can't generate order, please top up balance",
          },
        ],
      };
    }

    const token = v4();

    const orderId = `${options.custId.slice(-4)}-${token.slice(-6)}`;

    const estOrderDone = new Date(Date.now() + 86400000 * serviceType.duration);

    const orderRes = await Order.create({
      orderId,
      custId: options.custId,
      serviceId: options.serviceId,
      lockerId: options.lockerId,
      endOrder: estOrderDone,
      pictUrl: options.pictUrl,
      amount: options.amount,
      totalPrice,
    }).save();

    return { orderRes };
  }
}
