import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable, Alert, Animated } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";

const ProfileImagePicker = ({ imageUrl, onImageSelect }: { imageUrl: string | null; onImageSelect: (uri: string) => void }) => {
  const { theme } = useTheme();
  const [image, setImage] = useState(imageUrl);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0];

  const handleImagePick = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setModalVisible(true);
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const openCamera = async () => {
    closeModal();
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Camera access is needed to take photos.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelect(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    closeModal();
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Gallery access is needed to choose a picture.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelect(result.assets[0].uri);
    }
  };

  const setDefaultImage = () => {
    closeModal();
    setImage(null);
    onImageSelect(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick} style={[styles.profileImageContainer, { borderColor: theme.colors.border }]}>
        {image ? (
          <Image source={{ uri: image }} style={[styles.profileImage, { borderColor: theme.colors.border }]} />
        ) : (
          <Ionicons name="person-circle-outline" size={80} color={theme.colors.placeholder} />
        )}
      </TouchableOpacity>

      {/* Camera Icon */}
      <TouchableOpacity style={[styles.cameraButton, { backgroundColor: theme.colors.card }]} onPress={handleImagePick}>
        <Ionicons name="camera-outline" size={20} color={theme.colors.primary} />
      </TouchableOpacity>

      {/* Clickable Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Animated.View style={[styles.modalContainer, { backgroundColor: theme.colors.card, transform: [{ translateY: slideAnim }] }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Select Profile Picture</Text>

            <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
              <Ionicons name="camera-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.modalOptionText, { color: theme.colors.text }]}>Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={openGallery}>
              <Ionicons name="image-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.modalOptionText, { color: theme.colors.text }]}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={setDefaultImage}>
              <Ionicons name="person-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.modalOptionText, { color: theme.colors.text }]}>Set Default Avatar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancel} onPress={closeModal}>
              <Text style={[styles.modalCancelText, { color: theme.colors.primary }]}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    padding: 4,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    width: 320,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    width: "100%",
    marginVertical: 6,
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modalCancel: {
    marginTop: 10,
    padding: 10,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileImagePicker;
