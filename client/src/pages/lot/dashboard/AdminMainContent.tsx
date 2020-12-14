import React, { useState } from "react";
import { withApollo } from "../../../utils/withApollo";
import {
  Flex,
  Heading,
  Box,
  SimpleGrid,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  useActiveOrderQuery,
  useSetOrderStatusMutation,
  OrderStatus,
  ActiveOrderQuery,
  ActiveOrderDocument,
} from "../../../generated/graphql";
import { format } from "date-fns";
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";
import { StatusColor } from "../../../utils/commonInterface";

interface AdminMainProps {}

const AdminMainContent: React.FC<AdminMainProps> = ({}) => {
  const { data, loading, fetchMore } = useActiveOrderQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [setOrder] = useSetOrderStatusMutation();
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);

  let activeOrder: any[][] = [];

  const statusSelection = ["CONFIRMED", "PROCESS", "DELIVERED"];

  const tableHead = [
    "Order Id",
    "Customer Name",
    "Customer Id",
    "Locker Id",
    "Service Id",
    "Submitted Date",
    "Due Date",
    "Amount",
    "Total Price",
    "Pict",
    "Status",
    "Admin Id",
  ];

  const handleChangeStatus = async (status: OrderStatus, orderId: string) => {
    setChangeStatusLoading(true);
    await setOrder({
      variables: {
        options: {
          orderId,
          status,
        },
      },
      update: (cache, { data }) => {
        const existingActiveOrder = cache.readQuery<ActiveOrderQuery>({
          query: ActiveOrderDocument,
        });
        const newActiveOrder = existingActiveOrder?.activeOrder!.map((i) => {
          if (i.id !== data?.setOrderStatus?.id) {
            return i;
          } else {
            return data.setOrderStatus;
          }
        });
        cache.writeQuery<ActiveOrderQuery>({
          query: ActiveOrderDocument,
          data: {
            __typename: "Query",
            activeOrder: [...newActiveOrder || []],
          },
        });
      },
    });
    setChangeStatusLoading(false);
    if (status === "DELIVERED") {
      fetchMore && fetchMore({});
    }
  };

  const statusAction = (opts: OrderStatus, orderId: string) => {
    return (
      <MenuItem
        key={opts + orderId}
        onClick={() => handleChangeStatus(opts, orderId)}
      >
        {opts}
      </MenuItem>
    );
  };

  if (!data?.activeOrder && !loading) {
  } else if (data?.activeOrder) {
    data?.activeOrder.forEach((o) => {
      const iactiveOrder = [
        o.orderId,
        o.customer?.username,
        o.custId,
        o.lockerId,
        o.serviceId,
        format(new Date(o.createdAt), "dd-MM-yyyy"),
        format(new Date(o.endOrder), "dd-MM-yyyy"),
        o.amount,
        o.totalPrice,
        o.pictUrl,
        o.status,
        o.adminId,
      ];
      activeOrder.push(iactiveOrder);
    });
  }

  const setIndividualCell = (item: string, i: number, oId: string) => {
    let result;
    switch (i) {
      case 9:
        result = <Link href={item}>link</Link>;
        break;
      case 10:
        result = (
          <Menu isLazy>
            {({ isOpen }) => (
              <>
                <MenuButton
                  p={1}
                  h={"70%"}
                  size="sm"
                  isActive={isOpen}
                  as={Button}
                  rightIcon={<MdModeEdit />}
                  colorScheme={StatusColor[item as keyof typeof StatusColor]}
                  disabled={changeStatusLoading}
                >
                  {item}
                </MenuButton>
                <MenuList>
                  {statusSelection.map((item) =>
                    statusAction(item as OrderStatus, oId)
                  )}
                </MenuList>
              </>
            )}
          </Menu>
        );
        break;
      default:
        result = item;
    }
    return result;
  };

  return (
    <Flex direction="column">
      <Heading as="h4" size="md" mb={4}>
        Active order
      </Heading>
      <Box
        minH={500}
        maxH={"30vh"}
        w={1500}
        borderWidth={"3px"}
        overflowY={"auto"}
      >
        <SimpleGrid minChildWidth="120px" column={12}>
          {tableHead.map((label) => (
            <Flex
              borderWidth={"1px"}
              height="40px"
              align="center"
              justify="center"
              position="sticky"
              as={"nav"}
              top={0}
              bgColor={"gray.800"}
              zIndex={2}
            >
              {label}
            </Flex>
          ))}
          {data?.activeOrder?.length === 0 ? (
            <Flex
              borderWidth={"1px"}
              height={500}
              width={1400}
              align="center"
              justify="center"
            >
              <Heading as="h4" size="md" mb={4}>
                No Active Order
              </Heading>
            </Flex>
          ) : (
            activeOrder.map((o) =>
              Object.values(o).map((item, i) => (
                <Flex
                  borderWidth={"1px"}
                  height="30px"
                  align="center"
                  justify="center"
                >
                  {setIndividualCell(item, i, o[0])}
                </Flex>
              ))
            )
          )}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(AdminMainContent);
