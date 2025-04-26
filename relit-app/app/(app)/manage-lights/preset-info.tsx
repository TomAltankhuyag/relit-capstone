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
import ColorPicker, { Panel3, colorKit } from "reanimated-color-picker"
import Slider from "@react-native-community/slider"
import DropDownPicker from "react-native-dropdown-picker"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { selectGroups } from "@/lib/features/groups/groupsSlice"
import { Group, Preset } from "@/lib/features/groups/groupsTypes"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { applyPresetToDevicesAction } from "@/lib/features/shared"
import { DeviceType } from "@/graphql/API"

export default function PresetInfo() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { name, groupID, color, brightness } = useLocalSearchParams()

  const allGroups = useAppSelector(selectGroups)
  const [presetName, setPresetName] = useState(name || "")
  const [colorHex, setColorHex] = useState(color)
  const initialBrightness = useRef<number>(Number(brightness) || 50)
  const [brightnessValue, setBrightnessValue] = useState(
    initialBrightness.current
  )
  const [open, setOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(groupID || null)
  const [dropdownGroups, setDropdownGroups] = useState<
    { label: string; value: string }[]
  >([])
  const [isChanged, setIsChanged] = useState(false) // Track changes
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false) // Modal state
  // Store original values for comparison
  const originalValues = useRef({
    name: name || "",
    brightness: initialBrightness.current,
    color: color || "#ffffff",
    groupID: groupID || null,
  })

  // Populate dropdown
  useEffect(() => {
    const groupDropdown = allGroups.map((group: Group) => ({
      label: group.name,
      value: group.groupID,
    }))
    setDropdownGroups(groupDropdown)

    if (groupID) {
      setSelectedGroup(groupID)
    }
  }, [allGroups, groupID])

  // Determine button state
  useEffect(() => {
    setIsChanged(
      presetName !== originalValues.current.name ||
        brightnessValue !== originalValues.current.brightness ||
        colorHex !== originalValues.current.color ||
        selectedGroup !== originalValues.current.groupID
    )
  }, [presetName, brightnessValue, colorHex, selectedGroup])

  // Open and Close Modal
  const openColorPicker = () => setIsColorPickerVisible(true)
  const closeColorPicker = () => setIsColorPickerVisible(false)

  const onSelectColor = ({ hex }: { hex: string }) => {
    setColorHex(hex)
  }
  const handleSave = () => {
    if (!presetName || !selectedGroup) {
      alert("Please enter a preset name and select a group.")
      return
    }

    console.log("Updating preset:", {
      name: presetName,
      groupID: selectedGroup,
      brightness: brightnessValue,
      color: colorHex,
    })

    router.back()
  }

  const handleApplyPreset = () => {
    console.log("Applying preset to group:", {
      groupID: selectedGroup,
      brightness: brightnessValue,
      color: colorHex,
    })

    const group = allGroups.find(g => g.groupID === selectedGroup)
    if (!group) {
      alert("Group not found.")
      return
    }
    const { r, g, b } = colorKit.RGB(colorHex).object()
    const preset: Preset = {
      type: DeviceType.RGBLight, // This value won't matter — it's only used to infer the config shape
      config: {
        voltage: brightnessValue,
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
                  placeholder="Preset name"
                />
              </View>

              <View style={[styles.card, { zIndex: 500 }]}>
                <Text style={styles.label}>Assigned Group:</Text>
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
                <Text style={styles.label}>Brightness: {brightnessValue}%</Text>
                <Slider
                  style={styles.slider}
                  value={initialBrightness.current}
                  step={1}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#000"
                  onValueChange={setBrightnessValue}
                />
              </View>

              {/* Color Picker */}
              <View style={styles.card}>
                <Text style={styles.label}>Color:</Text>
                <Pressable
                  onPress={openColorPicker}
                  style={[styles.colorDisplay, { backgroundColor: colorHex }]}
                >
                  <Text style={styles.colorDisplayText}>Tap to Change</Text>
                </Pressable>
              </View>

              {/* Save & Apply Buttons */}
              <View style={styles.buttonContainer}>
                {/* <Pressable
                  style={[
                    styles.saveButton,
                    !isChanged && styles.disabledButton,
                  ]}
                  onPress={handleSave}
                  disabled={!isChanged}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </Pressable> */}

                <Pressable
                  style={styles.applyButton}
                  onPress={handleApplyPreset}
                >
                  <Text style={styles.applyButtonText}>Apply Preset</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        {/* Color Picker Modal */}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
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
  applyButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
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
