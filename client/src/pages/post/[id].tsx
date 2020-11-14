import React from "react";
import { Layout } from "../../components/Layout";
import { Heading, Box } from "@chakra-ui/core";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButton } from "../../components/EditDeletePostButton";
import { withApollo } from "../../utils/withApollo";

export const Post = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>{error.message}</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
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
