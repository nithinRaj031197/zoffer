import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, useTheme } from "../../theme";
import { CONSTANTS } from "../../constants/utilities_basic";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetOtpMutation, useLazyGetMechantByIdQuery, useVerifyOtpMutation } from "../../api/merchantsApi";
import Toast from "react-native-toast-message";
import { useGetUserInfoQuery } from "../../api/usersApi";

const MerchantRegistrationScreen = () => {
  const { theme } = useTheme();

  const [isGetOtpButtonVisible, setIsGetOtpButtonVisible] = useState(true);
  const [isVerifyOtpButtonVisible, setIsVerifyOtpButtonVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [invoiceDocument, setInvoiceDocument] = useState(null);
  const [businessAddress, setBusinessAddress] = useState("");
  const [storeCategory, setStoreCategory] = useState("");

  const { data } = useGetUserInfoQuery({});
  const [getMerchantById] = useLazyGetMechantByIdQuery();

  const schema = yup.object().shape({
    businessName: yup.string().required("Business Name is required"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile Number is required"),
    otp: yup
      .string()
      .matches(/^[0-9]{4,6}$/, "OTP must be between 4-6 digits")
      .required("OTP is required"),
    gstNumber: yup
      .string()
      .matches(/^[0-9]{15}$/, "GST number must be 15 digits")
      .notRequired(),
    panNumber: yup
      .string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format")
      .notRequired(),
    businessAddress: yup.string().required("Business Address is required"),
    storeCategory: yup.string().required("Store Category is required"),
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const businessNameRef = useRef<TextInput>(null);

  const userData = data?.data;

  useEffect(() => {
    const fetchMerchantData = async () => {
      if (userData?.userMerchantId) {
        try {
          const response = await getMerchantById({ merchantId: userData?.userMerchantId }).unwrap();

          const merchantData = response?.data;
          setValue("businessName", merchantData?.businessName);
          setValue("mobileNumber", merchantData?.mobileNumber);
          setIsVerified(merchantData?.mobileVerified);
        } catch (error) {
          console.error("Error fetching merchant:", error);
        }
      }
    };

    fetchMerchantData();
  }, [userData?.userMerchantId]);

  useEffect(() => {
    if (!watch("businessName")) {
      businessNameRef.current?.focus();
    } else {
      businessNameRef.current?.blur();
    }
  }, [watch("businessName")]);

  const [getOtp, { isLoading: isGetOTPLoading }] = useGetOtpMutation();

  const handleGetOtp = async () => {
    try {
      const mobileNumber = getValues("mobileNumber");

      if (!mobileNumber || mobileNumber.length !== 10) {
        Toast.show({
          type: "error",
          text1: "Invalid Mobile Number",
          text2: "Please enter a valid 10-digit mobile number.",
        });
        return;
      }

      const response = await getOtp({ mobileNumber }).unwrap();

      if (response?.status) {
        Toast.show({
          type: "success",
          text1: "OTP Received",
          text2: "Check your mobile for OTP.",
        });
        setIsGetOtpButtonVisible(false);
        setIsVerifyOtpButtonVisible(true);
      } else {
        Toast.show({
          type: "error",
          text1: "OTP Request Failed",
          text2: response?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error requesting OTP:", error);
      Toast.show({
        type: "error",
        text1: "OTP Request Failed",
        text2: "Please try again later.",
      });
    }
  };

  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();

  const handleVerifyOtp = async () => {
    try {
      const otp = getValues("otp");
      const mobileNumber = getValues("mobileNumber");
      const businessName = getValues("businessName");

      if (!otp || otp.length < 4 || otp.length > 6) {
        Toast.show({
          type: "error",
          text1: "Invalid OTP",
          text2: "OTP should be between 4 to 6 digits.",
        });
        return;
      }

      const response = await verifyOtp({ mobileNumber, otp, businessName }).unwrap();

      if (response?.status) {
        Toast.show({
          type: "success",
          text1: "OTP Verified",
          text2: "Your mobile number has been successfully verified.",
        });
        console.log("OTP Verification Successful:", response);
        setIsVerifyOtpButtonVisible(false);
        setIsVerified(true);
      } else {
        Toast.show({
          type: "error",
          text1: "OTP Verification Failed",
          text2: response?.message || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: "Something went wrong. Try again later.",
      });
    }
  };

  const handleFileUpload = () => {
    console.log("File upload initiated");
  };

  const handleContinue = () => {
    console.log("Merchant registration data:", {
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
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Business Name</Text>
          <Controller
            name="businessName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TextInput
                  ref={businessNameRef}
                  style={[
                    styles.input,
                    { backgroundColor: theme.colors.card, color: theme.colors.text },
                    errors.businessName ? { borderColor: "red" } : {},
                  ]}
                  placeholder="Enter your business name"
                  placeholderTextColor={theme.colors.placeholder}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              );
            }}
          />
          {errors.businessName && <Text style={styles.errorText}>{errors.businessName.message}</Text>}
        </View>

        {/* Mobile Number */}
        <View style={styles.inputContainer}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Mobile Number</Text>
            {isVerified && <Ionicons name="checkmark-circle" size={16} color="green" />}
          </View>
          <View style={styles.row}>
            <Controller
              name="mobileNumber"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    styles.inputFlex,
                    { backgroundColor: theme.colors.card, color: theme.colors.text },
                    errors.mobileNumber ? { borderColor: "red" } : {},
                  ]}
                  placeholder="Enter mobile number"
                  placeholderTextColor={theme.colors.placeholder}
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {isGetOtpButtonVisible && !isVerified && (
              <TouchableOpacity
                style={[styles.buttonSmall, { backgroundColor: isGetOTPLoading ? theme.colors.lightText : theme.colors.primary }]}
                onPress={!isGetOTPLoading ? handleGetOtp : null}
                disabled={isGetOTPLoading}
              >
                {isGetOTPLoading ? (
                  <ActivityIndicator size="small" color={theme.colors.bw} />
                ) : (
                  <Text style={[styles.buttonText, { color: theme.colors.bw }]}>Get OTP</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
          {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber.message}</Text>}
        </View>

        {/* OTP Verification */}
        {!isVerified && (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>OTP Verification</Text>
            <View style={styles.row}>
              <Controller
                name="otp"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      styles.inputFlex,
                      { backgroundColor: theme.colors.card, color: theme.colors.text },
                      errors.otp ? { borderColor: "red" } : {},
                    ]}
                    placeholder="Enter OTP"
                    placeholderTextColor={theme.colors.placeholder}
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {isVerifyOtpButtonVisible && (
                <TouchableOpacity
                  style={[styles.buttonSmall, { backgroundColor: isVerifyOtpLoading ? theme.colors.lightText : theme.colors.primary }]}
                  onPress={!isVerifyOtpLoading ? handleVerifyOtp : null}
                  disabled={isVerifyOtpLoading}
                >
                  {isVerifyOtpLoading ? (
                    <ActivityIndicator size="small" color={theme.colors.bw} />
                  ) : (
                    <Text style={[styles.buttonText, { color: theme.colors.bw }]}>Verify</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
            {errors.otp && <Text style={styles.errorText}>{errors.otp.message}</Text>}
          </View>
        )}

        {/* GST Number */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>GST Number</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
            placeholder="Enter GST number"
            placeholderTextColor={theme.colors.placeholder}
            value={gstNumber}
            onChangeText={setGstNumber}
          />
        </View>

        {/* PAN Number */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>PAN Number</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
            placeholder="Enter PAN number"
            placeholderTextColor={theme.colors.placeholder}
            value={panNumber}
            onChangeText={setPanNumber}
          />
        </View>

        {/* Invoice Document */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Invoice Document (Optional)</Text>
          <TouchableOpacity
            style={[styles.uploadBox, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            onPress={handleFileUpload}
          >
            <Ionicons name="cloud-upload-outline" size={24} color={theme.colors.placeholder} />
            <Text style={[styles.uploadText, { color: theme.colors.placeholder }]}>Click to upload or drag and drop</Text>
          </TouchableOpacity>
        </View>

        {/* Business Address */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Business Address</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
            placeholder="Enter business address"
            placeholderTextColor={theme.colors.placeholder}
            value={businessAddress}
            onChangeText={setBusinessAddress}
            multiline
          />
        </View>

        {/* Store Category */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Store Category</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
            placeholder="Select category"
            placeholderTextColor={theme.colors.placeholder}
            value={storeCategory}
            onChangeText={setStoreCategory}
          />
        </View>

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
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
});

export default MerchantRegistrationScreen;
