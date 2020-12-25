import React from "react";
import { Layout } from "../../components/Layout";
import { Heading, Box } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButton } from "../../components/EditDeletePostButton";
import { withApollo } from "../../utils/withApollo";

export const Post = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout mt={0}>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout mt={0}>
        <div>{error.message}</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout mt={0}>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout mt={0}>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButton
        id={data.post.id}
        creatorId={data.post.creator.id}
        pictUrl={data.post.pictUrl}
      />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
