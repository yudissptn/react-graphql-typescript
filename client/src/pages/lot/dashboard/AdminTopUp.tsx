import React from "react";
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
  IconButton,
} from "@chakra-ui/react";
import {
  useTopUpListQuery,
  useSetTopUpStatusMutation,
  TopUpStatus,
} from "../../../generated/graphql";
import { format } from "date-fns";
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";
import { TriangleDownIcon } from "@chakra-ui/icons";
import gql from "graphql-tag";

interface AdminMainProps {
  admin: string;
}

const AdminTopUp: React.FC<AdminMainProps> = ({ admin }) => {
  const { data, loading, fetchMore, variables } = useTopUpListQuery({
    variables: {
      limit: 3,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [setTopUp] = useSetTopUpStatusMutation();

  const statusSelection = ["PLACED", "CONFIRMED", "REJECTED"];

  enum TopUpColor {
    PLACED = "purple",
    CONFIRMED = "green",
    REJECTED = "red",
  }

  const tableHead = [
    "Cutomer Id",
    "Name",
    "Date",
    "Updated",
    "Balance",
    "Top Up Amount",
    "Picture",
    "Status",
    "Admin",
  ];

  if (!data && loading) {
    return <>Loading</>;
  }

  if (!data?.topUpList || !data?.topUpList.topUpList) {
    return <>Error</>;
  }

  const handleChangeStatus = async (status: TopUpStatus, id: number) => {
    await setTopUp({
      variables: {
        options: {
          status,
          id,
        },
      },
      update: (cache) => {
        const selectedTopUpId = cache.readFragment<{
          id: number;
          status: TopUpStatus;
        }>({
          id: "TopupBalance:" + id,
          fragment: gql`
            fragment _ on TopupBalance {
              id
              status
            }
          `,
        });

        if (selectedTopUpId) {
          cache.writeFragment({
            id: "TopupBalance:" + id,
            fragment: gql`
              fragment __ on TopupBalance {
                status
                adminId
              }
            `,
            data: { status, adminId: admin },
          });
        }
      },
    });
  };

  return (
    <Flex direction="column">
      <Heading as="h4" size="md" mb={4}>
        Top Up List
      </Heading>
      <Flex justify="center" direction="column">
        <Box
          minH={500}
          maxH={"30vh"}
          w={1150}
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
            {data?.topUpList?.topUpList.length === 0 ? (
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
              data?.topUpList?.topUpList.map((t) => (
                <>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {t.custId}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {t.customer?.firstName}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {format(new Date(+t.createdAt), "dd-MM-yyyy")}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {format(new Date(+t.updatedAt), "dd-MM-yyyy")}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {t.customer?.balance}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {t.amount}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    <Link href={t.pictUrl}>link</Link>;
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
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
                            colorScheme={
                              TopUpColor[t.status as keyof typeof TopUpColor]
                            }
                            disabled={loading}
                          >
                            {t.status}
                          </MenuButton>
                          <MenuList>
                            {statusSelection.map((item) => (
                              <MenuItem
                                key={item + t.status}
                                onClick={() =>
                                  t.status !== "CONFIRMED" &&
                                  handleChangeStatus(item as TopUpStatus, t.id)
                                }
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {t.adminId}
                  </Flex>
                </>
              ))
            )}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            {data?.topUpList?.hasMore ? (
              <IconButton
                colorScheme="teal"
                aria-label="Load More"
                size="sm"
                icon={<TriangleDownIcon />}
                w={10}
                mx={"auto"}
                isLoading={loading}
                onClick={() => {
                  fetchMore &&
                    fetchMore({
                      variables: {
                        limit: variables?.limit,
                        cursor:
                          data.topUpList?.topUpList[
                            data.topUpList?.topUpList.length - 1
                          ].createdAt,
                      },
                    });
                }}
              />
            ) : null}
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default withApollo({ ssr: false })(AdminTopUp);
