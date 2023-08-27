import { Heading, List, ListItem, VStack } from "@chakra-ui/react";
import * as React from "react";
import {
  useFieldArray,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type Control,
} from "react-hook-form";
import type { FormValues } from "~/interface/FormValues";
import Button from "./Button";
import Input from "./Input";

interface Ingredient {
  ingredient: string;
  quantity: string | null;
}

interface IngredientListProps {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  ingredients?: Ingredient[];
}

const IngredientList: React.FC<IngredientListProps> = (props) => {
  const { register, control, ingredients } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  if (fields.length === 0) {
    append({ quantity: "", ingredient: "" });
  }

  return (
    <VStack flexDirection="column" margin="auto" spacing="16px">
      <Heading size="2xl" textAlign="center">
        Zutaten
      </Heading>
      <List display="flex">
        <VStack spacing="12px">
          {fields.map((item, index) => (
            <ListItem key={item.id} display="flex" gap="12px">
              <Input
                placeholder="Menge"
                name={`ingredients.${index}.quantity`}
                register={register}
                width="40%"
                defaultValue={ingredients && ingredients[index]?.quantity}
              />
              <Input
                placeholder="Zutat"
                name={`ingredients.${index}.ingredient`}
                register={register}
                defaultValue={ingredients && ingredients[index]?.ingredient}
              />

              <Button
                onClick={() => remove(index)}
                svg={{
                  path: (
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  ),
                  viewBox: "0 0 448 512",
                  height: "20px",
                }}
                disabled={fields.length === 1}
              />
            </ListItem>
          ))}
          <Button
            type="button"
            onClick={() => append({ quantity: "", ingredient: "" })}
            svg={{
              path: (
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              ),
              viewBox: "0 0 448 512",
              height: "24px",
            }}
            marginRight="8px"
            label="Hinzufügen"
          />
        </VStack>
      </List>
    </VStack>
  );
};

export default IngredientList;
