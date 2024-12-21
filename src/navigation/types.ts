import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  PhoneNumber: undefined;
  OTPScreen: { phoneNumber: string };
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};
