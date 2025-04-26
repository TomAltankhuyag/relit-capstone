// Route where user is asked to login or signup
// Bonus: Remember last login details?

import React, {useEffect} from "react"
import { Pressable, Text, View, ImageBackground, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import {
  buttonStyling,
  generalStyling,
  FONT_COLOR_PRIMARY,
  FONT_COLOR_SECONDARY,
} from "@/assets/styles/styles"
import {useAppSelector} from "@/lib/hooks";
import {selectUser} from "@/user/userSlice";
import {selectGroups} from "@/groups/groupsSlice";
import {selectDevices} from "@/devices/devicesSlice";
import ReanimatedButton from "@/components/ReanimatedButton";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

export default function Welcome() {
  console.log(useAppSelector(state => selectUser(state)))
  console.log(useAppSelector(state => selectGroups(state)))
  console.log(useAppSelector(state => selectDevices(state)))


  const router = useRouter()
  return (
    <Animated.View
          entering={FadeInDown.duration(800)}
          exiting={FadeOutDown.duration(500)}
          style={styles.container}>
    {/* Welcome Page Image */}
    <View style={{ flex: 0.45, backgroundColor: '#000' }}>
      <ImageBackground
        source={require("@/assets/images/background.png")}
        resizeMode="cover"
        style={{ flex: 1}}
      ></ImageBackground>
    </View>
    {/* We;c */}
    <View
      style={[
        generalStyling.centering,
        { flex: 0.55, backgroundColor: "#000", gap: 45 },
      ]}
    >
      <View style={[generalStyling.centering, {gap: 15, backgroundColor: '#000'}]}>
        <Text style={{ fontWeight: 700, fontSize: 25, color: '#fff' }}> Welcome to APP</Text>
        <Text
          style={{
            paddingHorizontal: 40,
            textAlign: "center",
            color: "#fff",
            opacity: 0.9,
          }}
        >
          Please log in or create an account below to control your lighting
          system.
        </Text>
        <Text style={{ fontSize: 40 }}>💡</Text>
      </View>
      {/* Buttons */}
      <View style={{gap: 10}}>
        {/* <Pressable style={styles.button} onPress={()=>{router.navigate('/signup')}}>  
            <Text style={styles.buttonText}>Sign up</Text>
        </Pressable> */}
        <ReanimatedButton onPress={()=>{router.navigate('/signup')}} label="Sign Up" style={styles.button} textStyle={styles.buttonText}/>
        <ReanimatedButton onPress={()=>{router.navigate('/login')}} label="Log in" style={styles.button} textStyle={styles.buttonText}/>
        {/* <Pressable style={styles.button} onPress={()=>{router.navigate('/login')}}>
            <Text style={styles.buttonText}>Log in</Text>
        </Pressable> */}
      </View>
    </View>
  </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#000',
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
})