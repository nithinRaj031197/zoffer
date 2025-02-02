import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../theme";
import { ProfileStackParamList } from "../types/generic-type";

const ProfileScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  // State to track if the user is a merchant
  const [isMerchant, setIsMerchant] = useState(false);

  const handleBecomeMerchant = () => {
    navigation.navigate("MerchantRegistration");
  };

  const handleSwitchToMerchant = () => {
    console.log("Switching to Merchant Account");
  };

  const handleSettingsNavigation = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
        <TouchableOpacity onPress={handleSettingsNavigation}>
          <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={[styles.profileImageContainer, { borderColor: theme.colors.border }]}>
          <Image source={{ uri: "https://via.placeholder.com/150" }} style={[styles.profileImage, { borderColor: theme.colors.border }]} />
          <Ionicons name="camera-outline" size={18} color={theme.colors.primary} style={styles.cameraIcon} />
        </View>
        <Text style={[styles.profileName, { color: theme.colors.text }]}>John Anderson</Text>
        <Text style={[styles.profileEmail, { color: theme.colors.lightText }]}>john.anderson@email.com</Text>
        <Text style={[styles.profileMemberSince, { color: theme.colors.lightText }]}>Member since Jan 2025</Text>
      </View>

      {/* Merchant Account Status */}
      <View style={[styles.merchantAccount, { backgroundColor: theme.colors.card, shadowColor: theme.colors.text }]}>
        <Text style={[styles.merchantText, { color: theme.colors.text }]}>Merchant Account</Text>
        <View style={styles.verificationRow}>
          <Text style={[styles.verificationText, { color: theme.colors.lightText }]}>Verification in Progress</Text>
          <Ionicons name="time-outline" size={16} color={theme.colors.lightText} />
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarFilled, { backgroundColor: theme.colors.primary }]} />
        </View>
      </View>

      {/* Options */}
      <View style={[styles.options, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity style={[styles.optionRow, { borderBottomColor: theme.colors.border }]}>
          <Ionicons name="create-outline" size={20} color={theme.colors.text} />
          <Text style={[styles.optionText, { color: theme.colors.text }]}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.lightText} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionRow, { borderBottomColor: theme.colors.border }]}>
          <Ionicons name="pricetag-outline" size={20} color={theme.colors.text} />
          <Text style={[styles.optionText, { color: theme.colors.text }]}>View Offers</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.lightText} />
        </TouchableOpacity>

        {/* Conditionally render based on isMerchant */}
        {!isMerchant ? (
          <TouchableOpacity style={[styles.optionRow, { borderBottomColor: theme.colors.border }]} onPress={handleBecomeMerchant}>
            <Ionicons name="business-outline" size={20} color={theme.colors.text} />
            <Text style={[styles.optionText, { color: theme.colors.text }]}>Become a Merchant</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.lightText} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.optionRow} onPress={handleSwitchToMerchant}>
            <Ionicons name="swap-horizontal-outline" size={20} color={theme.colors.text} />
            <Text style={[styles.optionText, { color: theme.colors.text }]}>Switch to Merchant Account</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.lightText} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    marginVertical: 2,
  },
  profileMemberSince: {
    fontSize: 12,
  },
  merchantAccount: {
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 20,
  },
  merchantText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  verificationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verificationText: {
    fontSize: 14,
  },
  progressBar: {
    height: 5,
    borderRadius: 2.5,
    marginTop: 10,
  },
  progressBarFilled: {
    width: "60%",
    height: "100%",
    borderRadius: 2.5,
  },
  options: {
    marginHorizontal: 20,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
});

export default ProfileScreen;
