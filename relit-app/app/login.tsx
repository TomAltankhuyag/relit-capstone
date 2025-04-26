import React, { useState } from "react"
import { Text, View, Pressable, TextInput, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useAppDispatch } from "@/lib/hooks"
import { login } from "@/user/userSlice"
import { initAction, InitPayload } from "@/lib/features/shared"
import AntDesign from "@expo/vector-icons/AntDesign"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import searchUsernameQuery from "@/graphql/searchUsernameQuery"
import getAllUserData from "@/graphql/getAllUserDataQuery"
import { checkPassword } from "@/components/password-hash"
import awsconfig from "@amplifyconfig"
import ReanimatedButton from "@/components/ReanimatedButton"
import Animated, { FadeInDown, FadeOutDown, SlideOutRight, SlideInLeft } from "react-native-reanimated"


Amplify.configure(awsconfig)
const client = generateClient()

export default function Login() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  async function handlePress() {
    console.log(
      `Pressed Login with following info: username:${username}, password:${password}`
    )
    // if there was an error, either succeed in login (thus change page)
    // or replace with new error.
    // means we don't have to clear error everytime press button

    // query db
    let users
    try {
      users = await client.graphql({
        query: searchUsernameQuery,
        variables: {
          username,
        },
        // improvement to this query for scale of users is doing the query with pagination
        // at the moment this query every user with username

        // can slow networking a lot if there is a lot of said username in database
      })
    } catch (e) {
      console.error(e)
      setError("Unable to access Database.")
      return
    }
    console.log("Queried database for users.")
    console.log(users.data.listUsers?.items)

    if (!users.data.listUsers?.items) {
      setError("Server Error with Connection to Database")
      return
    }

    if (users.data.listUsers.items.length === 0) {
      setError("Username not found")
      return
    }

    // found at least 1 user, check all against all their passwords
    /* the userID for the user whose password matched */
    let matchingUserID: string | null = null
    for (const item of users.data.listUsers.items) {
      // ignore null results
      if (!item) continue

      const result = await checkPassword(password, item.password, item.salt)
      console.log(result)
      if (result) {
        matchingUserID = item.userID
      }
    }

    if (!matchingUserID) {
      setError("Incorrect Password")
      return
    }
    // // found userID to grab info from db
    // let data
    // try {
    //   data = await client.graphql({
    //     query: getAllUserData,
    //     variables: {
    //       userID: matchingUserID,
    //     },
    //   })
    // } catch (e) {
    //   console.error(e)
    //   setError("Internal Error")
    //   return
    // }
    // console.log("Got user data")
    // const user_data = data.data

    // console.log(user_data)
    // if (
    //   !user_data.getUser ||
    //   !user_data.userDevicesByUserUserID ||
    //   !user_data.userDevicesByUserUserID
    // ) {
    //   setError("Server Error: Unable to fetch user data")
    //   return
    // }

    dispatch(login())
    console.log("Reached login")

    // const initPayload: InitPayload = {
    //   userID: matchingUserID,
    //   data: user_data,
    // }
    // try {
    //   dispatch(initAction(initPayload))
    // } catch (e) {
    //   console.error(e)
    //   setError("Internal Error during user data init")
    //   return
    // }

    // console.log("Dispatched initAction!")

    router.navigate("/home")
    // should be batched by default as using react 18 (only 1 re-render)
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
      {/* <Pressable style={styles.loginButton} onPress={handlePress}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable> */}
      <ReanimatedButton onPress={handlePress} label="Login" />
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
