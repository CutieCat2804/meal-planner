/* eslint-disable @typescript-eslint/no-misused-promises */
import { Flex, Textarea, Heading } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Button from "~/components/Button";
import Header from "~/components/Header";
import Input from "~/components/Input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { formValuesSchema } from "~/interface/FormValues";
import type { FormValues } from "~/interface/FormValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import PageContainer from "~/components/PageContainer";
import IngredientList from "~/components/IngredientList";
import FileInput from "~/components/FileInput";
import { FormProvider } from "react-hook-form";
import { useEffect } from "react";

const AddRecipe: NextPage = () => {
  const router = useRouter();

  const recipe = api.router.getRecipe.useQuery({
    id: Number(router.query.recipeId),
  });
  const recipeData = recipe.data;

  const form = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
  });
  const { handleSubmit, register, control } = form;

  const editRecipe = api.router.editRecipe.useMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await editRecipe.mutateAsync({
      id: Number(router.query.recipeId),
      data: {
        title: data.title,
        duration: data.duration,
        description: data.description,
        portion: data.portion,
        ingredients: data.ingredients,
        image: data.image,
      },
    });

    await router.push("/recipes");
  };

  useEffect(() => {
    if (recipeData?.ingredients) {
      form.setValue("ingredients", recipeData?.ingredients);
    }
  }, [form, recipeData?.ingredients]);

  if (recipe.isLoading) {
    return <></>;
  }

  if (!recipeData) {
    return <p>Rezept nicht gefunden</p>;
  }

  return (
    <>
      <Head>
        <title>Meal Planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PageContainer>
              <Header />
              <Flex
                flexDirection="column"
                width={{ base: "95%", xl: "40%" }}
                marginX="auto"
                gap="32px"
              >
                <FileInput
                  accept={{
                    "image/png": [".png"],
                    "image/jpeg": [".jpeg", ".jpg"],
                  }}
                  name="image"
                  defaultValue={recipeData.image}
                />
                <Flex width="100%">
                  <Input
                    placeholder="Titel"
                    name="title"
                    register={register}
                    defaultValue={recipeData.title}
                  />
                </Flex>
                <Flex width="100%" gap="32px">
                  <Input
                    placeholder="Gesamtdauer"
                    name="duration"
                    register={register}
                    defaultValue={recipeData.duration}
                  />
                  <Input
                    placeholder="Portionen"
                    name="portion"
                    register={register}
                    defaultValue={recipeData.portion}
                  />
                </Flex>
                <IngredientList
                  control={control}
                  register={register}
                  handleSubmit={handleSubmit}
                  ingredients={recipeData.ingredients}
                />
                <Flex flexDirection="column" rowGap="16px">
                  <Heading size="2xl" textAlign="center">
                    Anleitung
                  </Heading>
                  <Textarea
                    placeholder="Anleitung"
                    background="#fff"
                    opacity=".9"
                    _focusVisible={{ opacity: "1" }}
                    {...register("description")}
                    defaultValue={recipeData.description || ""}
                  />
                </Flex>
              </Flex>
              <Flex alignSelf="center" gap="24px" width="fit-content">
                <Button label="Abbrechen" href="/recipes" />
                <Button label="Updaten" type="submit" />
              </Flex>
            </PageContainer>
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export default AddRecipe;
