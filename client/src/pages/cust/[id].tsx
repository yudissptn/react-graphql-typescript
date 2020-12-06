import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Logout } from "../../components/Logout";
import { NavBarWrapper } from "../../components/NavBarWrapper";
import { useCustomerOrderQuery } from "../../generated/graphql";
import { addCurrency } from "../../utils/communUtils";
import { useGetIntId } from "../../utils/useGetIntId";
import { withApollo } from "../../utils/withApollo";
import useIsAuth from "../../utils/useIsAuth";
import { format } from "date-fns";
import { StatusColor } from "../../utils/commonInterface";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useRouter } from "next/router";

export const CustomerPage = ({}) => {
  const router = useRouter();
  const [iconColor, setIconColor] = useState("whitesmoke");
  const { data, loading } = useIsAuth();
  const intId = useGetIntId();
  const { data: orderData, loading: orderLoading } = useCustomerOrderQuery({
    notifyOnNetworkStatusChange: true,
  });

  const ogLength = orderData?.customerOrder.ogOrder;

  if (orderLoading && loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <>
      <NavBarWrapper>
        {data?.identifyCustomer?.customer && (
          <>
            <Flex align="baseline" direction={{ base: "column", md: "row" }}>
              <Heading>{`Hi ${data?.identifyCustomer?.customer?.username}`}</Heading>
              <Text ml={{ base: 0, md: 8 }}>{`Balance: ${addCurrency(
                data?.identifyCustomer?.profile?.balance!
              )}`}</Text>
              <Icon
                as={MdAccountBalanceWallet}
                w={{ base: 4, md: 6 }}
                h={{ base: 4, md: 6 }}
                ml={{ base: 0, md: 2 }}
                onClick={() => router.push("/topup")}
                cursor="pointer"
              ></Icon>
            </Flex>
            <Logout />{" "}
          </>
        )}
      </NavBarWrapper>

      {data?.identifyCustomer?.customer && (
        <Flex justify="center" mb={2} maxW={1200} mx={"auto"}>
          <Box>
            <Flex justify="space-between" align="flex-end" my={2}>
              {ogLength && ogLength.length > 0 ? (
                <Box>
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight={"700"}>
                    Ongoing order
                  </Text>
                </Box>
              ) : null}
              <Tooltip label="Create an order" placement="top">
                <Button
                  onMouseEnter={(_e) => setIconColor("GrayText")}
                  onMouseLeave={(_e) => setIconColor("whitesmoke")}
                  bg="green.400"
                  size={"md"}
                  variant="outline"
                  leftIcon={<AddIcon color={iconColor} />}
                  pb={1}
                >
                  <NextLink href={"/create-order"}>
                    <Link style={{ textDecoration: "none" }}>
                      <Text
                        color={iconColor}
                        fontSize={{ base: "md", md: "lg" }}
                      >
                        Create Order
                      </Text>
                    </Link>
                  </NextLink>
                </Button>
              </Tooltip>
            </Flex>
            {ogLength && ogLength.length > 0 && !orderLoading ? (
              orderData?.customerOrder.ogOrder?.map((o) => (
                <Box
                  w={{ base: 380, md: 1200 }}
                  h={{ base: 150 }}
                  borderWidth="1px"
                  borderColor="gray.50"
                  shadow="md"
                  key={o.orderId}
                >
                  <Flex
                    justify="space-between"
                    borderWidth="1px"
                    borderColor="gray.100"
                    p={3}
                  >
                    <Text>{`Order ID: ${o.orderId}`}</Text>
                    <Text
                      color={`${
                        StatusColor[o.status as keyof typeof StatusColor]
                      }.500`}
                    >
                      {o.status}
                    </Text>
                  </Flex>
                  <Flex p={3} justify="space-between" bg="gray.100">
                    <Text>{o.serviceId}</Text>
                    <Text>{addCurrency(o.totalPrice)}</Text>
                  </Flex>
                  <Flex p={3} justify="space-between">
                    <Link
                      href={o.pictUrl}
                      color="blue.300"
                      textDecoration="underline"
                    >
                      picture
                    </Link>
                    <Text>{format(new Date(o.createdAt), "dd-MM-yyyy")}</Text>
                  </Flex>
                </Box>
              ))
            ) : (
              <Box>
                <Text>You don't have any on going order</Text>
              </Box>
            )}
          </Box>
        </Flex>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(CustomerPage);
