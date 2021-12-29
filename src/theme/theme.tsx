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
    darkGrey: string;
  }
}

const lightTheme: DefaultTheme = {
  primary: "#F5F6F7",
  background: "#20252A",
  white: "#ffffff",
  grey: "#C1C0C8",
  darkGrey: "#757575",
};

const darkTheme: DefaultTheme = {
  primary: "#F5F6F7",
  background: "#20252a",
  white: "#ffffff",
  grey: "#C1C0C8",
  darkGrey: "#757575",
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
