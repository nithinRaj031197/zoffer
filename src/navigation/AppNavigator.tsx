// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

interface AppNavigatorProps {
  theme: Theme;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ theme }) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator id={undefined}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
