import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Icon Mapping
          const iconName =
            route.name === "Home"
              ? "home-outline"
              : route.name === "Profile"
              ? "person-outline"
              : route.name === "Settings"
              ? "settings-outline"
              : "help-outline";

          return (
            <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)} style={styles.tabButton}>
              <Ionicons
                name={iconName}
                size={isFocused ? 28 : 24}
                color={isFocused ? "#000000" : "#888888"}
                style={isFocused ? styles.iconFocused : styles.iconDefault}
              />
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>{route.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
  },
  tabContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconDefault: {
    marginBottom: 4,
  },
  iconFocused: {
    marginBottom: 4,
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 12,
    color: "#888888",
  },
  tabLabelFocused: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  fabButton: {
    position: "absolute",
    top: -35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default CustomTabBar;
