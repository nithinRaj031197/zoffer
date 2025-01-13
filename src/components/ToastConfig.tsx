import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#4CAF50", backgroundColor: "#f0fff4" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#4CAF50",
      }}
      text2Style={{
        fontSize: 14,
        color: "#555",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#F44336", backgroundColor: "#ffebee" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#F44336",
      }}
      text2Style={{
        fontSize: 14,
        color: "#555",
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#2196F3", backgroundColor: "#e3f2fd" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#2196F3",
      }}
      text2Style={{
        fontSize: 14,
        color: "#555",
      }}
    />
  ),
};

export default ToastConfig;
