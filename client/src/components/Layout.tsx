import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";

interface LayoutProps {
  variant?: WrapperVariant;
  mt: number;
}

export const Layout: React.FC<LayoutProps> = ({ variant, children, mt }) => {
  return (
    <>
      <NavBar />
      <Wrapper mt={mt} variant={variant}>
        {children}
      </Wrapper>
    </>
  );
};
