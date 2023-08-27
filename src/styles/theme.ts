import { extendTheme } from "@chakra-ui/react";
import { defineStyleConfig } from "@chakra-ui/react";
import { pacifico, roboto } from "~/styles/fonts";

export const theme = extendTheme({
  colors: {
    primary: "#5C892C",
    "primary-hover": "#3e5d1d",
  },
  styles: {
    global: {
      "*": {
        fontFamily: roboto.style.fontFamily,
      },
    },
  },
  components: {
    Heading: defineStyleConfig({
      baseStyle: {
        color: "white",
        fontFamily: pacifico.style.fontFamily,
        fontWeight: pacifico.style.fontWeight,
      },
    }),
  },
});
