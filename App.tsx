// App.tsx
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { useTheme } from "./src/theme/useTheme";
import { SafeAreaView, StatusBar, Text, View, StyleSheet, TouchableOpacity } from "react-native";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />
      <View style={styles.container}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Theme Check</Text>
        <Text style={[styles.text, { fontFamily: theme.fonts.regular.fontFamily, fontWeight: theme.fonts.regular.fontWeight }]}>Regular Font</Text>
        <Text style={[styles.text, { fontFamily: theme.fonts.medium.fontFamily, fontWeight: theme.fonts.medium.fontWeight }]}>Medium Font</Text>
        <Text style={[styles.text, { fontFamily: theme.fonts.bold.fontFamily, fontWeight: theme.fonts.bold.fontWeight }]}>Bold Font</Text>
        <Text style={[styles.text, { fontFamily: theme.fonts.heavy.fontFamily, fontWeight: theme.fonts.heavy.fontWeight }]}>Heavy Font</Text>

        {/* Toggle Button */}
        <TouchableOpacity onPress={toggleTheme} style={styles.button}>
          <Text style={styles.buttonText}>Toggle to {theme.dark ? "Light" : "Dark"} Theme</Text>
        </TouchableOpacity>
      </View>

      <AppNavigator theme={theme} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
