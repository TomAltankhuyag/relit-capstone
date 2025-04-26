import React, { useState, useEffect, useRef } from "react"
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import DropDownPicker from "react-native-dropdown-picker"
import ColorPicker, { Panel3, colorKit } from "reanimated-color-picker"
import Slider from "@react-native-community/slider"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { selectGroups } from "@/lib/features/groups/groupsSlice"
import { Group } from "@/lib/features/groups/groupsTypes"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { addPresetToGroup } from "@/lib/features/groups/groupsSlice"
export default function NewPreset() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { groupID } = useLocalSearchParams() // Get passed groupID if available

  const allGroups = useAppSelector(selectGroups)
  const initialHex = useRef("#ff00ff")
  const [presetName, setPresetName] = useState("")
  const [colorHex, setColorHex] = useState(initialHex.current)
  const initialBrightness = useRef(50)
  const [brightness, setBrightness] = useState(50)
  const [open, setOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(
    groupID || null
  )
  const [dropdownGroups, setDropdownGroups] = useState<
    { label: string; value: string }[]
  >([])
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false) // Modal state
  // Populate dropdown
  useEffect(() => {
    const groupDropdown = allGroups.map((group: Group) => ({
      label: group.name,
      value: group.groupID,
    }))
    setDropdownGroups(groupDropdown)

    // Auto-select group if provided in params
    if (groupID) {
      setSelectedGroup(groupID)
    }
  }, [allGroups, groupID])

  const openColorPicker = () => setIsColorPickerVisible(true)
  const closeColorPicker = () => setIsColorPickerVisible(false)

  const onSelectColor = ({ hex }: { hex: string }) => {
    setColorHex(hex)
  }
  // Handle saving preset (Mock function)
  const handleSave = () => {
    if (!presetName || !selectedGroup) {
      alert("Please enter a preset name and select a group.")
      return
    }

    console.log("Saving preset:", {
      name: presetName,
      groupID: selectedGroup,
      brightness,
      color: colorHex,
    })
    
    const { r, g, b } = colorKit.RGB(colorHex).object()
    dispatch(addPresetToGroup({
      groupID: selectedGroup,
      name: presetName,
      voltage: brightness,
      red: r,
      green: g,
      blue: b
    }))
    // Navigate back
    router.back()
  }

  return (
    <Animated.View
      entering={FadeInRight.duration(800)}
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
              <View style={styles.card}>
                <Text style={styles.label}>Preset Name:</Text>
                <TextInput
                  style={styles.input}
                  value={presetName}
                  onChangeText={setPresetName}
                  placeholder="Enter preset name"
                  placeholderTextColor="#aaa"
                />
              </View>

              <View style={[styles.card, { zIndex: 500 }]}>
                <Text style={styles.label}>Select Group:</Text>
                <DropDownPicker
                  open={open}
                  setOpen={setOpen}
                  value={selectedGroup}
                  setValue={setSelectedGroup}
                  items={dropdownGroups}
                  setItems={setDropdownGroups}
                  placeholder="Select a group"
                  listMode="SCROLLVIEW"
                  maxHeight={500}
                  style={{
                    backgroundColor: "black",
                    borderColor: "white",
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: "black",
                    borderColor: "white",
                  }}
                  textStyle={{
                    color: "white",
                  }}
                  placeholderStyle={{
                    color: "white",
                  }}
                  arrowIconStyle={{
                    tintColor: "white",
                  }}
                  tickIconStyle={{
                    tintColor: "white",
                  }}
                  listItemLabelStyle={{
                    color: "white",
                  }}
                />
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
                  style={[styles.colorDisplay, { backgroundColor: colorHex }]}
                >
                  <Text style={styles.colorDisplayText}>Tap to Change</Text>
                </Pressable>
              </View>
              <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Preset</Text>
              </Pressable>
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
                onChange={onSelectColor}
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
    padding: 8,
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
    shadowRadius: 4,
    elevation: 5,
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
  },
})
