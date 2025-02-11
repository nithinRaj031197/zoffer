import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLazyGetCategoriesQuery } from "../../api/categories";
import { useUserPreferencesMutation } from "../../api/usersApi";
import Toast from "react-native-toast-message";

const categoryIcons: { [key: string]: string } = {
  Electronics: "cellphone",
  Fashion: "tshirt-crew",
  "Home & Furniture": "sofa",
  "Beauty & Wellness": "lipstick",
  Groceries: "cart-outline",
  Travel: "airplane",
  "Sports & Fitness": "dumbbell",
  Health: "heart-pulse",
  "Other interests": "plus",
};

const PreferencesScreen = ({ navigation }: { navigation: any }) => {
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  const [getCategories, { data: categoriesData, isLoading }] = useLazyGetCategoriesQuery();

  useEffect(() => {
    getCategories({});
  }, [getCategories]);

  const togglePreference = (id: number) => {
    if (selectedPreferences.includes(id)) {
      setSelectedPreferences(selectedPreferences.filter((prefId) => prefId !== id));
    } else {
      setSelectedPreferences([...selectedPreferences, id]);
    }
  };

  const isSelected = (id: number) => selectedPreferences.includes(id);

  const [userPreferences] = useUserPreferencesMutation();

  const handleContinue = async () => {
    try {
      const response: any = await userPreferences(selectedPreferences).unwrap();
      console.log(response); // check API once pavan updates

      if (response?.status) {
        Toast.show({
          type: "success",
          text1: "Interests are updated",
        });
        // navigation.navigate("HomeScreen");
      }
    } catch (error: any) {
      console.error("Error updating preferences:", error);

      const errorMessage = error?.data?.message || "Invalid input or server error. Please try again.";

      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: errorMessage,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading Categories...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Welcome to OfferZen!</Text>
      <Text style={styles.subHeader}>Let's personalize your experience by selecting your interests.</Text>

      {/* Preferences Grid */}
      <FlatList
        data={categoriesData?.data}
        keyExtractor={(item) => item.categoryId.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.preferenceCard, isSelected(item.categoryId) && styles.preferenceCardSelected]}
            onPress={() => togglePreference(item.categoryId)}
          >
            <Icon name={categoryIcons[item.name] || "tag-outline"} size={30} color={isSelected(item.categoryId) ? "#fff" : "#333"} />
            <Text style={[styles.preferenceText, isSelected(item.categoryId) && styles.preferenceTextSelected]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 10,
  },
  preferenceCard: {
    flex: 1,
    maxWidth: "48%",
    aspectRatio: 1 / 0.7,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "1%",
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  preferenceCardSelected: {
    backgroundColor: "#4CAF50",
  },
  preferenceText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  preferenceTextSelected: {
    color: "#fff",
  },
  continueButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PreferencesScreen;
