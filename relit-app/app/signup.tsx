import React from 'react'
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

export default function SignUp() {
  const router = useRouter()

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

      {/* Input Fields */}
      <View>
        <TextInput
          style={styles.inputStyling}
          placeholder='Username*'
          placeholderTextColor='#fff'
        />
        <TextInput
          style={styles.inputStyling}
          placeholder='Email'
          placeholderTextColor='#fff'
        />
        <TextInput
          style={styles.inputStyling}
          placeholder='Password*'
          secureTextEntry
          placeholderTextColor='#fff'
        />
      </View>

      {/* Submit Button */}
      <ReanimatedButton
        label='Submit'
        onPress={() => console.log('sign up pressed')}
      />
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
