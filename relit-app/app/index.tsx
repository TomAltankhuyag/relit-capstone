// import 'text-encoding'
import 'fast-text-encoding'
import React from "react"
import WelcomeScreen from "./welcome"
import { View } from 'react-native'
// global.TextEncoder = require('text-encoding').TextEncoder
// global.TextDecoder = require('text-encoding').TextDecoder

export default function Index() {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <WelcomeScreen/>

    </View>
  )
}
