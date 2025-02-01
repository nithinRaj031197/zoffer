import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import MerchantRegistrationScreen from "../screens/Profile/MerchantRegistrationScreen";
import CreateOfferScreen from "../screens/Profile/CreateOfferScreen";
import SettingsScreen from "../screens/SettingsScreen";

const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator id={undefined}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="MerchantRegistration" component={MerchantRegistrationScreen} options={{ title: "Merchant Registration" }} />
      <ProfileStack.Screen name="CreateOfferScreen" component={CreateOfferScreen} options={{ title: "Create Offer" }} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
