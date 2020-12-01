import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Heading,
  Progress,
  Stack,
  Text,
  useRadioGroup,
  Input,
  StackDivider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  Divider,
  Button,
  FormControl,
  FormLabel,
  VisuallyHidden,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import { withApollo } from "../utils/withApollo";
import { NavBarWrapper } from "../components/NavBarWrapper";
import { Logout } from "../components/Logout";
import { useDropzone } from "react-dropzone";
import useIsAuth from "../utils/useIsAuth";
import RadioCard from "./RadioCard";
import { format } from "date-fns";
import { addCurrency } from "../utils/communUtils";
import { Formik, Form, Field, FieldProps } from "formik";
import {
  useCustomerQuery,
  useIdentifyServiceQuery,
  useIdentifyLockerQuery,
  useAddProfilePictureMutation,
  useRegisterOrderMutation,
  ServiceType,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";
import { ApolloCache } from "@apollo/client";
import gql from "graphql-tag";
import { toErrorMap } from "../utils/toErrorMap";

interface createOrderProps {}

interface IOrderForm {
  pict: string;
  custId: string;
  lockerAddress: string;
  price: number;
}

const createOrder: React.FC<createOrderProps> = ({}) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [preview, setPreview] = useState("");
  const [uploadedPict, setPicture] = useState(null);
  const [, setErrors] = useState("");
  const { data: dataCust, client } = useCustomerQuery();
  const [orderData, setOrderData] = useState<IOrderForm>({
    pict: "",
    custId: "",
    lockerAddress: "",
    price: 10000,
  });
  const { fetchMore: fetchMoreService } = useIdentifyServiceQuery({
    variables: {
      serviceId: 0,
    },
  });
  const { fetchMore: fetchMoreLocker } = useIdentifyLockerQuery({
    variables: {
      lockerId: 0,
    },
  });
  const [addProfilePicture] = useAddProfilePictureMutation();
  const [registerOrder] = useRegisterOrderMutation();
  // const [data: lockerData] = useIdentifyLockerQuery()

  const custCredentials = client.readFragment<{
    id: number;
    custId: string;
    username: string;
  }>({
    id: "Customer:1",
    fragment: gql`
      fragment __ on Customer {
        id
        custId
        username
      }
    `,
  });

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  const service = ["NORMAL", "EXPRESS", "KILAT"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "serviceType",
    defaultValue: "NORMAL",
  });

  const onDrop = useCallback(
    async ([acceptedFiles]) => {
      // Do something with the files
      if (acceptedFiles) {
        setPreview(URL.createObjectURL(acceptedFiles));
        setPicture(acceptedFiles);
      } else {
        setErrors("Something went wrong. Check file type and size (max. 1 MB)");
      }
    },
    [setPicture]
  );

  useEffect(() => {
    setOrderData({
      ...orderData,
      pict: preview,
    });
  }, [preview]);

  const {
    getRootProps: getRootPropsDZ,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    maxSize: 1024000,
  });

  const group = getRootProps();

  const handleServiceChange = async (e: string) => {
    const data = await fetchMoreService({
      variables: { serviceId: service.indexOf(e) },
    });
    setOrderData({
      ...orderData,
      price: data.data.identifyService?.service?.price || 0,
    });
  };

  const handleLockerChange = async (e: string) => {
    const data = await fetchMoreLocker({ variables: { lockerId: +e } });
    setOrderData({
      ...orderData,
      lockerAddress: data.data.identifyLocker?.locker?.address || "",
    });
  };

  return (
    <>
      <NavBarWrapper>
        <Flex align="baseline" direction={{ base: "column", md: "row" }}>
          <Heading>New Order</Heading>
        </Flex>
        <Logout />
      </NavBarWrapper>

      <Formik
        initialValues={{
          serviceType: "NORMAL",
          lockerId: "",
          amount: 0,
          custId: custCredentials?.custId,
        }}
        onSubmit={async (values, { setErrors: formikErrors }) => {
          const { data: pict, errors: errorUpload } = await addProfilePicture({
            variables: {
              picture: uploadedPict,
              user: String(dataCust?.identifyCustomer?.customer?.username),
            },
          });
          if (errorUpload) {
            // setErrors(`Error upload to S3: ${errorUpload[0].message}`);
          }
          const { data } = await registerOrder({
            variables: {
              options: {
                serviceId: values.serviceType as ServiceType,
                pictUrl: pict ? pict.addProfilePicture.Location : "error link",
                lockerId: +values.lockerId,
                custId: dataCust?.identifyCustomer?.customer?.custId || "xx",
                amount: Math.round(values.amount),
              },
            },
            update: (cache) => {
              cache.evict({ fieldName: "order:{}" });
            },
          });

          console.log(data?.registerOrder.errors);
          if (!data?.registerOrder.errors) {
            router.push(
              `/cust/${dataCust?.identifyCustomer?.customer?.custId}`
            );
          } else {
            if (
              data?.registerOrder.errors[0].message === "can't find customer"
            ) {
              formikErrors(toErrorMap(data?.registerOrder.errors));
              setTimeout(() => router.push("/login"), 1500);
            }
          }
        }}
      >
        {({ values, isSubmitting, errors }) => {
          useEffect(() => {
            handleServiceChange(values.serviceType);
          }, [values.serviceType]);
          useEffect(() => {
            handleLockerChange(values.lockerId);
          }, [values.lockerId]);
          return (
            <Form>
              <Flex justify="center" mb={2} maxW={1200} mx={"auto"}>
                <Box w={"100%"}>
                  <Progress hasStripe value={(tabIndex + 1) * 25} />

                  <Tabs
                    isFitted
                    variant="enclosed"
                    index={tabIndex}
                    onChange={handleTabsChange}
                  >
                    <TabList>
                      <Tab>1. Choose Service</Tab>
                      <Tab>2. Fill&nbsp;in detail</Tab>
                      <Tab>3. Upload image</Tab>
                      <Tab>4. Confirmation</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Stack name="serviceType" {...group}>
                          {service.map((value) => {
                            const radio = getRadioProps({ value });
                            return (
                              <RadioCard name={value} key={value} {...radio}>
                                {value}
                              </RadioCard>
                            );
                          })}
                        </Stack>
                      </TabPanel>
                      <TabPanel>
                        <Stack
                          divider={<StackDivider borderColor="gray.200" />}
                          spacing={4}
                        >
                          <FormControl id="lockerId">
                            <FormLabel mb={2}>Locker ID:</FormLabel>
                            <Field
                              name="lockerId"
                              placeholder="Input locker id from scanned barcode"
                              type="input"
                              as={Input}
                            />
                          </FormControl>
                          <Flex align="flex-end">
                            <Box>
                              <FormLabel mb={2}>Amount:</FormLabel>
                              <Field name="amount">
                                {(props: FieldProps) => (
                                  <NumberInput
                                    defaultValue={0.0}
                                    precision={2}
                                    step={0.2}
                                    min={3}
                                    onChange={(val) =>
                                      props.form.setFieldValue(
                                        props.field.name,
                                        val
                                      )
                                    }
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                )}
                              </Field>
                            </Box>
                            <Text ml={2}>Kg</Text>
                          </Flex>
                        </Stack>
                      </TabPanel>
                      <TabPanel>
                        <FormLabel>
                          Upload picture of your laundry on weight scale
                          provided
                        </FormLabel>
                        <Box
                          h={50}
                          w={350}
                          borderWidth="1px"
                          borderColor="gray.50"
                          shadow="md"
                          mr="auto"
                          mt={2}
                        >
                          <div {...getRootPropsDZ()}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <p>
                                Drag 'n' drop some files here, or click to
                                select files
                              </p>
                            )}
                          </div>
                        </Box>
                        {preview && (
                          <Flex
                            h={220}
                            w={350}
                            borderWidth="1px"
                            borderColor="gray.50"
                            shadow="md"
                            mr="auto"
                            mt={2}
                            align="center"
                            justify="center"
                            py={2}
                          >
                            <Image
                              src={preview}
                              boxSize="200px"
                              objectFit="cover"
                            />
                          </Flex>
                        )}
                      </TabPanel>
                      <TabPanel>
                        <Text align="center" fontWeight={600}>
                          Order Summary
                        </Text>
                        <Divider />
                        <Text mt={3}>{`Date: ${format(
                          new Date(),
                          "dd-MM-yyyy"
                        )}`}</Text>
                        <Stack
                          divider={<StackDivider borderColor="gray.200" />}
                          borderWidth="1px"
                          borderColor="gray.150"
                          p={2}
                        >
                          <Text>{`Locker Id: ${values.lockerId}`}</Text>
                          <Text>{`Locker Address: ${orderData.lockerAddress}`}</Text>
                        </Stack>
                        <Stack
                          divider={<StackDivider borderColor="gray.200" />}
                          borderWidth="1px"
                          borderColor="gray.150"
                          p={2}
                        >
                          <Text>{`Service: ${values.serviceType}`}</Text>
                          <Text>{`Price per kg: ${orderData.price}`}</Text>
                        </Stack>
                        <Stack
                          divider={<StackDivider borderColor="gray.200" />}
                          borderWidth="1px"
                          borderColor="gray.150"
                          p={2}
                        >
                          <Text>{`Amount: ${values.amount} kg`}</Text>
                          <Text>{`Pict: `}</Text>
                          <Flex
                            h={220}
                            w={300}
                            borderWidth="1px"
                            borderColor="gray.50"
                            shadow="md"
                            mr="auto"
                            my={2}
                            align="center"
                            justify="center"
                            px={2}
                          >
                            <Image
                              src={preview}
                              boxSize="200px"
                              objectFit="cover"
                            />
                          </Flex>
                          <Text>{`Total Price: ${
                            orderData?.price && values.amount
                              ? addCurrency(orderData?.price * values.amount)
                              : 0
                          }`}</Text>
                        </Stack>
                        <Flex align="center" direction="column">
                          <FormControl id="custId" isInvalid={!!errors.custId}>
                            {errors ? (
                              <FormErrorMessage>
                                <Alert status="error">
                                  <AlertIcon />
                                  <AlertTitle mr={2}>
                                    You are not logged in
                                  </AlertTitle>
                                  <AlertDescription>
                                    {errors.custId}
                                  </AlertDescription>
                                  <CloseButton
                                    position="absolute"
                                    right="8px"
                                    top="8px"
                                  />
                                </Alert>
                              </FormErrorMessage>
                            ) : null}
                          </FormControl>
                          <Button
                            mx="auto"
                            mt={3}
                            type="submit"
                            isLoading={isSubmitting}
                          >
                            Proceed
                          </Button>
                        </Flex>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </Flex>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(createOrder);
