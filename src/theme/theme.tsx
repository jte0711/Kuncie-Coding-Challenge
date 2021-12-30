import React, { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider, DefaultTheme } from "styled-components/native";

// TODO:
// - Add dark theme OR remove dark theme

declare module "styled-components/native" {
  export interface DefaultTheme {
    primary: string;
    background: string;
    lightBackground: string;
    white: string;
    grey: string;
    darkGrey: string;
    darkerGrey: string;
    green: string;
    lightGreen: string;
    darkGreen: string;
  }
}

const lightTheme: DefaultTheme = {
  primary: "#F5F6F7",
  background: "#20252A",
  lightBackground: "#2f3439",
  white: "#ffffff",
  grey: "#C1C0C8",
  darkGrey: "#757575",
  darkerGrey: "#757575",
  green: "#1EB953",
  lightGreen: "#34DB6D",
  darkGreen: "#0A8434",
};

const darkTheme: DefaultTheme = {
  primary: "#F5F6F7",
  background: "#20252a",
  lightBackground: "#2f3439",
  white: "#ffffff",
  grey: "#C1C0C8",
  darkGrey: "#757575",
  darkerGrey: "#757575",
  green: "#1EB953",
  lightGreen: "#34DB6D",
  darkGreen: "#0A8434",
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
