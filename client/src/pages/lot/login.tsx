import * as React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Link, Flex, useColorMode } from "@chakra-ui/react";
import { InputField } from "../../components/InputField";
import {
  useLoginAdminMutation,
  IdentifyAdminDocument,
  IdentifyAdminQuery,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withApollo } from "../../utils/withApollo";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [login] = useLoginAdminMutation();
  return (
    <Flex bg="blue.50" h="100vh" justify="center" align="center">
      <Box minW={{ base: 350, md: 550 }} p={0} mt={{ base: 20, md: -80 }}>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<IdentifyAdminQuery>({
                  query: IdentifyAdminDocument,
                  data: {
                    __typename: "Query",
                    identifyAdmin: data?.loginAdmin.admin,
                  },
                });
              },
            });
            if (response.data?.loginAdmin.errors) {
              setErrors(toErrorMap(response.data.loginAdmin.errors));
            } else if (response.data?.loginAdmin.admin) {
              colorMode === "light" && toggleColorMode();
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push(`/lot`);
              }
            }
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
                bg="teal"
                width={{ base: 100, md: 200 }}
                variant="outline"
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
