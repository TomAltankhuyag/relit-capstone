import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectLoggedIn } from "@/user/userSlice";
import { Redirect, Slot } from "expo-router";

import { View } from "react-native";
export default function AppLayout() {
  const isLoggedIn = useAppSelector(selectLoggedIn);

  if (!isLoggedIn) return <Redirect href="/welcome" />;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Slot />
    </View>
  );
}
