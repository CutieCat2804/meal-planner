import * as React from "react";
import { Input as ChakraInput } from "@chakra-ui/react";
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "~/pages/add-recipe";

interface InputProps {
  placeholder: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
}

const Input: React.FC<InputProps> = (props) => {
  const { placeholder, register, name } = props;

  return (
    <ChakraInput
      {...register(name)}
      placeholder={placeholder}
      background="#fff"
      height="52px"
      opacity=".9"
      _focusVisible={{ opacity: "1" }}
    />
  );
};

export default Input;
