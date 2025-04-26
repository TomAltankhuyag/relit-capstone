import React, { useState, useEffect } from "react"
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
} from "react-native"
import { useRouter } from "expo-router"
import DropDownPicker from "react-native-dropdown-picker"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { selectDevices } from "@/lib/features/devices/devicesSlice"
import { Device } from "@/lib/features/devices/devicesTypes"
import { addGroupAction, AddGroupPayload } from "@/lib/features/shared"
import { v4 as uuidv4 } from "uuid"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"

export default function NewGroup() {
  const router = useRouter()
  const allDevices = useAppSelector(selectDevices)
  const dispatch = useAppDispatch()
  const [groupName, setGroupName] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedDevices, setSelectedDevices] = useState<string[]>([])
  const [dropdownDevices, setDropdownDevices] = useState<
    { label: string; value: string }[]
  >([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  // Populate dropdown with user devices
  useEffect(() => {
    const deviceOptions = allDevices.map((device: Device) => ({
      label: device.name,
      value: device.deviceID,
    }))
    setDropdownDevices(deviceOptions)
  }, [allDevices])

  useEffect(() => {
    setIsButtonDisabled(!groupName.trim())
  }, [groupName])

  // Handle Save Group
  const handleSaveGroup = () => {
    console.log("Creating Group:", {
      name: groupName,
      devices: selectedDevices,
    })
    const newGroup: AddGroupPayload = {
      groupID: uuidv4(),
      name: groupName,
      device_ids: selectedDevices,
      group_configs: [],
      group_presets: [],
    }
    console.log("Creating Group:", newGroup)
    dispatch(addGroupAction(newGroup))
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
                <Text style={styles.label}>Group Name:</Text>
                <TextInput
                  style={styles.input}
                  value={groupName}
                  onChangeText={setGroupName}
                  placeholder="Enter group name"
                  placeholderTextColor="#aaa"
                />
              </View>

              <View style={[styles.card, { zIndex: 500 }]}>
                <Text style={styles.label}>Select Devices:</Text>
                <DropDownPicker
                  open={open}
                  setOpen={setOpen}
                  value={selectedDevices}
                  setValue={setSelectedDevices}
                  items={dropdownDevices}
                  setItems={setDropdownDevices}
                  multiple={true}
                  mode="BADGE" // Show selected items as badges
                  placeholder="Select devices"
                  badgeColors={["#fff"]}
                  badgeTextStyle={{ color: "#000" }}
                  badgeDotColors={["#000"]}
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

              <Pressable
                style={[
                  styles.saveButton,
                  isButtonDisabled && styles.disabledButton,
                ]}
                onPress={handleSaveGroup}
                disabled={isButtonDisabled}
              >
                <Text style={styles.saveButtonText}>Save Group</Text>
              </Pressable>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
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
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    fontSize: 14,
    width: "100%",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
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
  disabledButton: {
    backgroundColor: "#555", // Slightly lighter gray for disabled
    borderColor: "#888",
    borderWidth: 1,
  },
})
