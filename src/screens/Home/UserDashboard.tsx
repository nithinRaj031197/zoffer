import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import HorizontalScrollableList from "../../components/HorizontalScrollableList";
import { CONSTANTS } from "../../constants/utilities_basic";

const UserDashboard = () => {
  const { theme } = useTheme();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const categories = ["All", "Electronics", "Fashion", "Food", "Toys"];
  const offers = [
    {
      id: 1,
      storeName: "Electronics Hub",
      distance: "2.5 km away",
      discount: "40% OFF",
      image: null,
      offerTitle: "Latest iPhone 15 Pro - Special Weekend Offer",
      validity: "Valid until March 15, 2025",
      likes: 245,
    },
    {
      id: 2,
      storeName: "Fashion Store",
      distance: "1.8 km away",
      discount: "25% OFF",
      image: null,
      offerTitle: "Summer Collection Clearance Sale",
      validity: "Valid until April 30, 2025",
      likes: 98,
    },
  ];

  const handleCategorySelect = (index: number) => {
    setSelectedCategoryIndex(index);
    console.log(`Selected Category: ${categories[index]}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Zoffer</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.location}>
            <Ionicons name="location-outline" size={16} color={theme.colors.text} />
            <Text style={[styles.locationText, { color: theme.colors.text }]}>New York</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.colors.bw,
            borderColor: theme.colors.border,
            elevation: 3,
          },
        ]}
      >
        <Ionicons name="search-outline" size={20} color={theme.colors.placeholder} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search offers..."
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>

      {/* Categories */}
      <HorizontalScrollableList items={categories} selectedIndex={selectedCategoryIndex} onSelect={handleCategorySelect} />

      {/* Offers */}
      <ScrollView contentContainerStyle={styles.offers}>
        {offers.map((offer) => (
          <View key={offer.id} style={[styles.offerCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.offerHeader}>
              <Ionicons name="person-circle-outline" size={40} color={theme.colors.placeholder} />
              <View style={styles.offerInfo}>
                <Text style={[styles.storeName, { color: theme.colors.text }]}>{offer.storeName}</Text>
                <Text style={[styles.distance, { color: theme.colors.lightText }]}>{offer.distance}</Text>
              </View>
              <Text style={[styles.discountBadge, { backgroundColor: theme.colors.primary, color: theme.colors.background }]}>{offer.discount}</Text>
            </View>

            <View style={styles.offerImage}>
              <Text style={[styles.offerImageText, { color: theme.colors.placeholder }]}>
                {offer.image ? <Image source={{ uri: offer.image }} style={styles.image} /> : "Offer Image"}
              </Text>
            </View>

            <Text style={[styles.offerTitle, { color: theme.colors.text }]}>{offer.offerTitle}</Text>
            <Text style={[styles.offerValidity, { color: theme.colors.lightText }]}>{offer.validity}</Text>

            <View style={styles.offerActions}>
              <View style={styles.actionContainer}>
                <Ionicons name="heart-outline" size={16} color={theme.colors.lightText} />
                <Text style={[styles.actionText, { color: theme.colors.lightText }]}> {offer.likes}</Text>
              </View>
              <View style={styles.actionContainer}>
                <Ionicons name="share-outline" size={16} color={theme.colors.lightText} />
                <Text style={[styles.actionText, { color: theme.colors.lightText }]}> Share</Text>
              </View>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.actionButtonText, { color: theme.colors.background }]}>I'm Interested</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: CONSTANTS.BOTTOM_NAV_HEIGHT,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  locationText: {
    fontSize: 14,
    marginLeft: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },

  offers: {
    paddingHorizontal: 16,
  },
  offerCard: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
  },
  offerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  offerInfo: {
    flex: 1,
    marginLeft: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  distance: {
    fontSize: 12,
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
  offerImage: {
    height: 120,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  offerImageText: {
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  offerValidity: {
    fontSize: 12,
    marginBottom: 16,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  offerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    marginLeft: 4,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default UserDashboard;
