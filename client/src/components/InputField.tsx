import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  ComponentWithAs,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
  required?: boolean;
  radio?: boolean;
  radioOptions?: string[];
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  required,
  radio,
  radioOptions,
  ...props
}) => {
  let InputOrTextArea: ComponentWithAs<any, unknown> = Input;
  if (textarea) {
    InputOrTextArea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {!radio && !radioOptions ? (
        <InputOrTextArea {...field} {...props} id={field.name} />
      ) : (
        <HStack spacing="24px" {...field} {...props} id={field.name}>
          {radioOptions?.map((item) => (
            <Radio id={field.name} value={item}>
              {item}
            </Radio>
          ))}
        </HStack>
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
