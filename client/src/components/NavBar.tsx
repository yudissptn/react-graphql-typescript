import React from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useCustomerQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { NavBarWrapper } from "./NavBarWrapper";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useCustomerQuery({
    skip: isServer(),
  });
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  let body = null;

  //loading
  if (loading) {
    //not logged in
  } else if (!data?.identifyCustomer) {
    body = (
      <>
        <Box>
          <NextLink href={"/login"}>
            <Button mr={6} mb={show ? 5 : 0} size="lg" variant="ghost">
              <Link style={{ textDecoration: "none" }}>
                <Text fontSize={{ base: "xl", md: "2xl" }}>Login</Text>
              </Link>
            </Button>
          </NextLink>
        </Box>
        <Box>
          <NextLink href={"/register"}>
            <Button bg="white" size={"lg"} variant="outline">
              <Link style={{ textDecoration: "none" }}>
                <Text fontSize={{ base: "xl", md: "2xl" }}>Register</Text>
              </Link>
            </Button>
          </NextLink>
        </Box>
      </>
    );

    //logged in
  } else {
    body = (
      <Button
        onClick={async () => {
          await logout();
          await apolloClient.resetStore();
          router.push("/");
        }}
        isLoading={logoutFetching}
        style={{ textDecoration: "none" }}
        bg="white"
        size={"lg"}
        borderColor="blue.100"
        variant="outline"
      >
        <Text fontSize="2xl">logout</Text>
      </Button>
    );
  }

  return (
    <NavBarWrapper>
      <Box m="1.4rem">
        <NextLink href="/">
          <Link style={{ textDecoration: "none" }}>
            <Heading size="2xl">Laundrobox</Heading>
          </Link>
        </NextLink>

        <Box
          display={{
            base: show ? "block" : "none",
            md: "none",
          }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          p="1.5rem"
        >
          {body}
        </Box>
      </Box>

      <Box mt={6} display={{ base: "flex", md: "none" }} onClick={handleToggle}>
        <IconButton
          aria-label="navbar-options"
          icon={show ? <CloseIcon /> : <HamburgerIcon />}
        />
      </Box>

      <Box m="1.4rem" display={{ base: "none", md: "flex" }}>
        {body}
      </Box>
    </NavBarWrapper>
  );
};
