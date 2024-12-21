// App.tsx
import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { useTheme } from "./src/theme/useTheme";
import { Alert, Platform, SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import * as Notifications from "expo-notifications";

const App = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const configureNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert("Permission Denied", "You need to enable notifications to use this feature.");
          return;
        }
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    configureNotifications();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />
        <AppNavigator theme={theme} />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
