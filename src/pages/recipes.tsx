/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Flex,
  Heading,
  chakra,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import { api } from "../utils/api";
import PageContainer from "~/components/PageContainer";
import { Image } from "@chakra-ui/next-js";
import Button from "~/components/Button";

const Recipes: NextPage = () => {
  const recipes = api.router.getAll.useQuery().data;

  const utils = api.useContext();
  const deleteRecipe = api.router.deleteRecipe.useMutation({
    onSuccess() {
      void utils.router.getAll.invalidate();
    },
  });

  return (
    <>
      <Head>
        <title>Meal Planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContainer>
          <Header />
          <Box
            marginX="auto"
            gap="64px"
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
            width="80%"
          >
            {recipes?.map((recipe) => {
              return (
                <Flex
                  key={recipe.id}
                  flexDirection={{ base: "column", md: "row" }}
                  gap="16px"
                >
                  <LinkBox
                    key={recipe.id}
                    background="white"
                    borderRadius="8px"
                    padding="16px"
                    gap="24px"
                    width="100%"
                    flexDirection={{ base: "column", md: "row" }}
                    display="flex"
                  >
                    <Flex
                      minWidth="max-content"
                      justifyContent="center"
                      opacity="1"
                    >
                      {recipe.image ? (
                        <Image
                          src={recipe.image || ""}
                          alt={recipe.title}
                          width={150}
                          height={100}
                          borderRadius="5px"
                        />
                      ) : (
                        <Box
                          alignItems="center"
                          display="inline-flex"
                          height="100px"
                          width="150px"
                          gap="12px"
                          justifyContent="center"
                          border="1px solid #d3d3d3"
                          borderRadius="5px"
                        >
                          <chakra.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            height="32px"
                            fill="primary"
                          >
                            <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                          </chakra.svg>
                        </Box>
                      )}
                    </Flex>
                    <Flex
                      flexDirection="column"
                      rowGap="8px"
                      alignItems={{ base: "center", md: "baseline" }}
                    >
                      <LinkOverlay href={`/recipe/${recipe.id}`}>
                        <Heading fontSize="3xl" color="primary">
                          {recipe.title}
                        </Heading>
                      </LinkOverlay>
                      <Flex flexDirection="column" rowGap="16px">
                        <Flex
                          gap="8px"
                          justifyContent={{ base: "center", md: "left" }}
                        >
                          {recipe.duration && (
                            <Text>
                              <chakra.b>Dauer:</chakra.b> {recipe.duration}
                            </Text>
                          )}
                          {recipe.portion && (
                            <Text>
                              <chakra.b>Portionen:</chakra.b> {recipe.portion}
                            </Text>
                          )}
                        </Flex>
                        {recipe.description && (
                          <Text>
                            <chakra.b>Beschreibung:</chakra.b>{" "}
                            {recipe.description.length > 100
                              ? recipe.description.slice(0, 100 - 1) + "..."
                              : recipe.description}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                  </LinkBox>
                  <Flex
                    flexDirection={{ base: "row", md: "column" }}
                    gap="16px"
                    margin="auto"
                  >
                    <Button
                      label="Bearbeiten"
                      href={`/editRecipe/${recipe.id}`}
                    />

                    <Button
                      label="Löschen"
                      onClick={() =>
                        deleteRecipe.mutateAsync({ id: recipe.id })
                      }
                    />
                  </Flex>
                </Flex>
              );
            })}
          </Box>
        </PageContainer>
      </main>
    </>
  );
};

export default Recipes;
