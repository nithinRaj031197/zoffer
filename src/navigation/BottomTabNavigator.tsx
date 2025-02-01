import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import CustomTabBar from "../components/CustomTabBar";
import MerchantDashboard from "../screens/Home/MerchantDashboard";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator id={undefined} tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={MerchantDashboard} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure content stretches and fits the screen
  },
});

export default BottomTabNavigator;
