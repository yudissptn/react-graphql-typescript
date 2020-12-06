import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const useImageUpload = () => {
  const [preview, setPreview] = useState("");
  const [uploadedPict, setPicture] = useState(null);
  const [, setErrors] = useState("");

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

  const {
    getRootProps: getRootPropsDZ,
    getInputProps,
    isDragActive,
  } = useDropzone({
    maxSize: 1024000,
    onDrop,
  });

  return {
    preview,
    uploadedPict,
    onDrop,
    getRootPropsDZ,
    getInputProps,
    isDragActive,
  };
};
