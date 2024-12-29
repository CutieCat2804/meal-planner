/* eslint-disable @typescript-eslint/no-misused-promises */
import { Flex, Heading, Text, chakra, Box } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import PageContainer from "~/components/PageContainer";
import { Image } from "@chakra-ui/next-js";

const Recipe: NextPage = () => {
  const router = useRouter();

  const recipe = api.router.getRecipe.useQuery({
    id: Number(router.query.recipeId),
  });
  const recipeData = recipe.data;

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
        <PageContainer>
          <Header />
          <Flex
            flexDirection="column"
            width={{ base: "95%", xl: "40%" }}
            marginX="auto"
            gap="32px"
          >
            <Flex
              flexDirection="column"
              backgroundColor="rgba(256, 256, 256, 0.9)"
              borderRadius="md"
              padding="3%"
              alignItems="center"
              gap="24px"
            >
              {recipeData.image ? (
                <Image
                  src={recipeData.image || ""}
                  alt={recipeData.title}
                  width={300}
                  height={200}
                  borderRadius="5px"
                  boxShadow="0px 0px 8px 4px rgba(0,0,0,0.3)"
                />
              ) : (
                <Box
                  alignItems="center"
                  display="inline-flex"
                  height="200px"
                  width="300px"
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
              <Heading size="xl" color="gray.800">
                {recipeData.title}
              </Heading>
              <Flex flexDirection="column" rowGap="20px" alignItems="center">
                <Flex gap="16px">
                  {recipeData.duration && (
                    <Text>
                      <chakra.b>Dauer:</chakra.b> {recipeData.duration}
                    </Text>
                  )}
                  {recipeData.portion && (
                    <Text>
                      <chakra.b>Portionen:</chakra.b> {recipeData.portion}
                    </Text>
                  )}
                </Flex>
                <Heading size="lg" color="gray.800">
                  Zutaten
                </Heading>

                <Box display="grid" gridTemplateColumns="1fr 1fr" gap="0 16px">
                  {recipeData.ingredients &&
                    recipeData.ingredients.map((ingredient) => (
                      <>
                        <Text>{ingredient.quantity}</Text>
                        <Text>{ingredient.ingredient}</Text>
                      </>
                    ))}
                </Box>
                {recipeData.description && (
                  <>
                    <Heading size="lg" color="gray.800">
                      Beschreibung
                    </Heading>
                    <Text>{recipeData.description}</Text>
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        </PageContainer>
      </main>
    </>
  );
};

export default Recipe;
