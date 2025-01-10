import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { loginState } from "../redux/authSlice";
import { useTheme } from "../theme";
import { useLazyOauth2Query, useLoginMutation } from "../api/authApi";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { saveTokens } from "../utils/tokenStorage";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { theme: currentTheme } = useTheme();
  const [login, { isLoading }] = useLoginMutation();
  const [oauth2] = useLazyOauth2Query();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and Password are required!");
      return;
    }

    try {
      const response: any = await login({ email, password }).unwrap();
      dispatch(loginState(response));

      const accessToken = response?.data?.accessToken;
      await saveTokens(accessToken, "");

      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Login Error:", error);
      Alert.alert("Login Failed", error?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      {/* Header */}
      <Text style={[styles.header, { color: currentTheme.colors.text }]}>Hi, Welcome Back! 👋</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { borderColor: currentTheme.colors.border, color: currentTheme.colors.text }]}
          placeholder="example@gmail.com"
          placeholderTextColor={currentTheme.colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>Password</Text>
        <View style={[styles.passwordContainer, { borderColor: currentTheme.colors.border }]}>
          <TextInput
            style={[styles.passwordInput, { color: currentTheme.colors.text }]}
            placeholder="Enter Your Password"
            placeholderTextColor={currentTheme.colors.placeholder}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color={currentTheme.colors.lightText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Remember Me & Forgot Password */}
      <View style={styles.row}>
        <View style={styles.rememberMeContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{
              false: currentTheme.colors.border,
              true: currentTheme.colors.primary,
            }}
            thumbColor={rememberMe ? currentTheme.colors.background : "#f4f3f4"}
          />
          <Text style={[styles.rememberMeText, { color: currentTheme.colors.text }]}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={[styles.forgotPassword, { color: currentTheme.colors.secondary }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={[styles.loginButton, { backgroundColor: currentTheme.colors.primary }]} onPress={handleLogin} disabled={isLoading}>
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
});

export default LoginScreen;
