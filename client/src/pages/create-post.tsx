import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import {
  useCreatePostMutation,
  useAddProfilePictureMutation,
  useMeQuery,
  useCustomerQuery,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import useIsAuth from "../utils/useIsAuth";
import { useDropzone } from "react-dropzone";
import { withApollo } from "../utils/withApollo";
import { isServer } from "../utils/isServer";

interface createOrderProps {}

const createOrder: React.FC<createOrderProps> = ({}) => {
  const [preview, setPreview] = useState("");
  const [uploadedPict, setPicture] = useState(null);
  const [errors, setErrors] = useState("");
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [addProfilePicture] = useAddProfilePictureMutation();
  const { data } = useMeQuery({
    skip: isServer(),
  });
  const { data: custData } = useCustomerQuery({
    skip: isServer(),
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024000,
  });
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "", pictUrl: "" }}
        onSubmit={async (values) => {
          const { data: pict, errors: errorUpload } = await addProfilePicture({
            variables: {
              picture: uploadedPict,
              user: String(data?.me?.username),
            },
          });
          if (errorUpload) {
            setErrors(`Error upload to S3: ${errorUpload[0].message}`);
          }
          const { errors } = await createPost({
            variables: {
              input: {
                ...values,
                pictUrl: pict ? pict.addProfilePicture.Location : "error link",
              },
            },
            update: (cache) => {
              cache.evict({ fieldName: "posts" });
            },
          });
          if (!errors) {
            router.push("/");
          }
        }}
        validateOnChange
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
            {preview && (
              <div>
                <img src={preview} />
              </div>
            )}
            {errors && <span>{errors}</span>}
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              variantColor="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: true })(createOrder);
