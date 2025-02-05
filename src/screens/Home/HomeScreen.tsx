import React, { useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "../../theme";
import { useGetUserInfoQuery } from "../../api/usersApi";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootAuthenticatedNavigatorParamList } from "../../types/generic-type";
import MerchantDashboard from "./MerchantDashboard";
import UserDashboard from "./UserDashboard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const HomeScreen = () => {
  const { theme: currentTheme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootAuthenticatedNavigatorParamList>>();

  const dashboardType = useSelector((state: RootState) => state.dashboard.dashboardType);

  const { data, isLoading } = useGetUserInfoQuery({});
  const userData = data?.data;
  const firstTimeLogin = userData?.firstTimeLogin;

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
      {dashboardType === "merchant" ? <MerchantDashboard navigation={navigation} /> : <UserDashboard />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
