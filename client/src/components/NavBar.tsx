import React, { useRef } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  Heading,
  IconButton,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useCustomerQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useCustomerQuery({
    skip: isServer(),
  });
  const registerRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let body = null;

  //loading
  if (loading) {
    //not logged in
  } else if (!data?.identifyCustomer) {
    body = (
      <>
        <Box>
          <Button
            mr={6}
            size="lg"
            variant="ghost"
            onClick={() =>
              window.scrollTo({
                top: 3200,
                behavior: "smooth",
              })
            }
          >
            <Link style={{ textDecoration: "none" }}>
              <Text fontSize="xl">Pricelist</Text>
            </Link>
          </Button>
        </Box>
        <Box h={50}>
          <NextLink href={"/login"}>
            <Button mr={6} size="lg" variant="ghost">
              <Link style={{ textDecoration: "none" }}>
                <Text fontSize="xl">Login</Text>
              </Link>
            </Button>
          </NextLink>
        </Box>
        <Box>
          <NextLink href={"/register"}>
            <Button bg="white" size={"lg"} variant="outline" ref={registerRef}>
              <Link style={{ textDecoration: "none" }}>
                <Text fontSize="xl">Register</Text>
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
    <Flex
      as="nav"
      position="sticky"
      top={0}
      align="center"
      justify={{ base: "space-between", md: "space-evenly" }}
      wrap="wrap"
      bg="blue.50"
      zIndex={10}
      maxH={70}
      p={{ base: 3, md: 0 }}
      boxShadow={"lg"}
    >
      <Box maxH={"70px"} verticalAlign={"center"}>
        <NextLink href="/">
          <Link style={{ textDecoration: "none" }}>
            <Heading size="xl" fontFamily={"initial"}>
              {"H&H Box"}
            </Heading>
          </Link>
        </NextLink>
      </Box>
      <Box display={{ base: "block", md: "none" }} onClick={onOpen}>
        <IconButton aria-label="navbar-options" icon={<HamburgerIcon />} />
      </Box>
      <Flex
        p={3}
        display={{ base: "none", md: "flex" }}
        justify="center"
        align="center"
      >
        {body}
      </Flex>
      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        initialFocusRef={registerRef}
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent bg="blue.50" justifyContent="stretch">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" minH={39}></DrawerHeader>
          <DrawerBody>{body}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
