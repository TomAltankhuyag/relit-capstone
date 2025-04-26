import {createAction} from "@reduxjs/toolkit";
import {Config, RGBLightConfig, RGBWLightConfig, WhiteLightConfig} from "@/devices/devicesTypes"
import {Group, Preset} from "@/groups/groupsTypes"
import * as APIType from "@/graphql/API";
import {DeviceType, getAllUserDataQuery} from "@/graphql/API";

// dispatches shared between features

// dispatch for init for user data after a successful login.
// shared between user, groups and devices
const INIT = "init"
// this type, we assume we get from db query
// which means we get arrays, even though on our store has sets
// e.g. group_ids, device_ids
export type InitUserPayload = {
  userID: string,
  email: string,
  password: string,
  username: string,
  group_ids: string[],
  device_ids: string[],
  defaultGroupID: string
}
export type InitDevicePayload = {
  deviceID: string,
  name: string,
  type: DeviceType,
  hub_id: string,
  config: Config,
  group_ids: string[]
}
export type InitGroupPayload = {
  groupID: string,
  name: string,
  device_ids: string[],
  groupConfigs: Array<{name: string, configs: Array<{deviceID: string, config: Config}> }>,
}
export type InitPayload = {
  userID: string,
  data: getAllUserDataQuery
}
export const initAction = createAction<InitPayload>(INIT)


export const setDeviceGroupsAction = createAction<{
  deviceID: string
  groupIDs: string[]
  defaultGroupID: string
}>('shared/setDeviceGroups')

export const applyPresetToDevicesAction = createAction<{
  preset: Preset
  deviceIDs: string[]
}>('shared/applyPresetToDevices')


export const setGroupDevicesAction = createAction<{
  groupID: string
  deviceIDs: string[]
  defaultGroupID: string
}>('shared/setGroupDevices')

// dispatch for adding a new group.
// shared between user and groups
const ADD_GROUP = "add_group"
export type AddGroupPayload = Group
export const addGroupAction = createAction<AddGroupPayload>(ADD_GROUP)

// dispatch for removing an existing group.
// shared between user and groups
const REMOVE_GROUP = "remove_group"
export type RemoveGroupPayload = string
export const removeGroupAction = createAction<RemoveGroupPayload>(REMOVE_GROUP)

// dispatch for adding a new device.
// shared between user, groups and devices
const ADD_DEVICE = "add_device"
export type AddDevicePayload = {
  deviceID: string
  name: string,
  type: DeviceType,
  hub_id: string,
  config: Config,
  // prob have some default/starting config

  defaultGroupID: string
  // provide by accessing groups state
}
export const addDeviceAction = createAction<AddDevicePayload>(ADD_DEVICE)

// dispatch for removing an existing device.
// shared between user, groups and devices
const REMOVE_DEVICE = "remove_device"
export type RemoveDevicePayload = {
  deviceID: string
  group_ids: string[]
}
export const removeDeviceAction = createAction<RemoveDevicePayload>(REMOVE_DEVICE)

// dispatch for adding a device to a group.
// shared between groups and devices
const ADD_DEVICE_TO_GROUP = "add_device_to_group"
export type AddDeviceToGroupPayload = {
  deviceID: string,
  groupID: string,
  defaultGroupID: string
  // provide by accessing groups state (needed by devices state)
}
export const addDeviceToGroupAction = createAction<AddDeviceToGroupPayload>(ADD_DEVICE_TO_GROUP)


// dispatch for removing a device from a group.
// shared between groups and devices
const REMOVE_DEVICE_FROM_GROUP = "remove_device_from_group"
export type RemoveDeviceFromGroupPayload = {
  deviceID: string,
  groupID: string,
  num_groups_device_in: number
  // provide by accessing devices state (needed by groups state)

  defaultGroupID: string
  // provide by accessing groups state (needed by devices state)
}
export const removeDeviceFromGroupAction = createAction<RemoveDeviceFromGroupPayload>(REMOVE_DEVICE_FROM_GROUP)

// dispatch for creating a new user
// shared between user and groups
const CREATE_USER = "create_user"
export type CreateUserPayload = {
  userID: string,
  email: string,
  password: string,
  username: string,
  defaultGroupID: string,
}
export const createUserAction = createAction<CreateUserPayload>(CREATE_USER)

// dispatch for removing an existing user
// shared between user, groups and devices
export const REMOVE_USER = "remove_user"
// no payload type needed for this as simply use state data to remove all needed info
export const removeUserAction = createAction<void>(REMOVE_USER)



// use type ConfigInput from API (instead of Config which is queried) as both are basically same type
// except ConfigInput doesn't have unnecessary __typename field. This type also accomplishes goal of
// type updating with graphql updates
export function queryConfigToAppConfig(type: DeviceType, config: APIType.ConfigInput): Config {
  switch (type) {
    case DeviceType.WhiteLight.toString():
      return {
        voltage: config.voltage ? config.voltage : 0
      } as WhiteLightConfig

    case DeviceType.RGBLight.toString():
      return {
        voltage: config.voltage ? config.voltage : 0,
        red: config.red ? config.red : 0,
        green: config.green ? config.green : 0,
        blue: config.blue ? config.blue : 0,
      } as RGBLightConfig

    case DeviceType.RGBWLight.toString():
      return {
        voltage: config.voltage ? config.voltage : 0,
        red: config.red ? config.red : 0,
        green: config.green ? config.green : 0,
        blue: config.blue ? config.blue : 0,
        white: config.white ? config.white : false,
      } as RGBWLightConfig

    default:
      // unexpected type
      throw new TypeError(`Unknown device type: ${type}`)
  }
}