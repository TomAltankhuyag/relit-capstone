import React from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import {
  ImageBackground,
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

export default function ManageLightsLayout() {
  const router = useRouter();
  const segments = useSegments();

  const getTitle = () => {
    if (segments.includes("light-info")) return "Light Info";
    if (segments.includes("new-preset")) return "New Preset";
    if (segments.includes("preset-info")) return "About this Preset";
    if (segments.includes("group-info")) return "Group Details";
    if (segments.includes("set-all")) return "Apply Settings to All";
    return "Manage Your Lights";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentWrapper}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Pressable
              style={styles.backButton}
              onPress={() => {
                router.back();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="#fff" />
            </Pressable>
            <Text style={styles.headerText}>{getTitle()}</Text>
          </View>

          {/* Content Section */}
          {/* <View style={styles.contentContainer}>
              <Slot />
            </View> */}
          <View
            style={styles.contentContainer}
            // entering={FadeInUp.duration(1000)}
            // exiting={FadeOutDown.duration(400)}
          >
            <Slot />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  contentWrapper: {
    flex: 1,
    // backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    position: "absolute",
    left: 15,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
