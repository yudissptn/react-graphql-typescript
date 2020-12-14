import React, { useState } from "react";
import { useIdentifyAdminQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withApollo } from "../../utils/withApollo";
import { NavBarWrapper } from "../../components/NavBarWrapper";
import {
  Flex,
  Heading,
  Box,
  IconButton,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import { Logout } from "../../components/Logout";
import { HamburgerIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { SiGoogleanalytics } from "react-icons/si";
import { MdPersonAdd, MdAccountBalanceWallet } from "react-icons/md";
import AdminContent from "./dashboard/AdminContent";

interface AdminHome {}

const home: React.FC<AdminHome> = ({}) => {
  const router = useRouter();
  const { data, loading } = useIdentifyAdminQuery();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const [section, setSection] = useState("");

  if (!loading && !data?.identifyAdmin) {
    router.push("/lot/login", undefined, { shallow: true });
  }

  return data?.identifyAdmin ? (
    <Flex>
      <Box h={"100vh"} w={show ? 350 : 115} zIndex={0} bgColor={"teal.400"}>
        <Flex
          align="center"
          h={120}
          bgColor={show ? "teal.400" : "gray.800"}
          justify="center"
        >
          <IconButton
            aria-label="navbar-options"
            icon={<HamburgerIcon />}
            onClick={handleToggle}
            display={show ? "none" : "flex"}
          />
        </Flex>
        <Divider css={{ borderColor: "teal" }} />
        <Button
          h={120}
          w={"100%"}
          onClick={() => setSection("main")}
          leftIcon={<SiGoogleanalytics />}
        >
          <Heading as="h4" size="md" display={show ? "inline-block" : "none"}>
            Main dashboard
          </Heading>
        </Button>
        <Button
          leftIcon={<MdPersonAdd />}
          h={120}
          w={"100%"}
          onClick={() => setSection("addadmin")}
        >
          <Heading as="h4" size="md" display={show ? "inline-block" : "none"}>
            Add admin
          </Heading>
        </Button>
        <Button
          h={120}
          w={"100%"}
          leftIcon={<MdAccountBalanceWallet />}
          onClick={() => setSection("topup")}
        >
          <Heading as="h4" size="md" display={show ? "inline-block" : "none"}>
            Top-up balance
          </Heading>
        </Button>
      </Box>
      <Flex direction="column" grow={1}>
        <NavBarWrapper fullW disableSticky justify="normal">
          {data?.identifyAdmin?.username && (
            <>
              <Flex>
                <IconButton
                  aria-label="navbar-options"
                  icon={<ArrowLeftIcon />}
                  onClick={handleToggle}
                  display={show ? "block" : "none"}
                />
                <Heading ml={"5rem"}>Dashboard</Heading>
              </Flex>
              <Logout />
            </>
          )}
        </NavBarWrapper>
        <AdminContent contentSelected={section} admin={data?.identifyAdmin?.username} />
      </Flex>
    </Flex>
  ) : (
    <Flex h={"100vh"} align="center" justify="center">
      <Text>Redirecting to login page....</Text>
    </Flex>
  );
};

export default withApollo({ ssr: false })(home);
