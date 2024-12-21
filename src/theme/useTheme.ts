// src/theme/useTheme.ts
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, ColorSchemeName } from "react-native";
import { DarkTheme, LightTheme, CustomColors } from "./theme";

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem("theme")) as "light" | "dark" | "system" | null;
      if (savedTheme) {
        setThemeMode(savedTheme);
      } else {
        setThemeMode("system");
      }
    };

    loadTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      if (themeMode === "system") {
        setThemeMode(colorScheme === "dark" ? "dark" : "light");
      }
    });

    return () => subscription.remove();
  }, [themeMode]);

  const toggleTheme = async (mode: "light" | "dark" | "system") => {
    setThemeMode(mode);
    await AsyncStorage.setItem("theme", mode);
  };

  const systemTheme = Appearance.getColorScheme();
  const theme = themeMode === "dark" ? DarkTheme : themeMode === "light" ? LightTheme : systemTheme === "dark" ? DarkTheme : LightTheme;

  return {
    theme: {
      ...theme,
      colors: {
        ...theme.colors,
        ...CustomColors,
      },
    },
    toggleTheme,
  };
};
