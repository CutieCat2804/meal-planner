/* eslint-disable @typescript-eslint/no-misused-promises */
import { Flex, Textarea, chakra } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Button from "~/components/Button";
import Header from "~/components/Header";
import Input from "~/components/Input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "../utils/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

// Logo Bild hinzufügen
// https://github.com/simone1999/IceCreamSwapUiNew/blob/IcecreamSwap/apps/web/src/views/CreateToken/create-schema.ts
// https://github.com/simone1999/IceCreamSwapUiNew/blob/IcecreamSwap/apps/web/src/views/CreateToken/index.tsx

const schema = z.object({
  //   tokenName: z.string().min(1, 'Token name must be at least 1 character'),
  // {errors.tokenName && <FormError>{errors.tokenName.message}</FormError>}
  title: z.string(),
  duration: z.string(),
});

export type FormValues = z.infer<typeof schema>;

const AddRecipe: NextPage = () => {
  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const addNewRecipe = api.router.addNewRecipe.useMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addNewRecipe.mutateAsync({
      title: data.title,
      duration: data.duration,
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            flexDirection="column"
            width="100%"
            background="url('leaf-background.jpg') no-repeat center center fixed"
            backgroundSize="cover"
            height="100vh"
            gap="100px"
          >
            <Header />
            <Flex flexDirection="column" width="80%" marginX="auto" gap="32px">
              <Flex
                background="#fff"
                height="200px"
                width="300px"
                alignItems="center"
                marginX="auto"
                borderRadius="8px"
                justifyContent="center"
                fontWeight="bold"
                fontSize="xl"
                color="#5C892C"
                gap="12px"
                opacity=".9"
                _hover={{ opacity: "1" }}
              >
                <chakra.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="32px"
                  fill="#5C892C"
                >
                  <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                </chakra.svg>
                Foto hinzufügen
              </Flex>
              <Flex width="100%">
                <Input placeholder="Titel" name="title" register={register} />
              </Flex>
              <Flex width="100%" gap="32px">
                <Input
                  placeholder="Gesamtdauer"
                  name="duration"
                  register={register}
                />
                {/* <Input placeholder="Portionen" />
                <Input placeholder="Kategorie" /> */}
              </Flex>
              <Flex>
                <Textarea
                  placeholder="Beschreibung"
                  background="#fff"
                  opacity=".9"
                  _focusVisible={{ opacity: "1" }}
                />
              </Flex>
            </Flex>
            <Button label="Erstellen" type="submit" />
          </Flex>
        </form>
      </main>
    </>
  );
};

export default AddRecipe;
