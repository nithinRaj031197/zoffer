import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types/generic-type";

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  // State to track if the user is a merchant
  const [isMerchant, setIsMerchant] = useState(false);

  const handleBecomeMerchant = () => {
    // Logic to become a merchant (e.g., API call)
    // setIsMerchant(true);
    navigation.navigate("MerchantRegistration");
  };

  const handleSwitchToMerchant = () => {
    // Logic to switch to merchant account
    console.log("Switching to Merchant Account");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.profileImage} />
          <Ionicons name="camera-outline" size={18} color="white" style={styles.cameraIcon} />
        </View>
        <Text style={styles.profileName}>John Anderson</Text>
        <Text style={styles.profileEmail}>john.anderson@email.com</Text>
        <Text style={styles.profileMemberSince}>Member since Jan 2025</Text>
      </View>

      {/* Merchant Account Status */}
      {/* <View style={styles.merchantAccount}>
        <Text style={styles.merchantText}>Merchant Account</Text>
        <View style={styles.verificationRow}>
          <Text style={styles.verificationText}>Verification in Progress</Text>
          <Ionicons name="time-outline" size={16} color="gray" />
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressBarFilled} />
        </View>
      </View> */}

      {/* Options */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.optionRow}>
          <Ionicons name="create-outline" size={20} color="black" />
          <Text style={styles.optionText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Ionicons name="pricetag-outline" size={20} color="black" />
          <Text style={styles.optionText}>View Offers</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>

        {/* Conditionally render based on isMerchant */}
        {!isMerchant ? (
          <TouchableOpacity style={styles.optionRow} onPress={handleBecomeMerchant}>
            <Ionicons name="business-outline" size={20} color="black" />
            <Text style={styles.optionText}>Become a Merchant</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.optionRow} onPress={handleSwitchToMerchant}>
            <Ionicons name="swap-horizontal-outline" size={20} color="black" />
            <Text style={styles.optionText}>Switch to Merchant Account</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateOfferScreen");
        }}
      >
        <Text>Create Offer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
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
    borderColor: "#E0E0E0",
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
    color: "black",
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: "gray",
    marginVertical: 2,
  },
  profileMemberSince: {
    fontSize: 12,
    color: "gray",
  },
  merchantAccount: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 20,
  },
  merchantText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  verificationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verificationText: {
    fontSize: 14,
    color: "gray",
  },
  progressBar: {
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 2.5,
    marginTop: 10,
  },
  progressBarFilled: {
    width: "60%",
    height: "100%",
    backgroundColor: "#007BFF",
    borderRadius: 2.5,
  },
  options: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
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
    borderBottomColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 16,
    color: "black",
    marginLeft: 10,
    flex: 1,
  },
});

export default ProfileScreen;
