import React from "react";
import { Flex } from "@chakra-ui/react";

interface NavBarWrapper {}

export const NavBarWrapper: React.FC<NavBarWrapper> = ({ children }) => {
  return (
    <Flex
      zIndex={1}
      as={"nav"}
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={"1.5rem"}
      position="sticky"
      top={0}
      bg="blue.50"
      minHeight={120}
    >
      <Flex maxW={1200} justify="space-between" mx={"auto"} w={"100%"}>
        {children}
      </Flex>
    </Flex>
  );
};
