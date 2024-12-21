import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Appearance } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useTheme } from "../theme/useTheme";
import { logout } from "../redux/authSlice";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, toggleTheme } = useTheme();

  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system");

  const handleThemeChange = (mode: "light" | "dark" | "system") => {
    setThemeMode(mode);
    toggleTheme(mode); // Pass theme mode to the toggleTheme function
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Settings</Text>

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
          <Button title="System" onPress={() => handleThemeChange("system")} color={themeMode === "system" ? "#4CAF50" : "gray"} />
        </View>
        <Text style={[styles.info, { color: theme.colors.text }]}>Current System Theme: {Appearance.getColorScheme()}</Text>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <Button title="Logout" onPress={() => dispatch(logout())} color="#F44336" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
});

export default SettingsScreen;
