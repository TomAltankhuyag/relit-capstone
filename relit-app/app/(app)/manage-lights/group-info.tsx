import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ScrollView
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectGroups, rename } from "@/lib/features/groups/groupsSlice";
import { setGroupDevicesAction } from "@/lib/features/shared";
import { selectDevices } from "@/lib/features/devices/devicesSlice";
import { Group } from "@/lib/features/groups/groupsTypes";
import { Device } from "@/lib/features/devices/devicesTypes";
import { removeGroupAction, RemoveGroupPayload } from "@/lib/features/shared";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

export default function GroupInfo() {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { groupID } = useLocalSearchParams();
  const allGroups = useAppSelector(selectGroups);
  const allDevices = useAppSelector(selectDevices);

  const [group, setGroup] = useState<Group | null>(null);
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false);
  const [groupDevices, setGroupDevices] = useState<string[]>([]);
  const [dropdownDevices, setDropdownDevices] = useState<{ label: string; value: string }[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Store original values
  const originalValues = useRef({
    name: "",
    devices: [] as string[],
  });

  useEffect(() => {
    const foundGroup = allGroups.find((g) => g.groupID === groupID);
    if (!foundGroup) {
      console.error(`Group not found: ${groupID}`);
      return;
    }
    setGroup(foundGroup);
    setGroupName(foundGroup.name);
    setGroupDevices(foundGroup.device_ids);

    originalValues.current = {
      name: foundGroup.name,
      devices: [...foundGroup.device_ids],
    };

    // Populate dropdown with all devices
    const deviceOptions = allDevices.map((device: Device) => ({
      label: device.name,
      value: device.deviceID,
    }));
    setDropdownDevices(deviceOptions);
  }, [groupID, allGroups, allDevices]);

  // Track Changes
  useEffect(() => {
    const hasNameChanged = groupName.trim() !== originalValues.current.name.trim();
    const hasDevicesChanged =
      groupDevices.length !== originalValues.current.devices.length ||
      groupDevices.some((device) => !originalValues.current.devices.includes(device));

    setIsChanged(hasNameChanged || hasDevicesChanged);
  }, [groupName, groupDevices]);

  const handleSaveChanges = () => {
    if (!groupName.trim()) {
      alert("Group name cannot be empty.");
      return;
    }

    console.log("Updating Group:", {
      groupID,
      name: groupName,
      devices: groupDevices,
    });

    const hasNameChanged = groupName.trim() !== originalValues.current.name.trim();
    if (hasNameChanged) {
      dispatch(rename({id: groupID, new_name: groupName}))
    }

    const hasDevicesChanged =
      groupDevices.length !== originalValues.current.devices.length ||
      groupDevices.some((device) => !originalValues.current.devices.includes(device));
    if (hasDevicesChanged) {
      dispatch(setGroupDevicesAction({
        groupID,
        deviceIDs: groupDevices,
        defaultGroupID: 'GROUPS'
      }))
    }

    router.back();
  };

  const handleConfirmDelete = () => {
    console.log(`Group ${groupID} deleted`);
    setModalVisible(false);
    dispatch(removeGroupAction(groupID))
    router.back();
  };

  return (
    <Animated.View
              entering={FadeInRight.duration(800)}
              exiting={FadeOutLeft.duration(600)}
              style={{ flex: 1 }}
            >

    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {group ? (
              <>
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

                <View style={[styles.card, { zIndex: 1000 }]}>
                  <Text style={styles.label}>Manage Devices:</Text>
                  <DropDownPicker
                    open={open}
                    setOpen={setOpen}
                    value={groupDevices}
                    setValue={setGroupDevices}
                    items={dropdownDevices}
                    setItems={setDropdownDevices}
                    multiple={true}
                    mode="BADGE"
                    placeholder="Select devices"
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

                <Pressable
                  style={[styles.saveButton, !isChanged && styles.disabledButton]}
                  onPress={handleSaveChanges}
                  disabled={!isChanged}
                  >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </Pressable>

                <Pressable style={styles.deleteButton} onPress={() => setModalVisible(true)}>
                  <Text style={styles.saveButtonText}>Delete Group</Text>
                </Pressable>
              </>
            ) : (
              <Text style={styles.errorText}>Group not found.</Text>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>

      {/* Modal for Delete Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this group?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.confirmDeleteButton} onPress={handleConfirmDelete}>
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
  deleteButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#f00",
    shadowColor: "#f00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#444",
    borderColor: "#888",
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
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  modalText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
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
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  confirmDeleteText: {
    color: "#f00",
    fontWeight: "bold",
  },
});
