import { DefaultTheme, DarkTheme as NativeDarkTheme } from "@react-navigation/native";
import { COLORS } from "./colors";
import { FONT_FAMILY } from "./fonts";
import { MyTheme } from "@react-navigation/native";

export const LightTheme: MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: COLORS.light,
  fonts: FONT_FAMILY,
  bw: "#000",
};

export const DarkTheme: MyTheme = {
  ...NativeDarkTheme,
  dark: true,
  colors: COLORS.dark,
  fonts: FONT_FAMILY,
  bw: "#fff",
};
