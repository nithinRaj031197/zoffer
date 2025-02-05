import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTheme } from "../theme/useTheme";
import LogoutButton from "../components/LogoutButton";
import { setDashboardType } from "../redux/dashboardSlice";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, themeMode, toggleTheme } = useTheme();

  const dashboardType = useSelector((state: RootState) => state.dashboard.dashboardType);

  const dispatch = useDispatch();

  const handleThemeChange = (mode: "light" | "dark") => {
    toggleTheme(mode);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* User Profile Information */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.colors.text }]}>User Profile:</Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>Username: {user || "Guest"}</Text>
      </View>

      {/* Theme Toggle */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Theme:</Text>
        <View style={styles.themeOptions}>
          <Button title="Light" onPress={() => handleThemeChange("light")} color={themeMode === "light" ? "#4CAF50" : "gray"} />
          <Button title="Dark" onPress={() => handleThemeChange("dark")} color={themeMode === "dark" ? "#4CAF50" : "gray"} />
          {/* <Button title="System" onPress={() => handleThemeChange("system")} color={themeMode === "system" ? "#4CAF50" : "gray"} /> */}
        </View>
        <Text style={[styles.info, { color: theme.colors.text }]}>Current System Theme: {themeMode}</Text>
      </View>

      <View style={styles.dashboardOptions}>
        <TouchableOpacity
          style={[styles.dashboardButton, { backgroundColor: dashboardType === "merchant" ? theme.colors.primary : "gray" }]}
          onPress={() => dispatch(setDashboardType("merchant"))}
        >
          <Text style={[styles.dashboardButtonText, { color: theme.colors.background }]}>Merchant Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dashboardButton, { backgroundColor: dashboardType === "user" ? theme.colors.primary : "gray" }]}
          onPress={() => dispatch(setDashboardType("user"))}
        >
          <Text style={[styles.dashboardButtonText, { color: theme.colors.background }]}>User Dashboard</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[{ backgroundColor: theme.colors.primary }]}
        onPress={() => {
          navigation.navigate("BusinessProfile");
        }}
      >
        <Ionicons name="business-outline" size={20} color={theme.colors.background} />
        <Text style={[{ color: theme.colors.background }]}>Go to Business Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  themeOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  info: {
    marginTop: 10,
    fontSize: 14,
    fontStyle: "italic",
  },
  dashboardOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  dashboardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  dashboardButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
