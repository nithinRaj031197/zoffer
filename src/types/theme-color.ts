import { DefaultTheme, Theme as NavigationTheme } from "@react-navigation/native";

// Extend the DefaultTheme interface to add custom properties
declare module "@react-navigation/native" {
  export interface MyTheme extends NavigationTheme {
    bw: string; // Black or White color based on theme mode
    fonts: {
      regular: { fontFamily: string; fontWeight: "400" | "normal" };
      medium: { fontFamily: string; fontWeight: "500" | "normal" };
      bold: { fontFamily: string; fontWeight: "700" | "bold" };
      heavy: { fontFamily: string; fontWeight: "900" | "bold" };
    };
    colors: {
      background: string;
      primary: string;
      secondary: string;
      text: string;
      card: string;
      border: string;
      notification: string;
      placeholder: string;
      lightText: string;
      lightBorder?: string;
      error: string;
      success: string;
    };
  }
}
