import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { removeTokens } from "../utils/tokenStorage";
import { logoutState } from "../redux/authSlice";
import Toast from "react-native-toast-message";

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await removeTokens();
      dispatch(logoutState());
      Toast.show({
        type: "info",
        text1: "Logged Out",
        text2: "You have been logged out. See you soon!",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 30,
      });
    } catch (error) {
      console.error("Failed to logout:", error);
      Alert.alert("Error", "An error occurred while logging out. Please try again.");
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#F44336",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LogoutButton;
