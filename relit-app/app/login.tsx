import React, { useState } from "react"
import { Text, View, Pressable, TextInput, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useAppDispatch } from "@/lib/hooks"
import AntDesign from "@expo/vector-icons/AntDesign"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import awsconfig from "@amplifyconfig"
import ReanimatedButton from "@/components/ReanimatedButton"
import Animated, { FadeInDown, FadeOutDown} from "react-native-reanimated"
import {handleSignInNextSteps} from "@/components/aws-auth";
import { AuthError, signIn } from 'aws-amplify/auth'
import ConfirmSignUpPage from "@/components/confirmSignUp"

Amplify.configure(awsconfig)
const client = generateClient()

export default function Login() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [confirmFlag, setConfirmFlag] = useState(false)


  async function handlePress() {
    try {
      const output = await signIn({
        username,
        password
      });
      console.log(`signIn next set: ${output.nextStep.signInStep}`)
      if (output.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        setConfirmFlag(true)
        return
      }

      await handleSignInNextSteps(output);
      router.push('/loginTOTP')
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message)
      }
      console.log(error);
    }
  }


  return (
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
          <Text style={styles.headerText}>Login</Text>
        </View>
      </View>
      {!confirmFlag ?
      <>
        {/* login inputs */}
        <View>
          {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
          <TextInput
            style={styles.inputStyling}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
            autoCapitalize="none"
            placeholderTextColor={"#fff"}
          />
          <TextInput
            style={styles.inputStyling}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor={"#fff"}
          />
        </View>
        <ReanimatedButton onPress={handlePress} label="Login" />
      </> :
      <ConfirmSignUpPage username={username} />
    }
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
  loginButton: {
    padding: 15,
    marginBottom: 10,
    width: 300,

    alignItems: "center",

    backgroundColor: "#000",

    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
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
