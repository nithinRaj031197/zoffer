import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import CustomOTPInput from "../components/CustomOTPInput";
import { useRoute, RouteProp } from "@react-navigation/native";
import { AuthStackParamList } from "../navigation/types";

type OTPScreenRouteProp = RouteProp<AuthStackParamList, "OTPScreen">;

const OTPScreen = () => {
  const [otp, setOtp] = useState("");
  const [clearOtp, setClearOtp] = useState(false);
  const route = useRoute<OTPScreenRouteProp>();

  const { phoneNumber } = route.params;

  const handleValidateOTP = () => {
    if (otp.length < 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      return;
    }

    if (otp === "123456") {
      Alert.alert("Success", "OTP Verified Successfully");
      setClearOtp(true); // Clear OTP on success
      setTimeout(() => setClearOtp(false), 100); // Reset clear flag
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
      setClearOtp(true); // Clear OTP on failure
      setTimeout(() => setClearOtp(false), 100); // Reset clear flag
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify OTP</Text>
      <Text style={styles.subHeader}>Enter the OTP sent to: {phoneNumber}</Text>

      <CustomOTPInput otp={otp} setOtp={setOtp} clearOtp={clearOtp} />

      <TouchableOpacity style={styles.button} onPress={handleValidateOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#212121",
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default OTPScreen;
