import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CreateOfferScreen = () => {
  const [offerTitle, setOfferTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [validityStart, setValidityStart] = useState("");
  const [validityEnd, setValidityEnd] = useState("");
  const [targetAudience, setTargetAudience] = useState("");

  const handleCreateOffer = () => {
    // Logic to create an offer
    console.log({
      offerTitle,
      description,
      discountPercentage,
      validityStart,
      validityEnd,
      targetAudience,
    });
    alert("Offer Created Successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create New Offer</Text>

      {/* Offer Title */}
      <Text style={styles.label}>Offer Title</Text>
      <TextInput style={styles.input} placeholder="Enter offer title" value={offerTitle} onChangeText={setOfferTitle} />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your offer"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      {/* Discount Percentage */}
      <Text style={styles.label}>Discount Percentage</Text>
      <View style={styles.discountContainer}>
        <TextInput style={styles.input} placeholder="0" keyboardType="numeric" value={discountPercentage} onChangeText={setDiscountPercentage} />
        <Text style={styles.percentageSymbol}>%</Text>
      </View>

      {/* Validity Period */}
      <Text style={styles.label}>Validity Period</Text>
      <View style={styles.dateContainer}>
        <TextInput style={[styles.input, styles.dateInput]} placeholder="dd/mm/yyyy" value={validityStart} onChangeText={setValidityStart} />
        <Ionicons name="calendar-outline" size={24} color="gray" />
        <TextInput style={[styles.input, styles.dateInput]} placeholder="dd/mm/yyyy" value={validityEnd} onChangeText={setValidityEnd} />
        <Ionicons name="calendar-outline" size={24} color="gray" />
      </View>

      {/* Attach Media */}
      <Text style={styles.label}>Attach Media</Text>
      <TouchableOpacity style={styles.mediaUpload}>
        <Ionicons name="cloud-upload-outline" size={24} color="gray" />
        <Text style={styles.mediaText}>Tap to upload or drag files here</Text>
      </TouchableOpacity>

      {/* Target Audience */}
      <Text style={styles.label}>Target Audience</Text>
      <TextInput style={styles.input} placeholder="Select categories" value={targetAudience} onChangeText={setTargetAudience} />

      {/* Create Offer Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateOffer}>
        <Text style={styles.createButtonText}>Create Offer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  percentageSymbol: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginLeft: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
    marginRight: 8,
  },
  mediaUpload: {
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  mediaText: {
    fontSize: 14,
    color: "gray",
    marginTop: 8,
  },
  createButton: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CreateOfferScreen;
