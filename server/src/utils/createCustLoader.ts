import DataLoader from "dataloader";
import { Customer } from "../entities/Customer";

export const createCustLoader = () =>
  new DataLoader<number, Customer>(async (userIds) => {
    const users = await Customer.findByIds(userIds as number[]);
    const userIdToUser: Record<number, Customer> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    const sortedUsers = userIds.map((userId) => userIdToUser[userId]);
    return sortedUsers;
  });
