import { Flex } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Button from "~/components/Button";
import Header from "~/components/Header";
import PageContainer from "~/components/PageContainer";

// "https://create.t3.gg/en/usage/first-steps"

const Home: NextPage = () => {
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
            width="80%"
            marginX="auto"
            flexBasis="40%"
            flexWrap="wrap"
            rowGap="64px"
          >
            <Button
              label="Meine Rezepte"
              href="/recipes"
              svg={{
                path: (
                  <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
                ),
                viewBox: "0 0 384 512",
                height: "28px",
              }}
            />
            <Button
              label="Rezept erstellen"
              href="/add-recipe"
              svg={{
                path: (
                  <path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" />
                ),
                viewBox: "0 0 384 512",
                height: "28px",
              }}
            />
            {/* <Button
              label="Einkaufsliste"
              href="/"
              svg={{
                path: (
                  <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                ),
                viewBox: "0 0 576 512",
                height: "28px",
              }}
            /> */}
          </Flex>
        </PageContainer>
      </main>
    </>
  );
};

export default Home;
