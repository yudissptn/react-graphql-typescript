import React, { useState } from "react";
import { withApollo } from "../utils/withApollo";
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
  useTopUpListQuery,
} from "../generated/graphql";
import { format } from "date-fns";
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";
import { StatusColor } from "../utils/commonInterface";

interface AdminMainProps {}

const AdminTopUp: React.FC<AdminMainProps> = ({}) => {
  //   const { data, loading, fetchMore } = useTopUpListQuery({
  //     notifyOnNetworkStatusChange: true,
  //   });
  const [setOrder] = useSetOrderStatusMutation();
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);

  const statusSelection = ["PLACED", "CONFIRMED", "REJECTED"];

  const tableHead = [
    "Cutomer Id",
    "Name",
    "Balance",
    "Top Up Amount",
    "Status",
  ];

  return (
    <Flex direction="column">
      <Heading as="h4" size="md" mb={4}>
        Top Up List
      </Heading>
      <Box
        minH={500}
        maxH={"30vh"}
        w={1500}
        borderWidth={"3px"}
        overflowY={"auto"}
      >
        <SimpleGrid minChildWidth="120px" column={12}></SimpleGrid>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(AdminTopUp);
