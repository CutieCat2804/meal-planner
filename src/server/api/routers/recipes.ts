import { z } from "zod";
import {
  formValuesSchema,
  formValuesWithIdSchema,
} from "~/interface/FormValues";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany();
  }),

  getRecipe: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.recipe.findUnique({
        where: { id: input.id },
      });
    }),

  getIngredients: publicProcedure
    .input(z.object({ recipeId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.ingredient.findMany({
        where: { recipeId: input.recipeId },
      });
    }),

  editRecipe: publicProcedure
    .input(formValuesWithIdSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.recipe.update({
        where: { id: input.id },
        data: {
          title: input.data.title,
          duration: input.data.duration,
          description: input.data.description,
          portion: input.data.portion,
          ingredients: {
            create: input.data.ingredients.filter(
              (ingredient) => ingredient.ingredient
            ),
          },
          image: input.data.image?.blob || null,
        },
      });
    }),

  addNewRecipe: publicProcedure
    .input(formValuesSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.recipe.create({
        data: {
          title: input.title,
          duration: input.duration,
          description: input.description,
          portion: input.portion,
          ingredients: {
            create: input.ingredients.filter(
              (ingredient) => ingredient.ingredient
            ),
          },
          image: input.image?.blob || null,
        },
      });
    }),

  deleteRecipe: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.recipe.delete({
        where: { id: input.id },
      });
    }),
});
