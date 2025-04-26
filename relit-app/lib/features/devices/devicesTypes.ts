import {DeviceType} from "@/graphql/API";

export interface WhiteLightConfig {
  voltage: number
}

export interface RGBLightConfig {
  voltage: number
  red: number
  green: number
  blue: number
}

export interface RGBWLightConfig {
  voltage: number
  red: number
  green: number
  blue: number
  white: boolean
}

export type Config = WhiteLightConfig | RGBLightConfig | RGBWLightConfig

export interface Device {
  deviceID: string
  name: string
  hub_id: string
  type: DeviceType
  config: Config
  group_ids: Array<string>
}

export interface DevicesState {
  // devices: Map<string, Device>, key is Device.deviceID
  devices: Array<Device>
}