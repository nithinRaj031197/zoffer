import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import { CONSTANTS } from "../../constants/utilities_basic";

const MerchantRegistrationScreen = () => {
  const { theme } = useTheme();

  const [businessName, setBusinessName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [invoiceDocument, setInvoiceDocument] = useState(null);
  const [businessAddress, setBusinessAddress] = useState("");
  const [storeCategory, setStoreCategory] = useState("");

  const handleGetOtp = () => {
    console.log("Getting OTP for", mobileNumber);
  };

  const handleVerifyOtp = () => {
    console.log("Verifying OTP:", otp);
  };

  const handleFileUpload = () => {
    console.log("File upload initiated");
  };

  const handleContinue = () => {
    console.log("Merchant registration data:", {
      businessName,
      mobileNumber,
      gstNumber,
      panNumber,
      businessAddress,
      storeCategory,
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.form}>
        {/* Business Name */}
        <Text style={[styles.label, { color: theme.colors.text }]}>Business Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
          placeholder="Enter your business name"
          placeholderTextColor={theme.colors.placeholder}
          value={businessName}
          onChangeText={setBusinessName}
        />

        {/* Mobile Number */}
        <Text style={[styles.label, { color: theme.colors.text }]}>Mobile Number</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputFlex, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
            placeholder="Enter mobile number"
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TouchableOpacity style={[styles.buttonSmall, { backgroundColor: theme.colors.primary }]} onPress={handleGetOtp}>
            <Text style={[styles.buttonText, { color: theme.colors.bw }]}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        {/* OTP Verification */}
        <Text style={[styles.label, { color: theme.colors.text }]}>OTP Verification</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputFlex, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
            placeholder="Enter OTP"
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={[styles.buttonSmall, { backgroundColor: theme.colors.primary }]} onPress={handleVerifyOtp}>
            <Text style={[styles.buttonText, { color: theme.colors.bw }]}>Verify</Text>
          </TouchableOpacity>
        </View>

        {/* GST Number */}
        <Text style={[styles.label, { color: theme.colors.text }]}>GST Number</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
          placeholder="Enter GST number"
          placeholderTextColor={theme.colors.placeholder}
          value={gstNumber}
          onChangeText={setGstNumber}
        />

        {/* PAN Number */}
        <Text style={[styles.label, { color: theme.colors.text }]}>PAN Number</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
          placeholder="Enter PAN number"
          placeholderTextColor={theme.colors.placeholder}
          value={panNumber}
          onChangeText={setPanNumber}
        />

        {/* Invoice Document */}
        <Text style={[styles.label, { color: theme.colors.text }]}>Invoice Document (Optional)</Text>
        <TouchableOpacity
          style={[styles.uploadBox, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={handleFileUpload}
        >
          <Ionicons name="cloud-upload-outline" size={24} color={theme.colors.placeholder} />
          <Text style={[styles.uploadText, { color: theme.colors.placeholder }]}>Click to upload or drag and drop</Text>
        </TouchableOpacity>

        {/* Business Address */}
        <Text style={[styles.label, { color: theme.colors.text }]}>Business Address</Text>
        <TextInput
          style={[styles.input, styles.textArea, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
          placeholder="Enter business address"
          placeholderTextColor={theme.colors.placeholder}
          value={businessAddress}
          onChangeText={setBusinessAddress}
          multiline
        />

        {/* Store Category */}
        <Text style={[styles.label, { color: theme.colors.text }]}>Store Category</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
          placeholder="Select category"
          placeholderTextColor={theme.colors.placeholder}
          value={storeCategory}
          onChangeText={setStoreCategory}
        />

        {/* Continue Button */}
        <TouchableOpacity style={[styles.buttonLarge, { backgroundColor: theme.colors.primary }]} onPress={handleContinue}>
          <Text style={[styles.buttonText, { color: theme.colors.bw }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
    paddingBottom: CONSTANTS.BOTTOM_NAV_HEIGHT + 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    borderColor: "#E0E0E0",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  inputFlex: {
    flex: 1,
    marginRight: 10,
  },
  buttonSmall: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
  uploadBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 12,
    marginTop: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonLarge: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
});

export default MerchantRegistrationScreen;
