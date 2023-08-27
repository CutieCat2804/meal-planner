import * as React from "react";
import { Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

const PageContainer: React.FC<{ children: ReactNode }> = (props) => {
  const { children } = props;

  return (
    <Flex
      flexDirection="column"
      width="100%"
      background="url('/leaf-background.jpg') repeat center center fixed"
      backgroundSize="cover"
      minHeight="100vh"
      gap="32px"
      paddingBottom="24px"
    >
      {children}
    </Flex>
  );
};

export default PageContainer;
