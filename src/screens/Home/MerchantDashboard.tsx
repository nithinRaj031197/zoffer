import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme";
import { CONSTANTS } from "../../constants/utilities_basic";

const MerchantDashboard = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme(); // Accessing theme for dynamic styling

  // Dashboard Metrics
  const metrics = [
    { icon: "stats-chart-outline", title: "Total Offers", value: "247" },
    { icon: "eye-outline", title: "Total Views", value: "15.2K" },
    { icon: "people-outline", title: "Interactions", value: "3.8K" },
    { icon: "arrow-forward-outline", title: "Clicks", value: "982" }, // Replaced "mouse-outline"
  ];

  // Dummy Offer Data
  const offers = [
    {
      title: "Summer Sale 50% Off",
      validity: "Valid until Aug 30, 2025",
      views: "1.2K",
      likes: "234",
      shares: "45",
      users: "89",
    },
    {
      title: "Flash Deal 24H",
      validity: "Ends in 5:23:45",
      views: "856",
      likes: "167",
      shares: "23",
      users: "45",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Fixed Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>OfferTrack</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Metrics Section */}
        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <View key={index} style={[styles.metricCard, { backgroundColor: theme.colors.card }]}>
              <Ionicons name={metric.icon as keyof typeof Ionicons.glyphMap} size={20} color={theme.colors.primary} />
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
              <Text style={[styles.metricTitle, { color: theme.colors.lightText }]}>{metric.title}</Text>
            </View>
          ))}
        </View>

        {/* Offer Actions */}
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate("CreateOfferScreen")}
          >
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.footerButtonText}>Create Offer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.footerButtonText}>Edit Offers</Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.card }]}>
            <Text style={{ color: theme.colors.text }}>Category</Text>
            <Ionicons name="chevron-down-outline" size={16} color={theme.colors.lightText} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.card }]}>
            <Text style={{ color: theme.colors.text }}>Sort by</Text>
            <Ionicons name="chevron-down-outline" size={16} color={theme.colors.lightText} />
          </TouchableOpacity>
        </View>

        {/* Offers Section */}
        {offers.map((offer, index) => (
          <View key={index} style={[styles.offerCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.offerTitle, { color: theme.colors.text }]}>{offer.title}</Text>
            <Text style={[styles.offerValidity, { color: theme.colors.lightText }]}>{offer.validity}</Text>
            <View style={styles.offerStats}>
              <Text style={[styles.statText, { color: theme.colors.lightText }]}>
                <Ionicons name="eye-outline" size={16} /> {offer.views}
              </Text>
              <Text style={[styles.statText, { color: theme.colors.lightText }]}>
                <Ionicons name="heart-outline" size={16} /> {offer.likes}
              </Text>
              <Text style={[styles.statText, { color: theme.colors.lightText }]}>
                <Ionicons name="share-social-outline" size={16} /> {offer.shares}
              </Text>
              <Text style={[styles.statText, { color: theme.colors.lightText }]}>
                <Ionicons name="people-outline" size={16} /> {offer.users}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: CONSTANTS.BOTTOM_NAV_HEIGHT + 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    elevation: 2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  metricCard: {
    width: "48%",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  metricTitle: {
    fontSize: 14,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 1,
  },
  offerCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    marginHorizontal: 16,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  offerValidity: {
    fontSize: 14,
    marginVertical: 8,
  },
  offerStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statText: {
    fontSize: 14,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default MerchantDashboard;
