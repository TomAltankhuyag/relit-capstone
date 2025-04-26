import { StyleSheet } from "react-native"
export const FONT_COLOR_PRIMARY = '#FFFFFF'
export const FONT_COLOR_SECONDARY = '#747474'
const sharedStyle = {
    width: 250,
    height: 35,
    borderRadius: 4,
    textAlign: 'center',
}
export const generalStyling = StyleSheet.create({
  centering: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    
  },
  linkStyling: {
    fontSize: 20,
    textAlign: 'center'
  },
  textWrap: {
    flexWrap: 'wrap'
  }
})
export const buttonStyling = StyleSheet.create({
  primaryStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderColor: '#fff',
    borderWidth: 1,
    color: '#bababa',
    ...sharedStyle
  },
  secondaryStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bababa',
    color: '#70757d',
    ...sharedStyle
  },
  linkStyle: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center'
  }
})

export const inputStyling = StyleSheet.create({
  default: {
    borderWidth: 1,
    padding: 10,
    height: 40,
    margin: 5,
    width: 250,
    backgroundColor: '#000',
    borderColor: '#fff',
    color:'#fff'
  }
})