import * as React from "react";
import { Formik, Form, Field, FieldProps, useField } from "formik";
import {
  Box,
  Button,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  Input,
  FormControl,
  Flex,
  Select,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import {
  useRegisterMutation,
  MeQuery,
  MeDocument,
  useRegisterCustomerMutation,
  CustomerQuery,
  CustomerDocument,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";
import { useState, InputHTMLAttributes, useEffect } from "react";

const DobPicker: React.FC<{}> = ({}) => {
  const [date, setDate] = useState({ day: "01", month: "01", year: "1998" });
  const dates: number[] = [];
  const maxDate = 31;
  const month: number[] = [];
  const maxMonth = 12;
  const year: number[] = [];
  const minYear = 1950;
  const maxYear = 2020;

  for (let i = 1; i <= maxDate; i++) {
    dates.push(i);
  }
  for (let i = 1; i <= maxMonth; i++) {
    month.push(i);
  }
  for (let i = minYear; i <= maxYear; i++) {
    year.push(i);
  }

  return (
    <Flex>
      <Field name="dob" initialValues="01-01-2000">
        {({ form, field, meta }: FieldProps) => {
          useEffect(() => {
            form.setFieldValue("dob", `${date.year}-${date.month}-${date.day}`);
          }, [date]);

          return (
            <>
              <Select
                placeholder="date"
                name="date"
                onChange={(e) => {
                  setDate({ ...date, day: e.target.value });
                }}
              >
                {dates.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Select>
              <Select
                placeholder="month"
                ml={2}
                name="month"
                onChange={(e) => {
                  setDate({ ...date, month: e.target.value });
                }}
              >
                {month.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Select>
              <Select
                placeholder="year"
                ml={2}
                name="year"
                onChange={(e) => {
                  setDate({ ...date, year: e.target.value });
                }}
              >
                {year.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Select>
            </>
          );
        }}
      </Field>
    </Flex>
  );
};

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const [registerCustomer] = useRegisterCustomerMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          gender: "",
          age: 0,
          address: "",
          phone: "",
          occupation: "",
          dob: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await registerCustomer({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<CustomerQuery>({
                query: CustomerDocument,
                data: {
                  __typename: "Query",
                  identifyCustomer: {
                    customer: data?.registerCustomer.customer,
                  },
                },
              });
            },
          });
          console.log(response.data?.registerCustomer.customer);
          if (response.data?.registerCustomer.errors) {
            setErrors(toErrorMap(response.data.registerCustomer.errors));
            console.log(toErrorMap(response.data.registerCustomer.errors));
          } else if (response.data?.registerCustomer.customer) {
            router.push(
              `/cust/${response.data.registerCustomer.customer.custId}`
            );
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="username"
              required
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="email"
                required
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
                required
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="firstName"
                placeholder="firstName"
                label="firstName"
                required
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="lastName"
                placeholder="lastName"
                label="lastName"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="gender"
                placeholder="gender"
                label="gender"
                radio
                radioOptions={["male", "female"]}
              />
            </Box>
            <Box>
              <FormLabel mb={2}>Age</FormLabel>
              <Field name="age">
                {(props: FieldProps) => (
                  <NumberInput
                    defaultValue={9}
                    min={6}
                    onChange={(val) =>
                      props.form.setFieldValue(props.field.name, +val)
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
            <Box mt={4}>
              <InputField
                name="address"
                placeholder="address"
                label="address"
                required
              />
            </Box>
            <Box mt={4}>
              <Field name="phone">
                {(props: FieldProps) => (
                  <FormControl isRequired>
                    <FormLabel mb={2} htmlFor="phone">
                      Mobile Phone
                    </FormLabel>
                    <InputGroup id="phone">
                      <InputLeftAddon children="+62" />
                      <Input
                        type="phone"
                        borderLeftRadius="0"
                        placeholder="phone number"
                        {...props.field}
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box mt={4}>
              <InputField
                name="occupation"
                placeholder="occupation"
                label="occupation"
              />
            </Box>
            <Box>
              <FormLabel mb={2}>DOB</FormLabel>
              <DobPicker />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              register
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Register);
