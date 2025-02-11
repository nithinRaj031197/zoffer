import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../redux/authSlice";
import { useTheme } from "../theme";
import { useLoginMutation } from "../api/authApi";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { saveTokens } from "../utils/tokenStorage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { theme: currentTheme } = useTheme();
  const [login, { isLoading }] = useLoginMutation();

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const loadStoredCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await AsyncStorage.getItem("savedPassword");
        const rememberMeStatus = await AsyncStorage.getItem("rememberMe");

        if (savedEmail && savedPassword && rememberMeStatus === "true") {
          setValue("email", savedEmail);
          setValue("password", savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error("Error loading stored credentials:", error);
      }
    };

    loadStoredCredentials();
  }, [setValue]);

  const handleLogin = async (data) => {
    try {
      const response: any = await login({ email: data.email, password: data.password }).unwrap();
      const accessToken = response?.data?.accessToken;

      if (response?.status && accessToken) {
        dispatch(loginState(accessToken));
        await saveTokens({ accessToken, refreshToken: "" });

        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back! Redirecting to your dashboard...",
        });

        reset();
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      {/* Header */}
      <Text style={[styles.header, { color: currentTheme.colors.text }]}>Hi, Welcome Back! 👋</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>Email</Text>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors.email ? currentTheme.colors.error : currentTheme.colors.border,
                  color: currentTheme.colors.text,
                },
              ]}
              placeholder="example@gmail.com"
              placeholderTextColor={currentTheme.colors.placeholder}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && <Text style={[styles.errorText, { color: currentTheme.colors.error }]}>{errors.email.message}</Text>}
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

      {/* Remember Me & Forgot Password */}
      <View style={styles.row}>
        <View style={styles.rememberMeContainer}>
          <Switch
            value={rememberMe}
            onValueChange={(value) => setRememberMe(value)}
            trackColor={{ false: currentTheme.colors.border, true: currentTheme.colors.primary }}
            thumbColor={rememberMe ? currentTheme.colors.background : "#f4f3f4"}
          />
          <Text style={[styles.rememberMeText, { color: currentTheme.colors.text }]}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={[styles.forgotPassword, { color: currentTheme.colors.secondary }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: currentTheme.colors.primary }]}
        onPress={handleSubmit(handleLogin)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={currentTheme.colors.text} />
        ) : (
          <Text style={[styles.loginButtonText, { color: currentTheme.colors.text }]}>Login</Text>
        )}
      </TouchableOpacity>

      <GoogleAuthButton />

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={[styles.signUpText, { color: currentTheme.colors.text }]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={[styles.signUpLink, { color: currentTheme.colors.secondary }]}>Sign Up</Text>
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
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    marginLeft: 5,
  },
  forgotPassword: {
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 4,
  },
  errorText: {
    textAlign: "left",
    fontSize: 12,
    marginTop: 2,
  },
});

export default LoginScreen;
