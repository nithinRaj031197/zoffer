import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../theme";
import { CONSTANTS } from "../../constants/utilities_basic";
import ImageUploader, { Media } from "../../components/ImageUploader";

const CreateOfferScreen = () => {
  const { theme: currentTheme } = useTheme();

  const [offerTitle, setOfferTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [images, setImages] = useState<Media[]>([]);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      const newStartDate = new Date(startDate);
      newStartDate.setHours(selectedTime.getHours());
      newStartDate.setMinutes(selectedTime.getMinutes());
      setStartDate(newStartDate);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      const newEndDate = new Date(endDate);
      newEndDate.setHours(selectedTime.getHours());
      newEndDate.setMinutes(selectedTime.getMinutes());
      setEndDate(newEndDate);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: currentTheme.colors.background }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Offer Title */}
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>Offer Title</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: currentTheme.colors.card,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text,
            },
          ]}
          placeholder="Enter offer title"
          placeholderTextColor={currentTheme.colors.placeholder}
          value={offerTitle}
          onChangeText={setOfferTitle}
        />

        {/* Description */}
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: currentTheme.colors.card,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text,
            },
          ]}
          placeholder="Describe your offer"
          placeholderTextColor={currentTheme.colors.placeholder}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        {/* Discount Percentage */}
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>Discount Percentage</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: currentTheme.colors.card,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text,
            },
          ]}
          placeholder="0"
          placeholderTextColor={currentTheme.colors.placeholder}
          keyboardType="numeric"
          value={discountPercentage}
          onChangeText={setDiscountPercentage}
        />

        {/* Validity Period */}
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>Validity Period</Text>
        <View style={styles.dateRow}>
          <TouchableOpacity
            style={[
              styles.dateInput,
              {
                backgroundColor: currentTheme.colors.card,
                borderColor: currentTheme.colors.border,
              },
            ]}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={{ color: currentTheme.colors.text }}>{startDate.toDateString()}</Text>
            <Ionicons name="calendar-outline" size={20} color={currentTheme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dateInput,
              {
                backgroundColor: currentTheme.colors.card,
                borderColor: currentTheme.colors.border,
              },
            ]}
            onPress={() => setShowStartTimePicker(true)}
          >
            <Text style={{ color: currentTheme.colors.text }}>
              {startDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Ionicons name="time-outline" size={20} color={currentTheme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* End Date & Time */}
        <View style={styles.dateRow}>
          <TouchableOpacity
            style={[
              styles.dateInput,
              {
                backgroundColor: currentTheme.colors.card,
                borderColor: currentTheme.colors.border,
              },
            ]}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={{ color: currentTheme.colors.text }}>{endDate.toDateString()}</Text>
            <Ionicons name="calendar-outline" size={20} color={currentTheme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dateInput,
              {
                backgroundColor: currentTheme.colors.card,
                borderColor: currentTheme.colors.border,
              },
            ]}
            onPress={() => setShowEndTimePicker(true)}
          >
            <Text style={{ color: currentTheme.colors.text }}>
              {endDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Ionicons name="time-outline" size={20} color={currentTheme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Date Pickers */}
        {showStartDatePicker && <DateTimePicker value={startDate} mode="date" display="default" onChange={handleStartDateChange} />}
        {showEndDatePicker && <DateTimePicker value={endDate} mode="date" display="default" onChange={handleEndDateChange} />}
        {showStartTimePicker && <DateTimePicker value={startDate} mode="time" display="default" onChange={handleStartTimeChange} />}
        {showEndTimePicker && <DateTimePicker value={endDate} mode="time" display="default" onChange={handleEndTimeChange} />}

        {/* Image Upload Component */}
        <ImageUploader images={images} setImages={setImages} allowMultiple={true} />

        {/* Target Audience */}
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>Target Audience</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: currentTheme.colors.card,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text,
            },
          ]}
          placeholder="Select categories"
          placeholderTextColor={currentTheme.colors.placeholder}
          editable={false}
        />

        {/* Submit Button */}
        <TouchableOpacity style={[styles.submitButton, { backgroundColor: currentTheme.colors.primary }]}>
          <Text style={[styles.submitButtonText, { color: currentTheme.colors.text }]}>Create Offer</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: CONSTANTS.BOTTOM_NAV_HEIGHT + 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "space-between",
  },
  mediaInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mediaPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  mediaPreview: {
    width: 80,
    height: 80,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default CreateOfferScreen;
