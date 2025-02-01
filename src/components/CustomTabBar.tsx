import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { CONSTANTS } from "../constants/utilities_basic";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, shadowColor: theme.colors.text }]}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Icon Mapping
          const iconName = route.name === "Home" ? "home-outline" : route.name === "Profile" ? "person-outline" : "help-outline";

          return (
            <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)} style={styles.tabButton}>
              <Ionicons
                name={iconName}
                size={isFocused ? 20 : 16}
                color={isFocused ? theme.colors.primary : theme.colors.lightText}
                style={isFocused ? styles.iconFocused : styles.iconDefault}
              />
              <Text style={[styles.tabLabel, { color: theme.colors.lightText }, isFocused && { color: theme.colors.primary, fontWeight: "bold" }]}>
                {route.name}
              </Text>
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
    height: CONSTANTS.BOTTOM_NAV_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 10,
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
  },
});

export default CustomTabBar;
