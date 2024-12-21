// src/theme/useTheme.ts
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, LightTheme, CustomColors } from "./theme";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "dark") setIsDarkMode(true);
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  const theme = isDarkMode ? DarkTheme : LightTheme;

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
