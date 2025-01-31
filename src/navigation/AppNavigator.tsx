// src/navigation/AppNavigator.tsx
import React, { useState, useEffect } from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import RootAuthenticatedNavigator from "./RootAuthenticatedNavigator"; // Import the new root navigator
import { getAccessToken } from "../utils/tokenStorage";
import { useDispatch, useSelector } from "react-redux";
import { loginState, logoutState } from "../redux/authSlice";
import { RootState } from "../redux/store";
import Toast from "react-native-toast-message";
import ToastConfig from "../components/ToastConfig";

interface AppNavigatorProps {
  theme: any;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ theme }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          dispatch(loginState(token));
        } else {
          dispatch(logoutState());
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
        dispatch(logoutState());
      }
    };

    checkAccessToken();
  }, [dispatch]);

  return (
    <>
      <NavigationContainer theme={theme}>{isAuthenticated ? <RootAuthenticatedNavigator /> : <AuthNavigator />}</NavigationContainer>
      <Toast config={ToastConfig} />
    </>
  );
};

export default AppNavigator;
