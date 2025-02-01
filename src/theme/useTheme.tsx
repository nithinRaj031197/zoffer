import React, { createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, LightTheme } from "./theme";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  theme: typeof DarkTheme;
  themeMode: ThemeMode;
  toggleTheme: (mode: ThemeMode) => void;
}

// Create the ThemeContext
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps extends PropsWithChildren {}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [theme, setTheme] = useState(() => ({
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      // ...CustomColors,
    },
  }));

  // Load the saved theme from AsyncStorage
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

  // Update the active theme whenever `themeMode` changes
  useEffect(() => {
    const activeTheme = themeMode === "dark" ? DarkTheme : LightTheme;
    setTheme({
      ...activeTheme,
      colors: {
        ...activeTheme.colors,
        // ...CustomColors,
      },
    });
  }, [themeMode]);

  // Toggle Theme Mode
  const toggleTheme = async (mode: ThemeMode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem("theme", mode);
    } catch (error) {
      console.error("Failed to save theme to storage:", error);
    }
  };

  return <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
