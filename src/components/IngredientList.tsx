import { Button } from "@chakra-ui/react";
import * as React from "react";

const IngredientList: React.FC = () => {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [newIngredient, setNewIngredient] = React.useState("");

  const addIngredient = (newIngredient: string) => {
    setIngredients([...ingredients, newIngredient]);
  };

  return (
    <div>
      <h2>Ingredients List</h2>
      <ul>
        {ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <label>
        New Ingredient:
        <input
          type="text"
          value={newIngredient}
          onChange={(event) => setNewIngredient(event.target.value)}
        />
      </label>
      <Button
        onClick={() => {
          addIngredient(newIngredient);
          setNewIngredient("");
        }}
      >
        Add Ingredient
      </Button>
    </div>
  );
};

export default IngredientList;
