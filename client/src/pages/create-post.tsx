import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import {
  useCreatePostMutation,
  useAddProfilePictureMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import useIsAuth from "../utils/useIsAuth";
import { useDropzone } from "react-dropzone";
import { withApollo } from "../utils/withApollo";

interface createPostProps {}

const createPost: React.FC<createPostProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [addProfilePicture] = useAddProfilePictureMutation();
  const [uploadedPict, setPicture] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    setPicture(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { errors } = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "posts" });
            },
          });
          console.log(uploadedPict);
          // const { errors: errorUpload } = await addProfilePicture({
          //   variables: {
          //     picture: uploadedPict,
          //   },
          // });
          // if (errorUpload) {
          //   throw Error(errorUpload[0].message);
          // }
          if (!errors) {
            router.push("/");
          }
        }}
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

export default withApollo({ ssr: true })(createPost);
