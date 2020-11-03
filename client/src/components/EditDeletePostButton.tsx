import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButton: React.FC<EditDeletePostButtonProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <NextLink href={"/post/edit/[id]"} as={`/post/edit/${id}`}>
        <IconButton as={Link} icon="edit" aria-label="Edit Post" mr={4} />
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ id: id });
        }}
      />
    </Box>
  );
};
