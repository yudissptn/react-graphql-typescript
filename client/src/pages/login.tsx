import * as React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import {
  useLoginCustomerMutation,
  CustomerDocument,
  CustomerQuery,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginCustomerMutation();
  return (
    <Flex bg="blue.50" h="100vh" justify="center" align="center">
      <Box minW={{ base: 350, md: 550 }} p={0} mt={{ base: 20, md: -80 }}>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<CustomerQuery>({
                  query: CustomerDocument,
                  data: {
                    __typename: "Query",
                    identifyCustomer: {
                      customer: data?.loginCustomer.customer,
                    },
                  },
                });
                cache.evict({ fieldName: "order:{}" });
              },
            });
            if (response.data?.loginCustomer.errors) {
              setErrors(toErrorMap(response.data.loginCustomer.errors));
            } else if (response.data?.loginCustomer.customer) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push(
                  `/cust/${response.data.loginCustomer.customer.custId}`
                );
              }
            }
            // href={"/post/edit/[id]"} as={`/post/edit/${id}`
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="username or email"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="password"
                  type="password"
                />
              </Box>
              <Flex mt={2}>
                <NextLink href="/forgot-password">
                  <Link ml={"auto"}>forgot password</Link>
                </NextLink>
              </Flex>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                bgColor="teal"
                width={{ base: 100, md: 200 }}
                variant="outline"
                bg="white"
                borderColor="blue.200"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(Login);
