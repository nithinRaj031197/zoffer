import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, LightTheme, CustomColors } from "./theme";

// Define theme modes
type ThemeMode = "light" | "dark";

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = (await AsyncStorage.getItem("theme")) as ThemeMode | null;
        if (savedTheme) {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme from storage:", error);
      }
    };

    loadTheme();
  }, []);

  // Toggle Theme Mode
  const toggleTheme = async (mode: ThemeMode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem("theme", mode);
    } catch (error) {
      console.error("Failed to save theme to storage:", error);
    }
  };

  // Determine the active theme
  const theme = themeMode === "dark" ? DarkTheme : LightTheme;

  return {
    theme: {
      ...theme,
      colors: {
        ...theme.colors,
        ...CustomColors,
      },
    },
    themeMode,
    toggleTheme,
  };
};
