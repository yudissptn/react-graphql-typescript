import React, { useState } from "react";
import { withApollo } from "../../../utils/withApollo";
import {
  Flex,
  Heading,
  Box,
  SimpleGrid,
  IconButton,
  Select,
  FormLabel,
  Text,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger
} from "@chakra-ui/react";
import {
  useAdminListQuery, useRegisterAdminMutation, RoleTypeId, AdminListQuery, AdminListDocument, useDeleteAdminMutation
} from "../../../generated/graphql";
import { format } from "date-fns";
import { AddIcon } from "@chakra-ui/icons";
import { Formik, Form, Field, FieldProps } from "formik";
import { InputField } from "../../../components/InputField";
import { toErrorMap } from "../../../utils/toErrorMap"
import { HiUserRemove } from "react-icons/hi"

interface AdminAddAdminProps {
  admin: string
}

const AdminAddAdmin: React.FC<AdminAddAdminProps> = ({ admin }) => {
  const { data, loading } = useAdminListQuery();
  const [registerAdmin] = useRegisterAdminMutation()
  const [deleteAdmin] = useDeleteAdminMutation()

  const [adminRegister, setAdminRegister] = useState(false)
  
  const roleIdSelection = ["Skymen", "Ss", "Ap", "Fleet"];

 enum RoleTypeIdNum {
    Skymen,
    Ss,
    Ap,
    Fleet
  }

  const tableHead = [
    "Admin Id",
    "Username",
    "Email",
    "CreatedAt",
    "Role",
    "Action"
  ];

  if (!data && loading) {
    return <>Loading</>;
  }

  const handleDelete = (adminId: number) => {
    deleteAdmin({
      variables: {id: adminId},
      update: (cache) => {
        const existingAdminList = cache.readQuery<AdminListQuery>({
          query: AdminListDocument
        })
        cache.writeQuery<AdminListQuery>({
          query: AdminListDocument,
          data: {
            __typename: "Query",
            adminList: [
              ...existingAdminList?.adminList!.filter((item) => item.id !== adminId)!
            ]
          }
        })
      }
    },
    )
  }

  return (
    <Flex>
    <Flex direction="column">
      <Heading as="h4" size="md" mb={4}>
        Admin List
      </Heading>
      <Flex justify="center" direction="column">
        <Box
          minH={500}
          maxH={"30vh"}
          w={750}
          borderWidth={"3px"}
          overflowY={"auto"}
        >
          <SimpleGrid minChildWidth="120px" column={12}>
            {tableHead.map((label) => (
              <Flex
                borderWidth={"1px"}
                height="40px"
                align="center"
                justify="center"
                position="sticky"
                as={"nav"}
                top={0}
                bgColor={"gray.800"}
                zIndex={2}
                key={label}
              >
                {label}
              </Flex>
            ))}
            {data?.adminList.length === 0 ? (
              <Flex
                borderWidth={"1px"}
                height={500}
                width={1400}
                align="center"
                justify="center"
              >
                <Heading as="h4" size="md" mb={4}>
                  No Active Order
                </Heading>
              </Flex>
            ) : (
              data?.adminList.map((t) => (
                <>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                    key={t.id}
                  >
                    {t.id}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {t.username}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    <Text isTruncated={true}>{t.email}</Text>
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {format(new Date(+t.createdAt), "dd-MM-yyyy")}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    {RoleTypeIdNum[t.roleId]}
                  </Flex>
                  <Flex
                    borderWidth={"1px"}
                    height="30px"
                    align="center"
                    justify="center"
                  >
                  {admin !== t.username? 
                  <Popover>
                    <PopoverTrigger>
                      <IconButton color="red.500" size={"sm"} aria-label={"remove user"} icon={<HiUserRemove />}/>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        {`Are you sure you want to delete user: ${t.username} ?`}
                      </PopoverBody>
                      <PopoverFooter d="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                          <Button colorScheme="red" onClick={() => handleDelete(t.id)}>Delete</Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                  : null  
                  }
                  </Flex>
                </>
              ))
            )}
            <div></div>
            <div></div>
              <IconButton
                colorScheme="teal"
                aria-label="Load More"
                size="sm"
                icon={<AddIcon />}
                w={10}
                mx={"auto"}
                isLoading={loading}
                onClick={() => { setAdminRegister(true)
                }}
              />
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
    <Box ml={"5rem"} display={adminRegister? "block" : "none"}>
      <Heading as="h4" size="md" mb={4}>
        Register new Admin
      </Heading>
    <Box
        minH={500}
        maxH={"30vh"}
        w={650}
        borderWidth={"3px"}
    >
      <Formik 
        initialValues={{
          username: "",
          password: "",
          email: "",
          roleId: "" as keyof typeof RoleTypeId
        }}
        onSubmit={async (values, { setErrors: formikErrors }) => {
          const { data } = await registerAdmin({
            variables: {
              options: {
                ...values,
                roleId: RoleTypeId[values.roleId] 
              }
            },
            update: (cache, {data}) => {
              const existingAdminList = cache.readQuery<AdminListQuery>({
                query: AdminListDocument
              })
              cache.writeQuery<AdminListQuery>({
                query: AdminListDocument,
                data: {
                  __typename: "Query",
                  adminList: [
                    ...existingAdminList?.adminList!,
                    data?.registerAdmin.admin!
                  ]
                }
              })
            }
          })

          if(data?.registerAdmin.errors){
            formikErrors(toErrorMap(data?.registerAdmin.errors));
            console.log(data?.registerAdmin.errors)
          }else{
            setAdminRegister(false)
          }
        }}
      >
        {({ isSubmitting }) => (
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
              <FormLabel htmlFor={"roleId"}>role type</FormLabel>
              <Field id="roleId" name="roleId" initialValues={"xx"}>
                {({form, field, meta} : FieldProps) =>
                  <Select
                  placeholder="role type"
                  id="roleId" 
                  {...field}
                  >
                    {roleIdSelection.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                    {console.log(form, field, meta)}
                  </Select>
                }
              </Field>
            </Box>
            <Flex width="100%" justify="center">
              <Button
                mt={3}
                type="submit"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
    </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(AdminAddAdmin);
