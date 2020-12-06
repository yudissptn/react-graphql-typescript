import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";

interface ImageUploadProps {
  preview: string;
  getRootPropsDZ: (props?: DropzoneRootProps | undefined) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps;
  isDragActive: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  preview,
  getRootPropsDZ,
  getInputProps,
  isDragActive,
}) => {
  return (
    <>
      <Flex
        h={220}
        w={350}
        borderWidth="1px"
        borderColor="gray.50"
        shadow="md"
        mr="auto"
        mt={2}
        align="center"
        justify="center"
        py={2}
      >
        {preview ? (
          <Image src={preview} boxSize="200px" objectFit="cover" />
        ) : (
          <Box
            h={50}
            w={350}
            borderWidth="1px"
            borderColor="gray.50"
            shadow="md"
            mr="auto"
            mt={2}
          >
            <div {...getRootPropsDZ()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </Box>
        )}
      </Flex>
    </>
  );
};
