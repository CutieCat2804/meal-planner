import * as React from "react";
import { type ChakraProps, Input as ChakraInput } from "@chakra-ui/react";
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "~/interface/FormValues";

interface InputProps extends ChakraProps {
  placeholder: string;
  name:
    | keyof FormValues
    | `ingredients.${number}.quantity`
    | `ingredients.${number}.ingredient`;
  register: UseFormRegister<FormValues>;
}

const Input: React.FC<InputProps> = (props) => {
  const { placeholder, register, name, ...rest } = props;

  return (
    <ChakraInput
      {...rest}
      {...register(name)}
      placeholder={placeholder}
      background="#fff"
      height="44px"
      opacity=".9"
      _focusVisible={{ opacity: "1" }}
      autoComplete="off"
    />
  );
};

export default Input;
