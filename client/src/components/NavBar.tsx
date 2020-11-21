import React from "react";
import { Box, Flex, Link, Button, Heading, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  let body = null;

  //loading
  if (loading) {
    //not logged in
  } else if (!data?.me) {
    body = (
      <Box display={{ sm: "none", md: "flex" }}>
        <NextLink href={"/login"}>
          <Button mr={6} size="lg" variant="ghost">
            <Link style={{ textDecoration: "none" }}>Login</Link>
          </Button>
        </NextLink>
        <NextLink href={"/register"}>
          <Button bg="white" size={"lg"} variant="outline">
            <Link style={{ textDecoration: "none" }}>Register</Link>
          </Button>
        </NextLink>
      </Box>
    );

    //logged in
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant={"link"}
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="blue.50" p={4} h={120}>
      <Flex m="auto" flex={1} maxW={800} align="center">
        <NextLink href="/">
          <Link style={{ textDecoration: "none" }}>
            <Heading size="2xl">Laundrobox</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
