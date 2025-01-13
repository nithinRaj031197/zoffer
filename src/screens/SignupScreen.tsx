import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Appearance, ColorSchemeName } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSignupMutation } from "../api/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { COLORS } from "../theme/colors";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTheme } from "../theme";
import Toast from "react-native-toast-message";

const SignupScreen = ({ navigation }) => {
  // Consolidated form data into a single state object
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { theme: currentTheme } = useTheme();

  // API Mutation Hook from Redux Toolkit Query
  const [signup, { isLoading }] = useSignupMutation();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const handleSignup = async (data) => {
    try {
      const response = await signup({
        fullName: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Sign Up Successful!",
        text2: "You can now log in to your account.",
      });

      navigation.navigate("Login");

      reset();
    } catch (err: unknown) {
      console.error("Signup Error:", err);
      if (isFetchBaseQueryError(err)) {
        const errorMessage = (err.data as { message?: string })?.message || "An error occurred on the server.";
        Alert.alert("Signup Failed", errorMessage);
      } else if (isApiErrorResponse(err)) {
        Alert.alert("Signup Failed", err.message || "An unexpected error occurred.");
      } else {
        Alert.alert("Signup Failed", "An unexpected error occurred. Please try again.");
      }
    }
  };

  // Type Guard: Check if error is FetchBaseQueryError
  const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "data" in error;
  };

  // Type Guard: Check if error is ApiErrorResponse
  const isApiErrorResponse = (error: unknown): error is { status: number; message?: string } => {
    return typeof error === "object" && error !== null && "status" in error && "message" in error;
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      {/* Header */}
      <Text style={[styles.header, { color: currentTheme.colors.text }]}>Create an account</Text>
      <Text style={[styles.subHeader, { color: currentTheme.colors.lightText }]}>Find new offers in the market</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors.username ? currentTheme.colors.error : currentTheme.colors.border,
                  color: currentTheme.colors.text,
                },
              ]}
              placeholder="Enter Your Username"
              placeholderTextColor={currentTheme.colors.placeholder}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        {errors.username && <Text style={[styles.errorText, { color: currentTheme.colors.error }]}>{errors.username.message}</Text>}
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors.email ? currentTheme.colors.error : currentTheme.colors.border,
                  color: currentTheme.colors.text,
                },
              ]}
              placeholder="Enter Your Email"
              placeholderTextColor={currentTheme.colors.placeholder}
              keyboardType="email-address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.email && <Text style={[styles.errorText, { color: currentTheme.colors.error }]}>{errors.email.message}</Text>}
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors.phone ? currentTheme.colors.error : currentTheme.colors.border,
                  color: currentTheme.colors.text,
                },
              ]}
              placeholder="Enter Your Phone Number"
              placeholderTextColor={currentTheme.colors.placeholder}
              keyboardType="phone-pad"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.phone && <Text style={[styles.errorText, { color: currentTheme.colors.error }]}>{errors.phone.message}</Text>}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={[
                styles.passwordContainer,
                {
                  borderColor: errors.password ? currentTheme.colors.error : currentTheme.colors.border,
                },
              ]}
            >
              <TextInput
                style={[styles.passwordInput, { color: currentTheme.colors.text }]}
                placeholder="Enter Your Password"
                placeholderTextColor={currentTheme.colors.placeholder}
                secureTextEntry={!isPasswordVisible}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color={currentTheme.colors.lightText} />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && <Text style={[styles.errorText, { color: currentTheme.colors.error }]}>{errors.password.message}</Text>}
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.signupButton, { backgroundColor: currentTheme.colors.primary }]}
        onPress={handleSubmit(handleSignup)}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color={currentTheme.colors.text} /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
      </TouchableOpacity>

      {/* Already Have an Account */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.lightText,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: "#333",
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    marginTop: 2,
    textAlign: "left",
    fontSize: 12,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#444",
  },
  loginLink: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default SignupScreen;
