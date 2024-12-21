// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

interface AppNavigatorProps {
  theme: Theme;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ theme }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return <NavigationContainer theme={theme}>{isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}</NavigationContainer>;
};

export default AppNavigator;
