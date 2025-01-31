import { DefaultTheme } from "@react-navigation/native";

// Extend the DefaultTheme interface to add custom properties
declare module "@react-navigation/native" {
  export interface MyTheme {
    bw: string;
    fonts: {
      regular: { fontFamily: string; fontWeight: "400" };
      medium: { fontFamily: string; fontWeight: "500" };
      bold: { fontFamily: string; fontWeight: "700" };
      heavy: { fontFamily: string; fontWeight: "900" };
    };
  }
}
