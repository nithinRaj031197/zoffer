import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet } from "react-native";
import ProfileStackNavigator from "./ProfileStackNavigator";
import CustomTabBar from "../components/CustomTabBar";
import HomePageNavigator from "./HomePageNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator id={undefined} tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomePageNavigator} />
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
