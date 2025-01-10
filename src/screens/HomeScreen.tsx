import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getAccessToken } from "../utils/tokenStorage";

const HomeScreen = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error("Failed to get access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>HomeScreen</Text>
      <Text style={styles.tokenText}>Access Token: {accessToken ? accessToken : "No token found"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 16,
    color: "#4CAF50",
  },
});

export default HomeScreen;
