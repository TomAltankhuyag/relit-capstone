import React from "react";
import { Slot, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ConnectLightLayout() {
  const router = useRouter();

  return (
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

        <Text style={styles.headerText}>Connect New Light</Text>
      </View>

      {/* Content Section */}
      {/* <View style={styles.contentContainer}>
        <Slot />
      </View> */}
      <Animated.View
        style={styles.contentContainer}
        entering={FadeInUp.duration(300)}
        exiting={FadeOutDown.duration(200)}
      >
        <Slot />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: "#000",
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
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
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
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
