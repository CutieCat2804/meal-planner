import { formValuesSchema } from "~/interface/FormValues";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),

  // Beispiel
  getSpecific: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: { title: { contains: "s" }, duration: "1" },
    });
  }),

  addNewRecipe: publicProcedure
    .input(formValuesSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.post.create({
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
        },
      });
    }),
});
