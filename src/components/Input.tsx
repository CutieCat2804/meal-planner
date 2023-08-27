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
  defaultValue?: string | null;
}

const Input: React.FC<InputProps> = (props) => {
  const { placeholder, register, name, defaultValue, ...rest } = props;

  const [value, setValue] = React.useState(defaultValue)

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
      onChange={(event) => setValue(event.target.value)}
      value={value || ''}
    />
  );
};

export default Input;
