import * as React from "react";
import {
  Button as ChakraButton,
  chakra,
  type ChakraProps,
  IconButton,
  type LayoutProps,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

interface SvgProps {
  viewBox: string;
  path: React.ReactNode;
  height: LayoutProps["height"];
}

interface ButtonProps extends ChakraProps {
  label?: string;
  svg?: SvgProps;
  type?: "submit" | "button";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { label, svg, type, href, onClick, disabled, ...rest } = props;

  const Component = href ? Link : ChakraButton;

  return (
    <>
      {label ? (
        <Component
          type={type}
          href={href || "/"}
          onClick={onClick}
          size="lg"
          variant="unstyled"
          marginX="auto"
          backgroundColor="#fff"
          _hover={{ opacity: "1" }}
          color="primary"
          display="flex"
          gap="12px"
          opacity=".9"
          borderRadius="20px"
          padding={href ? "8px 20px":"12px 20px"}
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
          fontSize="lg"
          disabled={disabled}
          {...rest}
        >
          {svg && (
            <chakra.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={svg.viewBox}
              height={svg.height}
              fill="primary"
            >
              {svg.path}
            </chakra.svg>
          )}
          {label}
        </Component>
      ) : (
        <>
          {svg && (
            <IconButton
              onClick={onClick}
              height="44px"
              minWidth="44px"
              aria-label=""
              icon={
                <chakra.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={svg.viewBox}
                  height={svg.height}
                  fill="primary"
                >
                  {svg.path}
                </chakra.svg>
              }
              disabled={disabled}
              {...rest}
            />
          )}
        </>
      )}
    </>
  );
};

export default Button;
