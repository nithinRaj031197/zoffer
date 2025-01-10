import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View, Linking, Alert } from "react-native";
import { GOOGLE_AUTH_URL } from "../api/urls";

const GoogleAuthButton = () => {
  const handlePress = async () => {
    const googleAuthURL = GOOGLE_AUTH_URL;
    try {
      const supported = await Linking.canOpenURL(googleAuthURL);
      if (supported) {
        Linking.openURL(googleAuthURL);
      } else {
        Alert.alert("Error", "Unable to open the Google authentication page.");
      }
    } catch (err) {
      console.error("Error opening URL:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.text}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#444",
    fontWeight: "bold",
  },
});

export default GoogleAuthButton;
