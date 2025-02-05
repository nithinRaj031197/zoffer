import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import { CONSTANTS } from "../../constants/utilities_basic";

const BusinessProfile = () => {
  const { theme } = useTheme();

  const tags = ["Software", "IT Services", "Consulting"];
  const offers = [
    {
      title: "New Cloud Service Launch",
      description: "Introducing our new cloud infrastructure service with enhanced security features.",
      date: "Posted Jan 15, 2025",
    },
    {
      title: "Special Q1 Consulting Offer",
      description: "Get 20% off on all consulting packages for startups.",
      date: "Posted Jan 10, 2025",
    },
  ];

  const reviews = [
    {
      name: "John Smith",
      review: "Great service and professional team. Highly recommended!",
      date: "Jan 5, 2025",
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}

      {/* Business Info Card */}
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <View style={styles.profileSection}>
          <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.businessImage} />
          <View style={styles.profileDetails}>
            <Text style={[styles.businessName, { color: theme.colors.text }]}>TechCorp Solutions</Text>
            <Text style={[styles.location, { color: theme.colors.lightText }]}>
              <Ionicons name="location-outline" size={16} /> San Francisco, CA
            </Text>
          </View>
          <TouchableOpacity style={[styles.followButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.followButtonText, { color: theme.colors.background }]}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Tags */}
        <View style={styles.tags}>
          {tags.map((tag, index) => (
            <Text key={index} style={[styles.tag, { backgroundColor: theme.colors.card, color: theme.colors.text }]}>
              {tag}
            </Text>
          ))}
        </View>
      </View>

      {/* About Section Card */}
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
        <Text style={[{ color: theme.colors.lightText }]}>
          Leading provider of innovative software solutions and IT consulting services, helping businesses transform digitally since 2010.
        </Text>
        <Text style={[{ color: theme.colors.text }]}>
          <Ionicons name="call-outline" size={16} /> +1 (555) 123-4567
        </Text>
        <Text style={[{ color: theme.colors.text }]}>
          <Ionicons name="mail-outline" size={16} /> contact@techcorp.com
        </Text>
        <Text style={[{ color: theme.colors.text }]}>
          <Ionicons name="globe-outline" size={16} /> www.techcorp.com
        </Text>
      </View>

      {/* Recent Offers Section Card */}
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Offers & Updates</Text>
        {offers.map((offer, index) => (
          <View key={index} style={styles.offer}>
            <Text style={[styles.offerTitle, { color: theme.colors.text }]}>{offer.title}</Text>
            <Text style={[styles.offerDescription, { color: theme.colors.lightText }]}>{offer.description}</Text>
            <Text style={[styles.offerDate, { color: theme.colors.lightText }]}>{offer.date}</Text>
          </View>
        ))}
      </View>

      {/* Social Links Card */}
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Connect With Us</Text>
        <View style={styles.socialIcons}>
          <Ionicons name="logo-linkedin" size={24} color={theme.colors.primary} />
          <Ionicons name="logo-twitter" size={24} color={theme.colors.primary} />
          <Ionicons name="logo-facebook" size={24} color={theme.colors.primary} />
          <Ionicons name="logo-instagram" size={24} color={theme.colors.primary} />
        </View>
      </View>

      {/* Reviews Section Card */}
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <View style={styles.reviewHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reviews</Text>
          <TouchableOpacity>
            <Text style={[styles.writeReview, { color: theme.colors.primary }]}>Write a Review</Text>
          </TouchableOpacity>
        </View>
        {reviews.map((review, index) => (
          <View key={index} style={styles.review}>
            <Ionicons name="person-circle-outline" size={40} color={theme.colors.placeholder} />
            <View style={styles.reviewDetails}>
              <Text style={[styles.reviewerName, { color: theme.colors.text }]}>{review.name}</Text>
              <Text style={[styles.reviewText, { color: theme.colors.lightText }]}>{review.review}</Text>
              <Text style={[styles.reviewDate, { color: theme.colors.lightText }]}>{review.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: CONSTANTS.BOTTOM_NAV_HEIGHT,
  },

  card: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  businessImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  profileDetails: {
    flex: 1,
    marginLeft: 16,
  },
  businessName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    marginTop: 4,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  offer: {
    marginBottom: 12,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  offerDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  offerDate: {
    fontSize: 10,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  writeReview: {
    fontSize: 14,
    fontWeight: "bold",
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewDetails: {
    marginLeft: 16,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  reviewText: {
    fontSize: 12,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 10,
  },
});

export default BusinessProfile;
