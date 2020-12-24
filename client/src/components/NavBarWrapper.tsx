import React from "react";
import { Flex, useColorMode } from "@chakra-ui/react";

interface NavBarWrapper {
  fullW?: boolean;
  disableSticky?: boolean;
  justify?: string;
  grow?: number;
}

export const NavBarWrapper: React.FC<NavBarWrapper> = ({
  children,
  fullW,
  disableSticky,
  grow,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      zIndex={1}
      as={"nav"}
      align={"center"}
      wrap="wrap"
      padding={"1.5rem"}
      position={!disableSticky ? "sticky" : "static"}
      top={0}
      bg={colorMode === "light" ? "blue.50" : "gray.800"}
      h={120}
      justify={"center"}
      grow={grow}
    >
      <Flex maxW={!fullW ? 1200 : undefined} justify="space-between" w={"100%"}>
        {children}
      </Flex>
    </Flex>
  );
};
