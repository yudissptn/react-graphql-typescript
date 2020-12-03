import React from "react";
import { Button, Text, useColorMode } from "@chakra-ui/react";
import { useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

interface LogoutProps {}

export const Logout: React.FC<LogoutProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { colorMode, toggleColorMode } = useColorMode();
  const apolloClient = useApolloClient();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        colorMode === "dark" && toggleColorMode();
        await logout();
        await apolloClient.resetStore();
        router.push("/");
      }}
      isLoading={logoutFetching}
      style={{ textDecoration: "none" }}
      bg={colorMode === "light" ? "white" : "teal.400"}
      size={"lg"}
      borderColor="blue.100"
      variant="outline"
    >
      <Text fontSize="2xl">logout</Text>
    </Button>
  );
};
