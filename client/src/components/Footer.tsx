import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import {
  RiWhatsappLine,
  RiFacebookBoxLine,
  RiInstagramLine,
} from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex
      bg="blue.50"
      justify={"center"}
      align={"center"}
      direction={"column"}
      pt={2}
      mt={2}
    >
      <Text fontSize={{ base: "lg", md: "xl" }} mb={2}>
        Feel free to contact us at:{" "}
      </Text>
      <Flex minW={"300px"} justify={"space-evenly"}>
        <a href={"https://www.facebook.com/"} target={"_blank"}>
          <Icon
            as={RiFacebookBoxLine}
            w={{ base: 6, md: 8 }}
            h={{ base: 6, md: 8 }}
            cursor="pointer"
          ></Icon>
        </a>
        <a href={"https://www.instagram.com/"} target={"_blank"}>
          <Icon
            as={RiInstagramLine}
            w={{ base: 6, md: 8 }}
            h={{ base: 6, md: 8 }}
            cursor="pointer"
          ></Icon>
        </a>
        <a href={"mailto:HHBoxAdmin@gmail.com"} target={"_blank"}>
          <Icon
            as={AiOutlineMail}
            w={{ base: 6, md: 8 }}
            h={{ base: 6, md: 8 }}
            cursor="pointer"
          ></Icon>
        </a>
        <a
          href={"https://api.WhatsApp.com/send?phone=085730004054"}
          target={"_blank"}
        >
          <Icon
            as={RiWhatsappLine}
            w={{ base: 6, md: 8 }}
            h={{ base: 6, md: 8 }}
            cursor="pointer"
          ></Icon>
        </a>
      </Flex>
      <Text fontSize={{ base: "lg", md: "xl" }} mt={2}>
        {"© 2020 by H&H Box team"}
      </Text>
    </Flex>
  );
};
