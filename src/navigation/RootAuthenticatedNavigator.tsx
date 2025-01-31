// src/navigation/RootAuthenticatedNavigator.tsx
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import PreferencesScreen from "../screens/Home/PreferencesScreen";
import { useGetUserInfoQuery } from "../api/usersApi";
import { getAccessToken } from "../utils/tokenStorage";

const Stack = createNativeStackNavigator();

const RootAuthenticatedNavigator = () => {
  const { data } = useGetUserInfoQuery({});
  const userData = data?.data;
  const firstTimeLogin = userData?.firstTimeLogin;

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        await getAccessToken();
      } catch (error) {
        console.error("Failed to get access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      {firstTimeLogin ? (
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
      ) : (
        <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootAuthenticatedNavigator;
