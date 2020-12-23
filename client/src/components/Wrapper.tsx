import React from "react";
import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
  mt: number;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  mt,
}) => {
  return (
    <Box
      mt={mt}
      mx="auto"
      maxW={variant === "regular" ? "1200px" : "400px"}
      w="100%"
      zIndex={0}
    >
      {children}
    </Box>
  );
};
