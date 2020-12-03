import {
  ObjectType,
  Field,
  Mutation,
  Arg,
  Resolver,
  Query,
  Ctx,
} from "type-graphql";
import {
  OrderRegisterInput,
  OrderStatus,
  SetOrderStatusInput,
} from "./types/OrderRegisterInput";
import { Order } from "../entities/Order";
import { ServiceTypes } from "../entities/ServiceTypes";
import { v4 } from "uuid";
import { CustomerProfile } from "../entities/CustomerProfile";
import { MyContext } from "../types";
import { Customer } from "../entities/Customer";
import { getConnection } from "typeorm";
import { Admin } from "../entities/Admin";

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

@ObjectType()
class CustomerOrderResponse {
  @Field(() => [OrderError], { nullable: true })
  errors?: OrderError[];

  @Field(() => [Order], { nullable: true })
  ogOrder?: Order[];

  @Field(() => [Order], { nullable: true })
  histOrder?: Order[];
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
            field: "custId",
            message: "can't find customer",
          },
        ],
      };
    }

    const custAcc = await Customer.findOne({
      where: { custId: options.custId },
    });

    const checkBalance = customer?.balance - totalPrice;

    if (checkBalance < 0) {
      return {
        errors: [
          {
            field: "CustomerProfile",
            message: "can't generate order, please top up balance",
          },
        ],
      };
    }

    await getConnection()
      .createQueryBuilder()
      .update(CustomerProfile)
      .set({ balance: checkBalance })
      .where(`"custId" = :id`, { id: options.custId })
      .execute();

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
      customer: custAcc,
    }).save();

    console.log(orderRes);

    return { orderRes };
  }

  @Query(() => CustomerOrderResponse)
  async customerOrder(@Ctx() { req }: MyContext) {
    const custId = req.session.custId;

    if (!req.session.custId) {
      return {
        errors: [
          {
            field: "unauthorized",
            message: "unauthorized",
          },
        ],
      };
    }

    const order = await Order.find({
      where: { custId },
      order: { createdAt: "DESC" },
    });
    console.log(order);
    const ogOrder = order.filter(
      (data) => data.status !== OrderStatus.DELIVERED
    );
    const histOrder = order.filter(
      (data) => data.status === OrderStatus.DELIVERED
    );

    return { ogOrder, histOrder };
  }

  @Query(() => [Order], { nullable: true })
  async activeOrder(@Ctx() { req }: MyContext) {
    if (!req.session.adminId) {
      return null;
    }

    const order = await Order.find({
      relations: ["customer"],
      order: { createdAt: "DESC" },
    });

    return order.filter((i) => i.status !== "DELIVERED");
  }

  @Mutation(() => Order, { nullable: true })
  async setOrderStatus(
    @Arg("options") options: SetOrderStatusInput,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.adminId) {
      return null;
    }

    const admin = await Admin.findOne({ where: { id: req.session.adminId } });

    await getConnection()
      .createQueryBuilder()
      .update(Order)
      .set({ status: options.status, adminId: admin?.username || "xx" })
      .where(`"orderId" = :id`, { id: options.orderId })
      .execute();

    return await Order.findOne({
      where: { orderId: options.orderId },
      relations: ["customer"],
    });
  }
}
