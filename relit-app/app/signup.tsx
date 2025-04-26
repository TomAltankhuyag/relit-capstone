import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable
} from 'react-native'
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ReanimatedButton from '@/components/ReanimatedButton'
import { handleSignUp } from "@/components/aws-auth";
import ConfirmSignUpPage from '@/components/confirmSignUp'
import {
  AuthError,
} from "aws-amplify/auth";
import { useAppDispatch } from '@/lib/hooks'
import { CreateGroupInput, CreateUserInput } from '@/graphql/API'
import { randomUUID } from 'expo-crypto'
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import awsconfig from "@amplifyconfig"
import { createGroup, createUser } from '@/graphql/mutations'

Amplify.configure(awsconfig)
const client = generateClient()

async function createNewUserDB(userID: string, email: string, username: string) {
  const groupID = randomUUID();

  const defaultGroup: CreateGroupInput = {
    groupID,
    name: "Default Group",
    userID
  }

  const newUserInput : CreateUserInput = {
    userID,
    email,
    username,
    password: "",
    salt: "",
    defaultGroupID: groupID,
  };  // only need to store userID and username and a defaultGroupID placeholder
  // other fields are deprecated (we don't need to store)

  // we don't check with db if groupID already exists 
  // (chances of collision is very low as use UUID4, but technically possible)
  // no need to check for existing userID as aws cognito generates that, we assume it is unique for every user

  // essentially we assume queries are successful

  // create new user 
  client.graphql({
    query: createUser,
    variables: {
      input: newUserInput
    }
  })
  // create the default group of the user
  client.graphql({
    query: createGroup,
    variables: {
      input: defaultGroup
    }
  })
}

export default function SignUp() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [confirmFlag, setConfirmFlag] = useState(false)

  async function handleSubmit() {
    if (!email || !username || !password) {
      setError("Fill all fields")
      return
    }

    if (password.length < 8) {
      setError("Password length must be atleast 8")
      return
    }

    if (confirmPassword !== password) {
      setError("Confirm Password must match Password")
      return
    }

    try{
      const {userID, nextStep} = await handleSignUp({username, email, password})
      
      if (nextStep === 'CONFIRM_SIGN_UP') {
        setConfirmFlag(true)
      }
      if (!userID) {
        throw new Error("userID is undefined")
      }

      // db query to create new user using userID and username and email
      await createNewUserDB(userID, email, username)

    } catch (e) {
      console.log(e)
      if (e instanceof AuthError) {
        if (e.name === 'UsernameExistsException') {
          setError("Username already exists")
        }
        if (e.name === 'InvalidParameterException') {
          setError(e.message)
        }
      }
      else {
        setError("Error while signing up")
      }
    }
  }

  return (
    <Animated.View
      entering={SlideInLeft.duration(1000)}
      exiting={SlideOutRight.duration(1000)}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={24} color='#fff' />
        </Pressable>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={styles.headerText}>Sign Up</Text>
        </View>
      </View>

      
      {error && <Text style={{ color: "red"}}>{error}</Text>}
      {!confirmFlag ? 
        <>
          {/* Signup Fields */}
          <View>
            <TextInput
              style={styles.inputStyling}
              placeholder='Username*'
              placeholderTextColor='#fff'
              autoCapitalize="none"
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.inputStyling}
              placeholder='Email'
              placeholderTextColor='#fff'
              autoCapitalize="none"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.inputStyling}
              placeholder='Password*'
              secureTextEntry
              placeholderTextColor='#fff'
              autoCapitalize="none"
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.inputStyling}
              placeholder="Confirm Password*"
              placeholderTextColor='#fff'
              secureTextEntry
              autoCapitalize="none"
              onChangeText={setConfirmPassword}
            />
          </View>
          {/* Submit Button */}
          <ReanimatedButton label='Submit' onPress={handleSubmit} />       
        </> :
        <ConfirmSignUpPage username={username} />
      }

    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
  },
  inputStyling: {
    borderWidth: 1,
    padding: 10,
    height: 50,
    margin: 5,
    width: 250,
    backgroundColor: '#000',
    borderColor: '#fff',
    borderRadius: 10,
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,

    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
})

