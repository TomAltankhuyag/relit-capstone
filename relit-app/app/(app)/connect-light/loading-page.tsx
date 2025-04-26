import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const messageTemp: string = "Looking for your devices...";

export default function LoadingPage({ message = messageTemp }: { message?: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [foundDevices, setFoundDevices] = useState<string[]>([]);

  useEffect(() => {
    // Simulate device search
    setTimeout(() => {
      const devices = ["Device 49223", "Device 34232", "Device 40323"];
      setFoundDevices(devices);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : foundDevices.length > 0 ? (
        <>
          <Text style={styles.subHeader}>Devices Found:</Text>
          <FlatList
            data={foundDevices}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={styles.deviceButton}
                onPress={() =>
                  router.push({
                    pathname: "/connect-light/light-connected",
                    params: { deviceName: item },
                  })
                }
              >
                <Text style={styles.deviceText}>{item}</Text>
                <AntDesign name="right" size={20} color="#fff" />
              </Pressable>
            )}
          />
        </>
      ) : (
        <Text style={styles.noDevicesText}>No devices found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  deviceButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111",
    borderColor: "#fff",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
    width: 300,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  deviceText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  noDevicesText: {
    fontSize: 16,
    color: "#aaa",
    marginTop: 10,
  },
  manualButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  manualButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
