import { DefaultTheme, DarkTheme as NativeDarkTheme } from "@react-navigation/native";
import { COLORS } from "./colors";

const FONT_FAMILY = {
  regular: { fontFamily: "System", fontWeight: "400" },
  medium: { fontFamily: "System", fontWeight: "500" },
  bold: { fontFamily: "System", fontWeight: "700" },
  heavy: { fontFamily: "System", fontWeight: "900" },
};

export const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    primary: COLORS.primary,
    text: COLORS.textPrimary,
    card: COLORS.background,
    border: COLORS.border,
    notification: COLORS.error,
  },
  fonts: FONT_FAMILY,
  bw: "#000",
};

export const DarkTheme = {
  ...NativeDarkTheme,
  dark: true,
  colors: {
    ...NativeDarkTheme.colors,
    background: "#121212",
    primary: COLORS.primary,
    text: "#FFFFFF",
    card: "#1E1E1E",
    border: "#333333",
    notification: COLORS.error,
  },
  fonts: FONT_FAMILY,
  bw: "#fff",
};

// Optional: Custom Colors
export const CustomColors = {
  error: COLORS.error,
  success: COLORS.success,
  placeholder: COLORS.placeholder,
  lightText: COLORS.lightText,
  secondary: COLORS.secondary,
};
