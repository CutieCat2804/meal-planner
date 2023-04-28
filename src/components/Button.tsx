import * as React from "react";
import { Button as ChakraButton, chakra } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

interface ButtonProps {
  label: string;
  svgViewBox?: string;
  svgPath?: React.ReactNode;
  type?: "submit";
  href?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { label, svgViewBox, svgPath, type, href } = props;

  const Component = href ? Link : ChakraButton;

  return (
    <Component
      type={type}
      href={href || "/"}
      variant="unstyled"
      marginX="auto"
      backgroundColor="#fff"
      _hover={{ opacity: "1" }}
      color="#5C892C"
      height="fit-content"
      width="300px"
      fontSize="3xl"
      fontFamily="inherit"
      display="flex"
      gap="12px"
      opacity=".9"
      borderRadius="20px"
      padding="12px 20px"
      alignItems="center"
      justifyContent="center"
    >
      {svgPath && svgViewBox && (
        <chakra.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={svgViewBox}
          height="28px"
          fill="#5C892C"
        >
          {svgPath}
        </chakra.svg>
      )}
      {label}
    </Component>
  );
};

export default Button;
