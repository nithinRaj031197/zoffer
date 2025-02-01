import { DefaultTheme, DarkTheme as NativeDarkTheme } from "@react-navigation/native";

const FONT_FAMILY = {
  regular: { fontFamily: "System", fontWeight: "400" },
  medium: { fontFamily: "System", fontWeight: "500" },
  bold: { fontFamily: "System", fontWeight: "700" },
  heavy: { fontFamily: "System", fontWeight: "900" },
};

export const COLORS = {
  background: "#FFFFFF",
  primary: "#4CAF50",
  textPrimary: "#212121",
  error: "#F44336",
  success: "#4CAF50",
  secondary: "#4F46E5",
  placeholder: "#AAA",
  border: "#DDD",
  lightText: "#888",
  lightBorder: "#E0E0E0",
  darkBackground: "#121212",
  darkCard: "#1E1E1E",
  darkBorder: "#333333",
  darkText: "#FFFFFF",
};

export const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    text: COLORS.textPrimary,
    card: COLORS.background,
    border: COLORS.border,
    notification: COLORS.error,
    placeholder: COLORS.placeholder,
    lightText: COLORS.lightText,
    lightBorder: COLORS.lightBorder,
    error: COLORS.error,
    success: COLORS.success,
  },
  fonts: FONT_FAMILY,
  bw: "#000",
};

export const DarkTheme = {
  ...NativeDarkTheme,
  dark: true,
  colors: {
    ...NativeDarkTheme.colors,
    background: COLORS.darkBackground,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    text: COLORS.darkText,
    card: COLORS.darkCard,
    border: COLORS.darkBorder,
    notification: COLORS.error,
    placeholder: COLORS.placeholder,
    lightText: COLORS.lightText,
    error: COLORS.error,
    success: COLORS.success,
  },
  fonts: FONT_FAMILY,
  bw: "#fff",
};
