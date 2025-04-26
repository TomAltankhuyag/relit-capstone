
import React, {useState, useEffect, useContext} from "react";
import { Pressable, Text, View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import Accordion from "react-native-collapsible/Accordion";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { selectGroups } from "@/lib/features/groups/groupsSlice";
import {selectDevices, updateDevice} from "@/lib/features/devices/devicesSlice";
import { Group } from "@/lib/features/groups/groupsTypes";
import { DeviceType } from "@/graphql/API";
import { GroupPreset } from "@/lib/features/groups/groupsTypes";
import {Config, Device} from "@/lib/features/devices/devicesTypes";
import ReanimatedButton from "@/components/ReanimatedButton";
import Animated, { FadeInUp, FadeOutDown, FadeInDown, FadeOutUp } from "react-native-reanimated";
import { colorKit } from "reanimated-color-picker";
import {PubSubContext} from "@/components/PubSubProvider";
interface Section {
  title: string;
  groupID: string;
  presets: GroupPreset[];
  lights: Array<{
    deviceID: string;
    name: string;
    power: number;
    type?: DeviceType;
    config?: Config;
  }>
}

export default function LightsManager() {
  const router = useRouter();
  const [activeSections, setActiveSections] = useState([]);

  const allDevices = useAppSelector((state) => selectDevices(state))
  const groups = useAppSelector((state) => selectGroups(state))

  const pubSub = useContext(PubSubContext);
  const dispatch = useAppDispatch()

  useEffect(() => {
    pubSub.subscribe({ topics: "update/db/device" }).subscribe({
      next: (data) => {
        console.log("Message received", data);

        // data is assumed to have attributes:
        // deviceID, name, type, config, hubID, __typename (won't be using them all)

        // only plan on using deviceID, name, config (for now, can be updated later)

        const deviceID: string = data.deviceID as string;

        // first find device

        const device = allDevices.find(d => d.deviceID === deviceID)

        if (!device) {
          // ignore if device not found, fired from a device that this user doesn't own
          return
        }

        // update device
        const name: string = data.name as string;
        const config: Config = data.config as Config;
        const updatedDevice: Device = {
          ...device,
          name,
          config
        }
        dispatch(updateDevice({ device: updatedDevice }));
      },
      error: (error) => console.log(error),
      complete: () => console.log("Unsubscribed to update/db/device (unexpected occurance)"),
    });
  }, [pubSub]);
  // creating sections
  const SECTIONS: Section[] = groups.map((group: Group) => ({
    title: group.name,
    groupID: group.groupID,
    presets: group.group_presets || [], // Ensure presets are included
    lights: group.device_ids
      .map((deviceID) => {
        const device = allDevices.find((d) => d.deviceID === deviceID);
        return device
          ? {
            deviceID: device.deviceID,
            name: device.name,
            power: device.config?.voltage ?? 0, // Ensure power is properly set
            type: device.type,
            config: device.config,
          }
          : null;
      })
      .filter(Boolean) as Section["lights"],
  }))

  // Ungrouped sections
  const groupedDeviceIDs = new Set(groups.flatMap((group) => group.device_ids));
  const ungroupedDevices = allDevices.filter((device) => !groupedDeviceIDs.has(device.deviceID));

  if (ungroupedDevices.length > 0) {
    SECTIONS.push({
      title: "Ungrouped",
      groupID: "ungrouped",
      presets: [],
      lights: ungroupedDevices.map((device) => ({
        deviceID: device.deviceID,
        name: device.name,
        power: device.config?.voltage ?? 0,
        type: device.type,
        config: device.config,
      })),
    })
  }

  useEffect(() => {
    setActiveSections(SECTIONS.map((_, index) => index));
  }, [])

  const _renderHeader = (section, _, isActive) => {
    return (
      <Animated.View
        entering={FadeInDown.duration(800)}
        exiting={FadeOutDown.duration(600)}
        style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>{section.title}</Text>
          <AntDesign
            name={isActive ? "upcircleo" : "downcircleo"}
            size={24}
            color="#fff"
            style={styles.arrowIcon}
          />
        </View>
      </Animated.View>
    )
  }


  const _renderContent = (section: Section) => {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.lightList}>
          {section.lights.map((light, index) => (
            <Pressable
              key={index}
              style={styles.lightButton}
              onPress={() => {
                router.navigate({
                  pathname: "/(app)/manage-lights/light-info",
                  params: {
                    deviceID: light.deviceID,
                    name: light.name,
                    power: light.power.toString(),
                  },
                })
              }}
            >
              <View style={styles.lightButtonContent}>
                <Text style={styles.lightButtonText}>{light.name}</Text>
                <Text style={styles.lightPowerText}>{light.power}%</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Presets */}
        {section.presets.length > 0 && (
          <View style={styles.presetsContainer}>
            {section.presets.map((preset, index) => (
              <Pressable
                key={index}
                style={styles.presetButton}
                onPress={() => {
                  let hex
                  if(preset.preset.type === DeviceType.WhiteLight) {
                    hex = '#ffffff'
                  } else {
                    hex = colorKit.HEX(`rgba(${preset.preset.config.red},
                      ${preset.preset.config.green},
                      ${preset.preset.config.blue}, 1)`)
                  }
                  router.push({
                    pathname: "/(app)/manage-lights/preset-info",
                    params: {
                      name: preset.name,
                      groupID: section.groupID,
                      color: hex, // some logic to convert to hex from config based on type
                      brightness: preset.preset.config.voltage,
                    },
                  })
                }}
              >
                <Text style={styles.presetButtonText}>{preset.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {section.groupID !== "ungrouped" && (
          <View style={styles.groupActions}>
            <Pressable
              style={styles.addButton}
              onPress={() => {
                router.push({
                  pathname: "/(app)/manage-lights/new-preset",
                  params: { groupID: section.groupID },
                })
              }}
            >
              {/* <Text style={styles.addButtonText}>Add Preset</Text> */}
              <MaterialIcons name="add-to-photos" size={20} color="white" />
            </Pressable>

            <Pressable
              style={styles.setAllButton}
              onPress={() => {
                router.push({
                  pathname: "/(app)/manage-lights/set-all",
                  params: { groupID: section.groupID },
                })
              }}
            >
              {/* <Text style={styles.setAllButtonText}>Set All</Text> */}
              <MaterialCommunityIcons name="checkbox-multiple-outline" size={20} color="white" />
            </Pressable>

            <Pressable
              style={styles.viewGroupButton}
              onPress={() => {
                router.push({
                  pathname: "/(app)/manage-lights/group-info",
                  params: { groupID: section.groupID, title: section.title },
                })
              }}
            >
              {/* <Text style={styles.viewGroupButtonText}>Edit Group</Text> */}
              <FontAwesome name="cogs" size={20} color="white" />
            </Pressable>
          </View>
        )}
      </View>
    );
  };



  return (
    <Animated.ScrollView
      entering={FadeInUp.duration(1000)}
      exiting={FadeOutUp.duration(600)}
      style={styles.container}>
      <Accordion
        activeSections={activeSections}
        sections={SECTIONS}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={setActiveSections}
        expandMultiple={true}
      />

      {/* Add Group Button */}
      <ReanimatedButton
        style={styles.addGroupButton}
        textStyle={styles.addGroupButtonText}
        label="Add Group"
        onPress={() => {
          router.push("/(app)/manage-lights/new-group");
        }}
      />
    </Animated.ScrollView>
  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerContainer: {
    backgroundColor: "#000", // Dark theme similar to buttons
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 15, // Added padding to match previous height
    paddingHorizontal: 15, // Ensure proper spacing
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15, // Add horizontal padding to center the title and adjust arrow
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
  arrowIcon: {
    marginLeft: -10, // Move arrow slightly to the left
  },
  contentContainer: {
    padding: 10,
  },
  lightList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  lightButton: {
    backgroundColor: "#000",
    borderColor: '#fff',
    borderWidth: 1,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center", // Ensures center alignment
    flexDirection: "column", // Ensures stacking of name and power text
  },

  lightButtonContent: {
    width: "100%", // Ensures it spans full width
    alignItems: "center", // Keeps text centered
    justifyContent: "space-between", // Pushes name and power apart
  },

  lightButtonText: {
    color: "#fff",

  },
  lightPowerText: {
    color: "#bbb",
    marginTop: "auto", // Ensures it moves to the bottom
  },
  addButtonText: {
    color: '#fff'
  },
  setAllButtonText: {
    color: '#fff'
  },
  presetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  presetButton: {
    backgroundColor: "#000",
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    margin: 5,
    minWidth: 80,
    alignItems: "center",
  },
  presetButtonText: {
    color: "#fff",

  },
  groupActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#000",
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  setAllButton: {
    backgroundColor: "#000",
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  viewGroupButton: {
    backgroundColor: "#000",
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },

  viewGroupButtonText: {
    color: "#fff",
    fontSize: 14,
  },

  addGroupButton: {
    backgroundColor: "#000",
    borderColor: '#fff',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },

  addGroupButtonText: {
    color: "#fff",
    fontSize: 16,

  },

})