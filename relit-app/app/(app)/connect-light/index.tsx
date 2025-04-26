import React from "react";
import { View, Text } from "react-native";
import { generalStyling } from "@/assets/styles/styles";

export default function ConnectLight() {
  return (
    <View style={[generalStyling.centering, {flex: 1}]}>
      <Text>
        Error Route
      </Text>
    </View>
  )
}