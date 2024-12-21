import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../navigation/types";
import { requestNotificationPermissions, sendOTPNotification } from "../utils/notification";

type PhoneNumberScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "PhoneNumber">;

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const navigation = useNavigation<PhoneNumberScreenNavigationProp>();

  // Request notification permissions on mount
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const generateDummyOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number.");
      return;
    }

    // Generate OTP
    const generatedOtp = generateDummyOTP();
    setOtp(generatedOtp);

    // Send notification with OTP
    await sendOTPNotification(phoneNumber, generatedOtp);

    Alert.alert("OTP Sent", `A dummy OTP has been sent to ${phoneNumber} via notification.`);

    // Navigate to OTPScreen with phone number
    navigation.navigate("OTPScreen", { phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Your Phone Number</Text>
      <Text style={styles.subHeader}>We'll send you an OTP to verify your number.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Your Phone Number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        maxLength={10}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>Send OTP</Text>
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
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

export default PhoneNumberScreen;
