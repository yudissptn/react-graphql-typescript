import React, { useEffect } from "react";
import { withApollo } from "../utils/withApollo";
import { NavBarWrapper } from "../components/NavBarWrapper";
import {
  Heading,
  Flex,
  Box,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { ImageUpload } from "../components/ImageUpload";
import { useImageUpload } from "../utils/useImageUpload";
import {
  useRequestTopUpMutation,
  useAddProfilePictureMutation,
} from "../generated/graphql";
import useIsAuth from "../utils/useIsAuth";
import { useRouter } from "next/router";

interface TopupProps {}

const Topup: React.FC<TopupProps> = ({}) => {
  const {
    preview,
    uploadedPict,
    getRootPropsDZ,
    getInputProps,
    isDragActive,
  } = useImageUpload();
  const router = useRouter();
  const [requestTopUp] = useRequestTopUpMutation();
  const [addProfilePicture] = useAddProfilePictureMutation();
  const { data: dataCust, loading } = useIsAuth();

  useEffect(() => {
    console.log(uploadedPict);
  }, [uploadedPict]);

  return (
    <>
      <NavBarWrapper>
        <Heading as="h3" size="lg">
          Top Up Balance
        </Heading>
      </NavBarWrapper>
      <Formik
        initialValues={{
          amount: 10000,
        }}
        onSubmit={async ({ amount }) => {
          const {
            data: pictUrl,
            errors: errorUpload,
          } = await addProfilePicture({
            variables: {
              picture: uploadedPict,
              user: String(dataCust?.identifyCustomer?.customer?.username),
            },
          });

          if (errorUpload) {
            console.log(errorUpload[0].message);
          }

          const { data, errors } = await requestTopUp({
            variables: {
              pictUrl: pictUrl?.addProfilePicture.Location || "",
              amount: +amount,
            },
          });

          if (errors) {
            console.log(errors[0].message);
            return;
          }

          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex
              direction={"column"}
              justify="left"
              mb={2}
              maxW={1200}
              mx={"auto"}
              mt={10}
            >
              <Box>
                <FormLabel mb={2}>1. Input desired topup amount</FormLabel>
                <Field name="amount">
                  {(props: FieldProps) => (
                    <NumberInput
                      defaultValue={10000}
                      step={10000}
                      min={10000}
                      onChange={(val) =>
                        props.form.setFieldValue(props.field.name, val)
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
              <Box>
                <FormLabel mb={2}>
                  2. Make a bank transfer to one of the following banks
                </FormLabel>
                <Accordion allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        BCA
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Text>Account name: laundrobox</Text>
                      <Text>Account number: 67586380</Text>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Mandiri
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Text>Account name: laundrobox</Text>
                      <Text>Account number: 5678345</Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
              <Box>
                <FormLabel mb={2}>3. Upload transfer slip</FormLabel>
                <ImageUpload
                  preview={preview}
                  getRootPropsDZ={getRootPropsDZ}
                  getInputProps={getInputProps}
                  isDragActive={isDragActive}
                />
              </Box>
              <Button mx="auto" mt={3} type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Topup);
