// src/navigation/AppNavigator.tsx
import React, { useEffect } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Platform } from "react-native";
import { NavigationContainer, Theme } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import RootAuthenticatedNavigator from "./RootAuthenticatedNavigator";
import { getAccessToken } from "../utils/tokenStorage";
import { useDispatch, useSelector } from "react-redux";
import { loginState, logoutState } from "../redux/authSlice";
import { RootState } from "../redux/store";
import Toast from "react-native-toast-message";
import ToastConfig from "../components/ToastConfig";

interface AppNavigatorProps {
  theme: Theme;
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer theme={theme}>{isAuthenticated ? <RootAuthenticatedNavigator /> : <AuthNavigator />}</NavigationContainer>
        <Toast config={ToastConfig} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default AppNavigator;
