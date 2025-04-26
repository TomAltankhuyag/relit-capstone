import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import ReanimatedButton from '@/components/ReanimatedButton'
import { useRouter } from 'expo-router'
import { AuthError, autoSignIn, confirmSignUp } from '@aws-amplify/auth'
import { handleSignInNextSteps } from "@/components/aws-auth";
import { useAppDispatch } from '@/lib/hooks'

// Page for confirmin signup with email verification code

type confirmSignUpPageProps = {
  username: string
}

export default function ConfirmSignUpPage ({ username }: confirmSignUpPageProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  async function handleConfirm(confirmationCode: string) {
    try {
      const { nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });

      if (nextStep.signUpStep !== 'COMPLETE_AUTO_SIGN_IN') {
        throw new Error("Expected next step is auto sign in.");
      }
    } catch (error) {
      console.log('error confirming sign up', error);
      if (error instanceof AuthError) {
        // need to deal with incorrect code error differently (different setError)
        if (error.name === 'CodeMismatchException') {
          setError("Incorret verification code")
        }
        if (error.name === 'ExpiredCodeException') {
          setError("Email code has expired.")     
          // no clue how to deal as don't know how to resend code
        }
      }
      else {
        setError("Error while signing up")
      }

      return
    }

    try {
      const signInOutput = await autoSignIn();
      
      console.log(`autosignin: ${signInOutput.nextStep.signInStep}`)

      // next step should not ever be done as need to setup with authenticator, meaning not DONE
      // if (signInOutput.nextStep.signInStep === 'DONE') {
      //   // query just made user from db? No need, get info when create user in first place
      //   dispatch(login())
      // }
      await handleSignInNextSteps(signInOutput);
      router.push("/loginTOTP")
      // if can't complete signin as need to setup TOTP, then also no need to do anything
      // as you are not signed in, thus when try to go to /home, get redirected to login, where you need to go

    } catch (error) {
      console.log(error);

      setError("Unexpected error after email verification.")
      return
    }
  }

  return(
    <View>
      {/* email verification code */}
      {error && <Text style={{ color: "red"}}>{error}</Text>}
      <TextInput style={styles.inputStyling} placeholder="Code"
          onChangeText={setCode} value={code} placeholderTextColor="#fff" />
      <ReanimatedButton onPress={() => handleConfirm(code)} label={'Enter code from email'} />
    </View>
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
