import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MerchantRegistrationScreen = () => {
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
    <ScrollView style={styles.container}>
      {/* Progress Bar */}

      {/* Form */}
      <View style={styles.form}>
        {/* Business Name */}
        <Text style={styles.label}>Business Name</Text>
        <TextInput style={styles.input} placeholder="Enter your business name" value={businessName} onChangeText={setBusinessName} />

        {/* Mobile Number */}
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputFlex]}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TouchableOpacity style={styles.buttonSmall} onPress={handleGetOtp}>
            <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        {/* OTP Verification */}
        <Text style={styles.label}>OTP Verification</Text>
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.inputFlex]} placeholder="Enter OTP" keyboardType="number-pad" value={otp} onChangeText={setOtp} />
          <TouchableOpacity style={styles.buttonSmall} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>

        {/* GST Number */}
        <Text style={styles.label}>GST Number</Text>
        <TextInput style={styles.input} placeholder="Enter GST number" value={gstNumber} onChangeText={setGstNumber} />

        {/* PAN Number */}
        <Text style={styles.label}>PAN Number</Text>
        <TextInput style={styles.input} placeholder="Enter PAN number" value={panNumber} onChangeText={setPanNumber} />

        {/* Invoice Document */}
        <Text style={styles.label}>Invoice Document (Optional)</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleFileUpload}>
          <Ionicons name="cloud-upload-outline" size={24} color="gray" />
          <Text style={styles.uploadText}>Click to upload or drag and drop</Text>
        </TouchableOpacity>

        {/* Business Address */}
        <Text style={styles.label}>Business Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter business address"
          value={businessAddress}
          onChangeText={setBusinessAddress}
          multiline
        />

        {/* Store Category */}
        <Text style={styles.label}>Store Category</Text>
        <TextInput style={styles.input} placeholder="Select category" value={storeCategory} onChangeText={setStoreCategory} />

        {/* Continue Button */}
        <TouchableOpacity style={styles.buttonLarge} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  progressContainer: {
    padding: 20,
  },
  progressText: {
    fontSize: 12,
    color: "gray",
  },
  progressTextRight: {
    textAlign: "right",
    fontSize: 12,
    color: "gray",
  },
  progressBar: {
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 2.5,
    marginTop: 5,
  },
  progressBarFilled: {
    width: "33%",
    height: "100%",
    backgroundColor: "#007BFF",
    borderRadius: 2.5,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputFlex: {
    flex: 1,
    marginRight: 10,
  },
  buttonSmall: {
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonLarge: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
});

export default MerchantRegistrationScreen;
