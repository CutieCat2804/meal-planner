import type { Recipe } from "@prisma/client";
import { z } from "zod";
import {
  type FormValues,
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
    .query(async ({ ctx, input }) => {
      const recipe: Recipe | null = await ctx.prisma.recipe.findUnique({
        where: { id: input.id },
      });
      try {
        if (recipe?.ingredients) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          recipe.ingredients = JSON.parse(recipe.ingredients);
        }
      } catch (_) {}

      return recipe as unknown as FormValues;
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
          ingredients: JSON.stringify(input.data.ingredients),
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
          ingredients: JSON.stringify(input.ingredients),
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
