/* eslint-disable @typescript-eslint/no-misused-promises */
import { Flex, Textarea, Heading } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Button from "~/components/Button";
import Header from "~/components/Header";
import Input from "~/components/Input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "../utils/api";
import { formValuesSchema } from "~/interface/FormValues";
import type { FormValues } from "~/interface/FormValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import PageContainer from "~/components/PageContainer";
import IngredientList from "~/components/IngredientList";
import FileInput from "~/components/FileInput";
import { FormProvider } from "react-hook-form";

const AddRecipe: NextPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
  });
  const { handleSubmit, register, control } = form;

  const addNewRecipe = api.router.addNewRecipe.useMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addNewRecipe.mutateAsync({
      title: data.title,
      duration: data.duration,
      description: data.description,
      portion: data.portion,
      ingredients: data.ingredients,
      image: data.image,
    });

    await router.push("/");
  };

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
                />
                <Flex width="100%">
                  <Input placeholder="Titel" name="title" register={register} />
                </Flex>
                <Flex width="100%" gap="32px">
                  <Input
                    placeholder="Gesamtdauer"
                    name="duration"
                    register={register}
                  />
                  <Input
                    placeholder="Portionen"
                    name="portion"
                    register={register}
                  />
                </Flex>
                <IngredientList
                  control={control}
                  register={register}
                  handleSubmit={handleSubmit}
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
                  />
                </Flex>
              </Flex>
              <Flex alignSelf="center" gap="24px" width="fit-content">
                <Button label="Abbrechen" href="/" />
                <Button label="Erstellen" type="submit" />
              </Flex>
            </PageContainer>
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export default AddRecipe;
