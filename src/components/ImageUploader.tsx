import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert, ScrollView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../theme";
import * as FileSystem from "expo-file-system";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";

export interface Media {
  uri: string;
  type: "image" | "video";
}

interface ImageUploaderProps {
  images: Media[];
  setImages: (media: Media[]) => void;
  allowMultiple?: boolean;
  width?: number;
  height?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, allowMultiple = false, width, height = 150 }) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const IMAGE_WIDTH = 100;
  const IMAGE_MARGIN = 10;
  const videoRef = useRef<Video>(null);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.x);
  };

  const handleLayout = (event) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const handleContentSizeChange = (width: number) => {
    setContentWidth(width);
  };

  const scrollLeft = () => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: true }); // Scroll to the first image
  };

  const scrollRight = () => {
    scrollViewRef.current?.scrollTo({ x: contentWidth - containerWidth, animated: true }); // Scroll to the last image
  };

  const showLeftIndicator = scrollPosition > 10;
  const showRightIndicator = scrollPosition < contentWidth - containerWidth - 10;

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to enable permissions to access the gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Supports images & videos
      allowsEditing: true,
      allowsMultipleSelection: allowMultiple,
      quality: 1,
    });

    if (!result.canceled) {
      const newMedia: Media[] = [];

      for (const asset of result.assets) {
        const uri = asset.uri;
        const type = asset.type.startsWith("video") ? "video" : "image";

        // Get file size safely
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (type === "video" && asset.duration > 10) {
          Alert.alert("Upload Error", "File duration exceeds 10 seconds.");
          continue;
        }
        if (fileInfo.exists && fileInfo.size > 1 * 1024 * 1024) {
          Alert.alert("Upload Error", "File size exceeds 1MB.");
          continue;
        }

        newMedia.push({ uri, type });
      }

      setImages(allowMultiple ? [...images, ...newMedia] : [newMedia[0]]);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <View style={[styles.container, { width: width ?? "100%" }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{allowMultiple ? "Attach Images" : "Attach Image"}</Text>

      <View style={styles.scrollContainer} onLayout={handleLayout}>
        {/* Left Scroll Button */}
        {showLeftIndicator && (
          <TouchableOpacity style={[styles.indicator, { left: 5 }]} onPress={scrollLeft}>
            <Ionicons name="chevron-back-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        )}

        {/* Image ScrollView */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onContentSizeChange={(width) => handleContentSizeChange(width)}
          style={styles.imageScrollView}
        >
          {images.map((media, index) => (
            <View key={index} style={[styles.mediaWrapper, { height }]}>
              {media.type === "image" ? (
                <Image source={{ uri: media.uri }} style={styles.image} />
              ) : (
                <Video
                  ref={videoRef}
                  source={{ uri: media.uri }}
                  style={styles.video}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={false}
                  isLooping={false}
                  onPlaybackStatusUpdate={(status) => {
                    if ("didJustFinish" in status && status.didJustFinish) {
                      videoRef.current?.setPositionAsync(0);
                    }
                    setVideoStatus(status);
                  }}
                />
              )}
              {/* Media Type Label (Icon) */}
              <View style={styles.mediaTypeLabel}>
                <Ionicons name={media.type === "image" ? "image-outline" : "videocam-outline"} size={18} color="white" />
              </View>

              {/* Remove Button */}
              <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                <Ionicons name="close-circle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Right Scroll Button */}
        {showRightIndicator && (
          <TouchableOpacity style={[styles.indicator, { right: 5 }]} onPress={scrollRight}>
            <Ionicons name="chevron-forward-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Upload Button */}
      <TouchableOpacity
        style={[styles.uploadButton, { height, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={handleImageUpload}
      >
        <Ionicons name="cloud-upload-outline" size={24} color={theme.colors.placeholder} />
        <Text style={[styles.uploadText, { color: theme.colors.placeholder }]}>Tap to upload {allowMultiple ? "images" : "an image"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  indicator: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 5,
    borderRadius: 20,
    zIndex: 10,
  },
  uploadButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  uploadText: {
    fontSize: 14,
    marginTop: 8,
  },
  imageScrollView: {
    flexDirection: "row",
  },
  mediaWrapper: {
    position: "relative",
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  video: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  mediaTypeLabel: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 5,
    borderRadius: 5,
  },

  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
  },
});

export default ImageUploader;
