import {Config} from "@/devices/devicesTypes";
import {DeviceType} from "@/graphql/API";


// A device group
export interface Group {
  groupID: string
  name: string,
  device_ids: Array<string>,
  // saved configs
  group_configs: Array<GroupConfig>
  group_presets: Array<GroupPreset>
}

// the groups, how they are stored within the app
export interface GroupsState {
  default_id: string,
  groups: Array<Group>,
}

export interface SavedConfig {
  deviceID: string,
  type: DeviceType,
  config: Config
}

// A config saved for the group.
export interface GroupConfig {
  name: string,
  configs: Array<SavedConfig>
  // key = deviceID, value = (config) saved config for the device
}

// Presets are a blanket configurations, unlike a GroupConfig where each device can have a different configuration
// this one saves a single configuration that can be applied to the entire group
export interface GroupPreset {
  name: string,
  preset: Preset
}

export interface Preset {
  type: DeviceType,
  config: Config
}