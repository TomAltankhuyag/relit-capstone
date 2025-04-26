import React from "react";
import StoreProvider from "@/components/StoreProvider";
import {Slot} from "expo-router";
import PubSubProvider from "@/components/PubSubProvider";
import { View } from "react-native";
export default function RootLayout() {
  return (
    // need to pass some children to Provider as Provider requires some children
    // if pass nothing, end up with blank screen
    <View style={{flex: 1, backgroundColor: '#000'}}>
    <StoreProvider>
      <PubSubProvider>
        <Slot />
      </PubSubProvider >
    </StoreProvider>
    </View>

    // Slot is essentially {children} for expo router
  )
}
