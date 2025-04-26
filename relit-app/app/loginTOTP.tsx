import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import Animated, { FadeInDown, FadeOutDown} from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ReanimatedButton from '@/components/ReanimatedButton'
import {
    AuthError,
    confirmSignIn,
    getCurrentUser,

} from "aws-amplify/auth";
import { useAppDispatch } from '@/lib/hooks'
import { login } from "@/user/userSlice"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import awsconfig from "@amplifyconfig"
import getAllUserData from '@/graphql/getAllUserDataQuery'
import { initAction, InitPayload } from '@/lib/features/shared'

Amplify.configure(awsconfig)
const client = generateClient()

export default function LoginTOTP() {
  const router = useRouter()
  const dispatch = useAppDispatch()


  const [error, setError] = useState("")
  const [code, setCode] = useState("")

  async function handleConfirm() {
    if (code === '') {
      return
      // no need to deal with empty input, prob accident click
    }
    try {
      const { isSignedIn, nextStep } = await confirmSignIn({ challengeResponse: code })

      if (nextStep.signInStep !== 'DONE') {
        // unexpected flow, incorrect code throws error, so we should only be DONE at this point
        throw new Error("Unexpected error, expected to be DONE with aws signIn process.")
      }
      console.log(`after confirm: ${isSignedIn}, ${nextStep.signInStep}`)

      const { userId } = await getCurrentUser()
      // got userID to grab info from db
      let data
      try {
        data = await client.graphql({
          query: getAllUserData,
          variables: {
            userID: userId,
          }
        })
      } catch (e) {
        console.error(e)
        setError("Internal Error")
        return
      }
      console.log("Got user data")
      const user_data = data.data

      console.log(user_data)
      if (!user_data.getUser || !user_data.userDevicesByUserUserID || !user_data.userDevicesByUserUserID) {
        setError("Server Error: Unable to fetch user data")
        return
      }

      const initPayload: InitPayload = {
        userID: userId,
        data: user_data
      }
      dispatch(initAction(initPayload))
      dispatch(login())
      router.navigate('/home')

    } catch (error) {
      console.log(error)
      if (error instanceof AuthError) {
        // incorrect code

        if (error.name === 'CodeMismatchException') {
          setError("Incorrect code")
          setCode('')
          return
        }
        if (error.name === 'NotAuthorizedException') {
          // basically a timeout
          router.back()
        }
      
      }
      setError("Unexpected Error, app has encounted an unknown bug.")
    }
  }

  return(
    <Animated.View
      entering={FadeInDown.duration(1000)}
      exiting={FadeOutDown.duration(1000)}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => {
            router.back()
          }}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.headerText}>Authenticator Code</Text>
        </View>
      </View>

      <View>
        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
        {/* authenticater code intput*/}
        <TextInput style={styles.inputStyling} placeholder="Code"
          onChangeText={setCode} value={code} placeholderTextColor="#fff" />
        <ReanimatedButton onPress={handleConfirm} label={'Enter code from authenticator'} />
      </View>  
      
    </Animated.View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 1,
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
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
  },
  // loginButton: {
  //   padding: 15,
  //   marginBottom: 10,
  //   width: 300,

  //   alignItems: "center",

  //   backgroundColor: "#000",

  //   shadowColor: "#fff",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 1,
  //   shadowRadius: 4,
  //   elevation: 5,

  //   borderRadius: 10,
  //   borderWidth: 1,
  //   borderColor: "#fff",
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 16,
  // },
  inputStyling: {
    borderWidth: 1,
    padding: 10,
    height: 50,
    margin: 5,
    width: 250,
    backgroundColor: "#000",
    borderColor: "#fff",
    borderRadius: 10,
    color: "#fff",
    marginBottom: 10,
    fontSize: 16,

    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
})
