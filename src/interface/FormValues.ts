import { z } from "zod";

export const formValuesSchema = z.object({
  //   tokenName: z.string().min(1, 'Token name must be at least 1 character'),
  // {errors.tokenName && <FormError>{errors.tokenName.message}</FormError>}
  title: z.string().min(1, "Title name must be at least 1 character"),
  duration: z.string(),
  description: z.string(),
  portion: z.string(),
  ingredients: z.array(
    z.object({
      ingredient: z.string(),
      quantity: z.string(),
    })
  ),
});

export type FormValues = z.infer<typeof formValuesSchema>;
