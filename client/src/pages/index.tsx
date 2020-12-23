import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Divider,
  Flex,
  AspectRatio,
  ListItem,
  UnorderedList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { Carousel } from "../components/Carousel";
import { LocationDetails } from "../utils/commonInterface";
import Image from "next/image";

const Index: React.FC<{}> = () => {
  return (
    <>
      <Layout mt={0}>
        <Center
          h={{ base: "300px", md: "500px" }}
          w={"100%"}
          overflow={"hidden"}
          color={"white"}
          bgImage={
            "url('/images/assets/header2.jpg'), linear-gradient(to bottom, rgba(90,188,216,0.4), rgba(15,94,156,0.4))"
          }
          bgSize={"100%"}
          bgBlendMode={"overlay"}
        >
          <Box p={"1rem"}>
            <Heading zIndex={2}>{"H&H Box"}</Heading>
            <Text>Your laundry best friend</Text>
          </Box>
        </Center>
        <Flex direction={"column"} justify="center" mt={5}>
          <Heading
            textAlign={"center"}
            fontSize={{ base: "lg", md: "2xl" }}
            mb={3}
          >
            Opening Hours and Location.
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-evenly"
            textAlign={"center"}
            position={"relative"}
            wrap={"wrap"}
          >
            <Box
              position={"absolute"}
              top={0}
              opacity={0.4}
              bgImage={
                "url('/images/assets/blue_background.jpg'), linear-gradient(to bottom, rgba(90,188,216,0.4), rgba(15,94,156,0.4))"
              }
              h={"100%"}
              w={"100%"}
              zIndex={-1}
            />
            <Box maxW="350px" p={10}>
              <Heading fontSize={{ base: "lg", md: "2xl" }} mb={2}>
                Opening Hours
              </Heading>
              <Divider borderWidth={"3px"} borderColor={"slateblue"} mb={3} />
              <Text lineHeight={2}>
                Open 7:00 AM to 11:00 PM Every Day of the Year
              </Text>
              <Text fontSize={"sm"}>
                ​{" "}
                <i>
                  A wash and dry takes approximately 1 hour to complete, plus
                  folding time. We therefore recommend you start your last wash
                  by 9:50 pm and your last dry by 10:20 pm. ​ Washing machines
                  cannot be started after 10:30 pm. ​ Doors lock automatically
                  at 11:00 pm sharp Press green button to exit
                </i>
              </Text>
            </Box>
            <Box p={10} maxW="350px">
              <Heading fontSize={{ base: "lg", md: "2xl" }} mb={2}>
                Location
              </Heading>
              <Divider borderWidth={"3px"} borderColor={"slateblue"} mb={3} />
              <Text lineHeight={2}>{LocationDetails.address}</Text>
            </Box>
            <Box p={4} w={{ base: "100%", md: "70%" }}>
              <AspectRatio ratio={4 / 3}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d588.3018905140829!2d112.75396426489374!3d-7.2854076565862895!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbc83710240f%3A0x7b438e64a36c0c26!2sWarung%20LPI!5e0!3m2!1sen!2sid!4v1608631747751!5m2!1sen!2sid"></iframe>
              </AspectRatio>
            </Box>
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          justify="space-evenly"
          textAlign={"center"}
          position={"relative"}
          align={"center"}
          wrap={"wrap"}
        >
          <Box p={10} maxW={{ base: "350px", md: "550px" }}>
            <Heading fontSize={{ base: "lg", md: "2xl" }} mb={2}>
              OUR EQUIPMENT
            </Heading>
            <Divider borderWidth={"3px"} borderColor={"slateblue"} mb={3} />
            <Text lineHeight={2}>
              Lava Laundry Lounge has invested in the worlds finest IPSO all
              industrial grade washing machines and dryers to make your visit to
              Lava efficient and trouble free. ​{" "}
            </Text>
            <Text lineHeight={2}>
              IPSO's premium brand of soft mount chassis equipment spins your
              clothes at a 350 g-force which results in cleaner clothes (less
              residual detergent in your fabrics) and less drying time required
              which saves your fabrics, your time, and your money.
            </Text>
          </Box>
          <Flex direction={{ base: "column", md: "row" }} textAlign={"start"}>
            <Box p={10} maxW={{ base: "350px", md: "550px" }}>
              <Heading fontSize={{ base: "lg", md: "2xl" }} mb={2}>
                WASHING MACHINE LIST:
              </Heading>
              <Divider borderWidth={"3px"} borderColor={"slateblue"} mb={3} />
              <UnorderedList spacing={3}>
                <ListItem>
                  Five x 8 kg (75L drum volume) front load washers
                </ListItem>
                <ListItem>
                  Two x 14 kg (135L drum volume) front load washers
                </ListItem>
                <ListItem>
                  Two x 18 kg (180L drum volume) front load washers
                </ListItem>
              </UnorderedList>
            </Box>
            <Box p={10} maxW={{ base: "350px", md: "550px" }}>
              <Heading fontSize={{ base: "lg", md: "2xl" }} mb={2}>
                DRYER LIST:
              </Heading>
              <Divider borderWidth={"3px"} borderColor={"slateblue"} mb={3} />
              <UnorderedList spacing={3}>
                <ListItem>Ten x 15 kg (301L drum volume) gas dryers</ListItem>
                <ListItem>Two x 21 kg (421L drum volume) gas dryers</ListItem>
              </UnorderedList>
            </Box>
          </Flex>
        </Flex>
        <Carousel />
        <Flex>
          <Box flexGrow={1} display={{ base: "none", md: "block" }}>
            <Image
              src={"/images/assets/mobilephone.jpg"}
              alt="mobilephone"
              width={600}
              height={450}
            />
          </Box>
          <Box p={10} flexGrow={1} bgColor={"blue.50"} maxW={"600px"}>
            <Center>
              <Heading fontSize={{ base: "lg", md: "2xl" }} mb={2}>
                How to&nbsp;
              </Heading>
              <Heading
                color={"slateblue"}
                fontSize={{ base: "lg", md: "2xl" }}
                mb={2}
              >
                Order
              </Heading>
            </Center>
            <Center>
              <UnorderedList spacing={4}>
                <ListItem>
                  You do not require coins to use our machines. ​
                </ListItem>
                <ListItem>
                  {`All machines accept MasterCard & Visa (debit, credit, or
                  pre-paid), or you can also pay using your PayPal account using
                  an App on your phone.`}
                </ListItem>
                <ListItem>
                  {`A premium grade soap (& softener if required) is dispensed
                  automatically into your wash free of charge, so there is no
                  need to bring your own soap or detergents.`}
                </ListItem>
              </UnorderedList>
            </Center>
          </Box>
        </Flex>
        <Flex>
          <Box p={10} flexGrow={1} bgColor={"blue.50"} maxW={"600px"}>
            <Center>
              <Heading
                color={"slateblue"}
                fontSize={{ base: "lg", md: "2xl" }}
                mb={2}
              >
                Other&nbsp;
              </Heading>
              <Heading fontSize={{ base: "lg", md: "2xl" }} mb={2}>
                Features:
              </Heading>
            </Center>
            <Center>
              <UnorderedList spacing={4}>
                <ListItem>Free WiFi</ListItem>
                <ListItem>
                  Selection of books, magazines, music, and video information
                  screen
                </ListItem>
                <ListItem>
                  Extensive live CCTV monitored security coverage with remote
                  assistance support
                </ListItem>
                <ListItem>Air conditioning</ListItem>
                <ListItem>Cleaned twice daily</ListItem>
                <ListItem>
                  Receipts available if required for business or work
                  reimbursement purposes
                </ListItem>
              </UnorderedList>
            </Center>
          </Box>
          <Box flexGrow={1} display={{ base: "none", md: "block" }}>
            <Image
              src={"/images/assets/mccuci.jpg"}
              alt="laundry1"
              width={600}
              height={450}
            />
          </Box>
        </Flex>
        <Flex direction={"column"} justify="center" mt={5}>
          <Heading
            textAlign={"center"}
            fontSize={{ base: "lg", md: "2xl" }}
            mb={3}
          >
            Pricelist
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-evenly"
            textAlign={"center"}
            position={"relative"}
            wrap={"wrap"}
          >
            <Box
              position={"absolute"}
              top={0}
              opacity={0.4}
              bgImage={
                "url('/images/assets/blue_background.jpg'), linear-gradient(to bottom, rgba(90,188,216,0.4), rgba(15,94,156,0.4))"
              }
              h={"100%"}
              w={"100%"}
              zIndex={-1}
            />
            <Box p={3}>
              <Tabs variant="enclosed-colored" isFitted>
                <TabList>
                  <Tab>Basic</Tab>
                  <Tab>Express</Tab>
                  <Tab>Kilat</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Table variant="striped" colorScheme="teal">
                      <TableCaption>
                        Imperial to metric conversion factors
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th>To convert</Th>
                          <Th>into</Th>
                          <Th isNumeric>multiply by</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>inches</Td>
                          <Td>millimetres (mm)</Td>
                          <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                          <Td>feet</Td>
                          <Td>centimetres (cm)</Td>
                          <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                          <Td>yards</Td>
                          <Td>metres (m)</Td>
                          <Td isNumeric>0.91444</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TabPanel>
                  <TabPanel>
                    <Table variant="striped" colorScheme="teal">
                      <TableCaption>
                        Imperial to metric conversion factors
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th>To convert</Th>
                          <Th>into</Th>
                          <Th isNumeric>multiply by</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>inches</Td>
                          <Td>millimetres (mm)</Td>
                          <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                          <Td>feet</Td>
                          <Td>centimetres (cm)</Td>
                          <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                          <Td>yards</Td>
                          <Td>metres (m)</Td>
                          <Td isNumeric>0.91444</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: true })(Index);
