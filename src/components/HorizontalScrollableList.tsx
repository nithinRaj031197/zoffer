import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";

interface HorizontalScrollableListProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const HorizontalScrollableList: React.FC<HorizontalScrollableListProps> = ({ items, selectedIndex, onSelect }) => {
  const { theme } = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.itemButton,
            {
              backgroundColor: index === selectedIndex ? theme.colors.primary : theme.colors.card,
            },
          ]}
          onPress={() => onSelect(index)}
        >
          <Text
            style={[
              styles.itemText,
              {
                color: index === selectedIndex ? theme.colors.background : theme.colors.text,
              },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    height: 70,
    alignSelf: "center",
  },
  itemButton: {
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    justifyContent: "center",
    elevation: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default HorizontalScrollableList;
