import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Request permissions for notifications
export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.warn("Notification permissions not granted");
  }
};

// Send a local notification with OTP
export const sendOTPNotification = async (phoneNumber: string, otp: string) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Your OTP Code",
        body: `Your OTP for phone number ${phoneNumber} is: ${otp}`,
        sound: Platform.OS === "android" ? "default" : undefined,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        seconds: 1,
        repeats: false,
      } as Notifications.TimeIntervalTriggerInput,
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};
