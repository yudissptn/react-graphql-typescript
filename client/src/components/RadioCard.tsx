import { Box, useRadio, UseRadioProps, FormControl } from "@chakra-ui/react";
import React from "react";
import { useField, FieldAttributes } from "formik";

type MyRadioProps = {} & UseRadioProps & FieldAttributes<{}>;

const RadioCard: React.FC<MyRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const [field] = useField<{}>(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <FormControl {...field} as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </FormControl>
  );
};

export default RadioCard;
