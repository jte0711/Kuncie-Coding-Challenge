import React, { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider, DefaultTheme } from "styled-components/native";

// TODO:
// - Add dark theme OR remove dark theme

declare module "styled-components/native" {
  export interface DefaultTheme {
    primary: string;
    background: string;
    white: string;
    grey: string;
  }
}

const lightTheme: DefaultTheme = {
  primary: "#ff6f00",
  background: "#ffffff",
  white: "ffffff",
  grey: "#e5e7eb",
};

const darkTheme: DefaultTheme = {
  primary: "#ff6f00",
  background: "#ffffff",
  white: "ffffff",
  grey: "#e5e7eb",
};

const ThemeWrapper = ({
  children,
}: PropsWithChildren<Record<never, never>>): JSX.Element => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default ThemeWrapper;
