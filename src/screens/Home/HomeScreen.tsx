import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { getAccessToken } from "../../utils/tokenStorage";
import { useTheme } from "../../theme";
import { useGetUserInfoQuery } from "../../api/usersApi";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootAuthenticatedNavigatorParamList } from "../../types/generic-type";

const HomeScreen = () => {
  const { theme: currentTheme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootAuthenticatedNavigatorParamList>>();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { data, isLoading } = useGetUserInfoQuery({});
  const userData = data?.data;
  const firstTimeLogin = userData?.firstTimeLogin;

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessToken();

        setAccessToken(token);
      } catch (error) {
        console.error("Failed to get access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (!isLoading && firstTimeLogin) {
      navigation.navigate("Preferences");
    }
  }, [isLoading, firstTimeLogin, navigation]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
        <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        <Text style={[styles.loadingText, { color: currentTheme.colors.primary }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <Text style={[styles.header, { color: currentTheme.bw }]}>HomeScreen</Text>
      <Text style={[styles.tokenText, { color: currentTheme.colors.primary }]}>Access Token: {accessToken ? accessToken : "No token found"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default HomeScreen;
