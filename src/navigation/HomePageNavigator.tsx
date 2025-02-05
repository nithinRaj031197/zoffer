import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateOfferScreen from "../screens/Profile/CreateOfferScreen";
import HomeScreen from "../screens/Home/HomeScreen";

const HomeStack = createStackNavigator();

const HomePageNavigator = () => {
  return (
    <HomeStack.Navigator id={undefined}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CreateOfferScreen" component={CreateOfferScreen} options={{ title: "Create Offer" }} />
      {/* <HomeStack.Screen name="EditOfferScreen" component={EditOfferScreen} options={{ title: "Edit Offer" }} /> */}
    </HomeStack.Navigator>
  );
};

export default HomePageNavigator;
