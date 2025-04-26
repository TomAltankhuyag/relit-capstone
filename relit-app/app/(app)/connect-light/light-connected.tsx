import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ScrollView,
} from "react-native"
import { useRouter } from "expo-router"
import DropDownPicker from "react-native-dropdown-picker"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { selectGroups } from "@/lib/features/groups/groupsSlice"
import Animated, { SlideInRight, FadeOutLeft } from "react-native-reanimated"
import { v4 as uuidv4 } from "uuid"
import {
  addDeviceAction,
  AddDevicePayload,
  setDeviceGroupsAction,
} from "@/lib/features/shared"
import { DeviceType } from "@/graphql/API"
export default function LightConnected() {
  const [lightName, setLightName] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [dropdownGroups, setDropdownGroups] = useState<
    { label: string; value: string }[]
  >([])

  const router = useRouter()
  const dispatch = useAppDispatch()
  const allGroups = useAppSelector(selectGroups)

  useEffect(() => {
    const groupOptions = allGroups.map((group) => ({
      label: group.name,
      value: group.groupID,
    }))
    setDropdownGroups(groupOptions)
  }, [allGroups])
  const onDone = () => {
    const payload: AddDevicePayload = {
      deviceID: uuidv4(),
      name: lightName,
      type: DeviceType.RGBLight,
      hub_id: "hub1",
      config: {
        voltage: 50,
        red: 15,
        green: 100,
        blue: 200,
      },
      defaultGroupID: "GROUPS",
    }

    dispatch(addDeviceAction(payload))
    if (selectGroups.length > 0) {
      dispatch(
        setDeviceGroupsAction({
          deviceID: payload.deviceID,
          groupIDs: selectedGroups,
          defaultGroupID: "GROUPS",
        })
      )
    }

    console.log("Light Saved:", {
      name: lightName,
      groups: selectedGroups,
    })
    router.replace("/(app)/home")
  }
  return (
    <Animated.View entering={SlideInRight.duration(1000)} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.headerText}>
                Your light has been successfully connected!
              </Text>

              {/* Light Name Input */}
              <View style={styles.card}>
                <Text style={styles.label}>Name your Light</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter light name"
                  placeholderTextColor="#aaa"
                  value={lightName}
                  onChangeText={setLightName}
                />
              </View>

              {/* Group Selection */}
              <View style={[styles.card, { zIndex: 500 }]}>
                <Text style={styles.label}>Add to a Group?</Text>
                <DropDownPicker
                  open={open}
                  setOpen={setOpen}
                  value={selectedGroups}
                  setValue={setSelectedGroups}
                  items={dropdownGroups}
                  setItems={setDropdownGroups}
                  multiple={true} // Enable multi-selection
                  mode="BADGE" // Show selected items as badges
                  placeholder="Select groups"
                  badgeColors={["#fff"]}
                  badgeTextStyle={{ color: "#000" }}
                  badgeDotColors={["#000"]}
                  listMode="SCROLLVIEW"
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

              {/* Done Button */}
              <Pressable style={styles.doneButton} onPress={onDone}>
                <Text style={styles.doneButtonText}>Done</Text>
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
    justifyContent: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    width: "100%",
  },
  headerText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    fontWeight: "bold",
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
  },
  doneButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
