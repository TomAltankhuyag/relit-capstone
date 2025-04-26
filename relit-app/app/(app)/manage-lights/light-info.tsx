import React, { useRef, useState, useEffect, useDebugValue, useContext } from "react";
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
  Switch
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ColorPicker, { Panel3, colorKit } from "reanimated-color-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeDeviceAction, RemoveDevicePayload, setDeviceGroupsAction } from "@/lib/features/shared";
import { selectGroups } from "@/lib/features/groups/groupsSlice";
import { selectDevices, updateDevice } from "@/lib/features/devices/devicesSlice";
import { Group } from "@/lib/features/groups/groupsTypes";
import { PubSubContext } from "@/components/PubSubProvider";
import Slider from "@react-native-community/slider";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Device } from "@/lib/features/devices/devicesTypes";
import { DeviceType } from "@/graphql/API";

export default function LightInfo() {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const deviceParam = useLocalSearchParams();
  const pubSub = useContext(PubSubContext);
  const allGroups = useAppSelector(selectGroups);
  const allDevices = useAppSelector(selectDevices);

  const device = allDevices.find((d) => d.deviceID === deviceParam.deviceID);
  if (!device) {
    console.error('device not found!')
    router.back()
  }
  let deviceHex
  if (device?.type === DeviceType.WhiteLight) {
    deviceHex = '#ffffff'
  } else {
    deviceHex = colorKit.HEX(`rgba(${device?.config.red}, ${device?.config.green}, ${device?.config.blue}, 1)`)
  }
  const initialHex = useRef(deviceHex);
  const [colorHex, setColorHex] = useState(deviceHex);
  const initialBrightness = useRef<number>(Number(device?.config.voltage));
  const [brightness, setBrightness] = useState(initialBrightness.current);
  const [open, setOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [dropdownGroups, setDropdownGroups] = useState<{ label: string; value: string }[]>([]);
  const [deviceName, setDeviceName] = useState(device?.name);
  const [isChanged, setIsChanged] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isRainbowMode, setIsRainbowMode] = useState(initialHex.current === '#010101' ? true : false);
  const originalValues = useRef({
    name: device?.name || "",
    brightness: initialBrightness.current,
    color: initialHex.current,
    groups: selectedGroups,
  });

  const deviceID = String(device?.deviceID || "");

  useEffect(() => {
    if (!deviceID) {
      console.error("No deviceID provided @light-info.tsx");
      return;
    }

    const allGroupsDropdown = allGroups.map((group: Group) => ({
      label: group.name,
      value: group.groupID,
    }));
    setDropdownGroups(allGroupsDropdown);

    const deviceGroups = allGroups
      .filter((group: Group) => group.device_ids.includes(deviceID))
      .map((group: Group) => group.groupID);

    setSelectedGroups(deviceGroups);
    originalValues.current.groups = deviceGroups;
  }, [deviceID, allGroups]);

  useEffect(() => {
    setIsChanged(
      deviceName !== originalValues.current.name ||
      brightness !== originalValues.current.brightness ||
      colorHex !== originalValues.current.color ||
      JSON.stringify(selectedGroups) !== JSON.stringify(originalValues.current.groups)
    );
  }, [deviceName, brightness, colorHex, selectedGroups, isRainbowMode]);

  const handleSliderValueChange = (value: number) => {
    setBrightness(value);
  };

  const openColorPicker = () => setIsColorPickerVisible(true);
  const closeColorPicker = () => setIsColorPickerVisible(false);

  const openDeleteModal = () => setIsDeleteModalVisible(true);
  const closeDeleteModal = () => setIsDeleteModalVisible(false);

  const onSelectColor = ({ hex }: { hex: string }) => {
    setColorHex(hex);
  };

  const handleDeleteDevice = () => {
    console.log(`Deleting device: ${deviceID}`);
    closeDeleteModal();
    const payload: RemoveDevicePayload = {
      deviceID: deviceID,
      group_ids: originalValues.current.groups
    }
    console.log('removeDeviceAction: ', payload)
    dispatch(removeDeviceAction(payload));
    router.back();
  };
  const updateDeviceInfo = () => {
    const deviceFound = allDevices.find((d) => d.deviceID === deviceID);

    if (!deviceFound) {
      console.error("Device not found");
      return;
    }

    console.log(`found device: ${deviceFound.name}`);

    const hasGroupChanges =
      JSON.stringify(selectedGroups) !==
      JSON.stringify(originalValues.current.groups);

    // Dispatch group updates separately if changed
    if (hasGroupChanges) {
      console.log("group changed");
      dispatch(
        setDeviceGroupsAction({
          deviceID,
          groupIDs: selectedGroups,
          defaultGroupID: "GROUPS",
        })
      );
    }

    const updatedDevice: Device = {
      ...deviceFound,
      name: deviceName,
      config: {
        ...deviceFound.config,
        voltage: brightness,
      },
      // Leave out group_ids — handled by the separate action
    };

    if (
      updatedDevice.type === DeviceType.RGBLight ||
      updatedDevice.type === DeviceType.RGBWLight
    ) {
      console.log("handling RGB update");

      const { r, g, b } = colorKit.RGB(colorHex).object();

      updatedDevice.config.red = r;
      updatedDevice.config.green = g;
      updatedDevice.config.blue = b;

      if ("white" in updatedDevice.config) {
        updatedDevice.config.white = brightness;
      }
    }

    console.log("dispatching updated device:", updatedDevice);
    dispatch(updateDevice({ device: updatedDevice }));

    // also update device info on db (most convienient to do this here instead of handleAWS)
    // send db update using a pub
    const db_update_msg = {
      deviceID,
      config: updatedDevice.config,
      name: updatedDevice.name,
      type: updatedDevice.type,
      hubID: updatedDevice.hub_id,
      // below is a graphql custom field that needs to be sent
      __typename: "Device",
      // need to supply all these fields as the topic overwrites everything for given ID
    };
    try {
      pubSub
        .publish({ topics: ["update/device"], message: db_update_msg })
        .then(() => {
          console.log("Message sent to db");
        });
    } catch (error) {
      console.error("Error publishing message:", error);
    }
  }

  const onRainbowPress = (previousState) => {
    setIsRainbowMode(previousState => !previousState)

    if(colorHex === '#010101') {
      setColorHex(initialHex.current === '#010101' ? '#ff00ff' : initialHex.current)
    } else {
      setColorHex('#010101')
    }
  }
  async function onSavePress() {
    updateDeviceInfo()
    if (deviceID === 'capstone_light_rgb') {
      console.log('capstone light RGB triggered')
      const { h } = colorKit.HSV(colorHex).object()
      const brightnessPub = brightness
      handleAWS(colorHex, brightnessPub, 0)
    } else if (deviceID === 'capstone_light_white') {
      console.log('capstone light White triggered')
      const { h } = colorKit.HSV(colorHex).object()
      const brightnessPub = brightness
      handleAWS(colorHex, brightnessPub, 1)
    }
      router.navigate('/(app)/manage-lights/lights-manager')
  }

  async function handleAWS(hexcode, brightness, toggle_white) {
    console.log(`sending with hex: ${hexcode}, brightness: ${brightness}, toggle_white: ${toggle_white}`);
    const message = {
      "desired": {
        "welcome": "aws-iot",
        "voltage": 15,
        "dimness": 20,
        "id": "1234",
        "hexcode": `${hexcode}`,
        "toggle": `${toggle_white}`,
        "brightness": `${brightness}`,
        "brightness_direction": "-1",
        "rainbow_toggle": `${isRainbowMode ? '1' : '0'}`
      },
    }
    try {
      await pubSub.publish({ topics: ["config/BTHubThing"], message });
      console.log("Message sent!111222");
    } catch (error) {
      console.error("Error publishing message:", error);
    }
  }
  return (
    <Animated.View
      entering={FadeInRight.duration(800)}
      exiting={FadeOutLeft.duration(600)}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <View
            style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
              {/* Device Name */}
              <View style={styles.card}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  value={deviceName}
                  onChangeText={setDeviceName}
                  placeholder="Enter device name"
                  placeholderTextColor="#aaa"
                />
              </View>

              {/* Group Selection */}
              <View style={[styles.card, { zIndex: 500 }]}>
                <Text style={styles.label}>Select Groups:</Text>
                <DropDownPicker
                  open={open}
                  setOpen={setOpen}
                  value={selectedGroups}
                  setValue={setSelectedGroups}
                  items={dropdownGroups}
                  setItems={setDropdownGroups}
                  multiple={true}
                  mode="BADGE"
                  placeholder="Select group(s)"
                  badgeColors={["#fff"]}
                  badgeTextStyle={{ color: "#000" }}
                  badgeDotColors={["#000"]}
                  listMode="SCROLLVIEW"
                  maxHeight={500}
                  style={{
                    backgroundColor: 'black',
                    borderColor: 'white'
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: 'black',
                    borderColor: 'white'
                  }}
                  textStyle={{
                    color: 'white'
                  }}
                  placeholderStyle={{
                    color: 'white'
                  }}
                  arrowIconStyle={{
                    tintColor: 'white'
                  }}
                  tickIconStyle={{
                    tintColor: 'white'
                  }}
                  listItemLabelStyle={{
                    color: 'white'
                  }}
                />
              </View>

              {/* Brightness Slider */}
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
                  onValueChange={handleSliderValueChange}
                />
              </View>

              {/* Color Picker */}
              <View style={styles.card}>
                <Text style={styles.label}>Color:</Text>
                <Pressable disabled={isRainbowMode} onPress={openColorPicker}
                  style={[styles.colorDisplay, { backgroundColor: colorHex }, isRainbowMode && styles.disabledColorPIcker]}
                >
                  <Text style={styles.colorDisplayText}>
                    {isRainbowMode ? 'Rainbow Mode Enabled' : 'Tap To Change'}
                  </Text>
                </Pressable>
                <View style={styles.row}>
                  <Text style={{ color: '#fff' }}>
                    Rainbow Mode:
                  </Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#fff' }}
                    thumbColor={isRainbowMode ? '#fff' : '#f4f3f4'} // thumb is white when ON
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onRainbowPress}
                    value={isRainbowMode}
                  />

                </View>
              </View>

              {/* Buttons */}
              <Pressable onPress={onSavePress} style={[styles.doneButton, !isChanged && styles.disabledButton]} disabled={!isChanged}>
                <Text style={styles.doneButtonText}>Save</Text>
              </Pressable>

              <Pressable style={styles.deleteButton} onPress={openDeleteModal}>
                <Text style={styles.deleteButtonText}>Delete Device</Text>
              </Pressable>
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
              <ColorPicker style={{ width: 250 }} onComplete={onSelectColor} value={colorHex}>
                <Panel3 />
              </ColorPicker>

              {/* Close Button */}
              <Pressable style={styles.closeButton} onPress={closeColorPicker}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal animationType="fade" transparent={true} visible={isDeleteModalVisible} onRequestClose={closeDeleteModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you sure you want to delete this device?</Text>

              <View style={styles.modalButtons}>
                <Pressable style={styles.cancelButton} onPress={closeDeleteModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>

                <Pressable style={styles.confirmDeleteButton} onPress={handleDeleteDevice}>
                  <Text style={styles.confirmDeleteText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </Animated.View>
  );
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
  dropdown: {
    backgroundColor: '#000',
    borderColor: '#fff'
  },
  input: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
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
  doneButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,

    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  doneButtonText: {
    color: '#fff'
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledColorPIcker: {
    backgroundColor: '#000'
  },
  deleteButton: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#000",
    borderColor: '#f00',
    borderWidth: 1,
    shadowColor: "#f00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteButtonText: {
    color: "#f00",
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
    borderColor: '#fff',

    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: '#fff'
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,

    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,

    borderWidth: 1,
    borderColor: '#fff'
  },
  cancelButtonText: {
    color: "#fff",
  },
  confirmDeleteButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f00",
    shadowColor: "#f00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmDeleteText: {
    color: "#f00",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,

    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15, // Adds spacing between buttons
    borderWidth: 1,
    borderColor: '#fff'
  },
  closeButtonText: {
    color: "#fff",
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  }

});
