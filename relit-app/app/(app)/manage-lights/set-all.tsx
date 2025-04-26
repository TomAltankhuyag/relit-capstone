import React, { useRef, useState, useEffect } from "react"
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import ColorPicker, { Panel3, colorKit } from "reanimated-color-picker"
import Slider from "@react-native-community/slider"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { selectGroups } from "@/lib/features/groups/groupsSlice"
import { Preset } from "@/lib/features/groups/groupsTypes"
import { DeviceType } from "@/graphql/API"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { applyPresetToDevicesAction } from "@/lib/features/shared"
export default function SetAll() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { groupID } = useLocalSearchParams()

  const allGroups = useAppSelector(selectGroups)
  const group = allGroups.find((g) => g.groupID === groupID)

  const [colorHex, setColorHex] = useState("#0f0")
  const initialBrightness = useRef(50)
  
  const [brightness, setBrightness] = useState(50)
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false) // Modal state
  // Handle Color Selection
  const openColorPicker = () => setIsColorPickerVisible(true)
  const closeColorPicker = () => setIsColorPickerVisible(false)

  const onSelectColor = ({ hex }: { hex: string }) => {
    setColorHex(hex)
  }

  // Handle Save Changes
  const handleSave = () => {
    if (!groupID) return

    console.log("Applying settings to all lights in group:", {
      groupID,
      brightness,
      color: colorHex,
    })

    const group = allGroups.find(g => g.groupID === groupID)
    if (!group) {
      alert("Group not found.")
      return
    }
    const { r, g, b } = colorKit.RGB(colorHex).object()
    const preset: Preset = {
      type: DeviceType.RGBLight, // This value won't matter — it's only used to infer the config shape
      config: {
        voltage: brightness,
        red: r,
        green: g,
        blue: b
      }
    }

    dispatch(applyPresetToDevicesAction({
      preset,
      deviceIDs: group.device_ids
    }))

    console.log("Applied preset to devices in group:", group.name)

    router.back()
  }

  return (
    <Animated.View
      entering={FadeInRight.duration(1000)}
      exiting={FadeOutLeft.duration(600)}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
              {group ? (
                <>
                  <View style={styles.card}>
                    <Text style={styles.label}>Set All for: {group.name}</Text>
                  </View>

                  <View style={styles.card}>
                    <Text style={styles.label}>Brightness: {brightness}%</Text>
                    <Slider
                      style={styles.slider}
                      value={initialBrightness.current}
                      step={1}
                      minimumValue={0}
                      maximumValue={100}
                      minimumTrackTintColor="#fff"
                      maximumTrackTintColor="#000"
                      onValueChange={setBrightness}
                    />
                  </View>

                  <View style={styles.card}>
                    <Text style={styles.label}>Color:</Text>
                    <Pressable
                      onPress={openColorPicker}
                      style={[
                        styles.colorDisplay,
                        { backgroundColor: colorHex },
                      ]}
                    >
                      <Text style={styles.colorDisplayText}>Tap to Change</Text>
                    </Pressable>
                  </View>

                  <Pressable style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Apply to All</Text>
                  </Pressable>
                </>
              ) : (
                <Text style={styles.errorText}>Group not found.</Text>
              )}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isColorPickerVisible}
          onRequestClose={closeColorPicker}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Pick a Color</Text>
              <ColorPicker
                style={{ width: 250 }}
                onComplete={onSelectColor}
                value={colorHex}
              >
                <Panel3 />
              </ColorPicker>

              {/* Close Button */}
              <Pressable style={styles.closeButton} onPress={closeColorPicker}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#000",
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    fontSize: 14,
    color: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
    marginTop: 10,
  },
  colorDisplay: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  colorDisplayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})
