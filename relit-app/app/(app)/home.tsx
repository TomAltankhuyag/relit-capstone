import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout, selectUser } from "@/user/userSlice";
import { PubSubContext } from "@/components/PubSubProvider";
import ReanimatedButton from "@/components/ReanimatedButton";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import {handleSignOut} from "@/components/aws-auth";

export default function Home() {
  const pubSub = useContext(PubSubContext);
  const [message, setMessage] = useState<string>("Start");

  useEffect(() => {
    pubSub.subscribe({ topics: ["your/topic"] }).subscribe({
      next: (data) => {
        setMessage(data.msg as string);
      },
    });
  }, []);

  const user = useAppSelector((state) => selectUser(state));
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogOut() {
    dispatch(logout());
    await handleSignOut()
    router.navigate("/welcome");
  }

  async function handleAWS() {
    console.log("sending");
    const message = {
      "desired": {
        "welcome": "aws-iot",
        "voltage": 15,
        "dimness": 20,
        "id": "1234",
        "hexcode": "300.0",
        "toggle": "0",
        "brightness": "100",
        "brightness_direction": "-1",
        "rainbow_toggle": "0"
      },
    }
    try {
      await pubSub.publish({ topics: ["config/BTHubThing"], message });
      console.log("Message sent!111222");
    } catch (error) {
      console.error("Error publishing message:", error);
    }
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(1000)}
      exiting={FadeOutDown.duration(1000)}
      style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.headerText}>Welcome, {user.username} 👋</Text>

      {/* Centered Logo */}
      <Image style={styles.logo} source={require("@/assets/images/UT-logo.jpg")} />

      {/* Centered Buttons */}
      <View style={styles.buttonsContainer}>
        {/* Connect New Light */}
        <ReanimatedButton
          label="Connect New Light"
          onPress={() => router.push("/(app)/connect-light/loading-page")}
          style={styles.button}
          textStyle={styles.buttonText}
        />

        {/* Manage Your Lights */}
        <ReanimatedButton
          label="Manage Your Lights"
          onPress={() => router.push("/(app)/manage-lights/lights-manager")}
          style={styles.button}
          textStyle={styles.buttonText}
        />

        {/* AWS Pub */}
        {/* <ReanimatedButton
          label={`AWS Pub: ${message}`}
          onPress={handleAWS}
          style={styles.button}
          textStyle={styles.buttonText}
        /> */}
      </View>

      {/* Logout Button - Positioned at Bottom Left */}
      <ReanimatedButton
        label="Log Out"
        onPress={handleLogOut}
        style={styles.logoutButton}
        textStyle={styles.logoutText}
      />
    </Animated.View>
  );

}

const styles = StyleSheet.create({
  // backgroundImage: {
  //   ...StyleSheet.absoluteFillObject,
  //   zIndex: -1,
  // },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    zIndex: 1
  },
  headerText: {
    fontSize: 24,

    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 10,
    borderRadius: 10,
  },
  buttonsContainer: {
    flex: 1, // Takes up available space to center content
    justifyContent: "center", // Centers buttons vertically
    alignItems: "center", // Aligns buttons to the center horizontally
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15, // Adds spacing between buttons
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: '#f00',
    padding: 12,
    borderRadius: 8,
    shadowColor: "#f00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,

    width: 100
  },
  logoutText: {
    color: "#f00",
    fontSize: 16,
  },
  logo: {
    width: 300,
    height: 300
  }
});
