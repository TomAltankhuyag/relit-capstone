/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  userID: string,
  email: string,
  username: string,
  password: string,
  salt: string,
  groups?: ModelGroupConnection | null,
  devices?: ModelUserDevicesConnection | null,
  defaultGroupID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelGroupConnection = {
  __typename: "ModelGroupConnection",
  items:  Array<Group | null >,
  nextToken?: string | null,
};

export type Group = {
  __typename: "Group",
  groupID: string,
  name: string,
  devices?: ModelGroupDevicesConnection | null,
  userID: string,
  groupConfigs?: ModelGroupConfigConnection | null,
  groupPresets?: ModelGroupPresetConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelGroupDevicesConnection = {
  __typename: "ModelGroupDevicesConnection",
  items:  Array<GroupDevices | null >,
  nextToken?: string | null,
};

export type GroupDevices = {
  __typename: "GroupDevices",
  id: string,
  groupGroupID: string,
  deviceDeviceID: string,
  group: Group,
  device: Device,
  createdAt: string,
  updatedAt: string,
};

export type Device = {
  __typename: "Device",
  deviceID: string,
  hubID: string,
  name: string,
  type: DeviceType,
  users?: ModelUserDevicesConnection | null,
  config: Config,
  groups?: ModelGroupDevicesConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum DeviceType {
  WhiteLight = "WhiteLight",
  RGBLight = "RGBLight",
  RGBWLight = "RGBWLight",
}


export type ModelUserDevicesConnection = {
  __typename: "ModelUserDevicesConnection",
  items:  Array<UserDevices | null >,
  nextToken?: string | null,
};

export type UserDevices = {
  __typename: "UserDevices",
  id: string,
  userUserID: string,
  deviceDeviceID: string,
  user: User,
  device: Device,
  createdAt: string,
  updatedAt: string,
};

export type Config = {
  __typename: "Config",
  voltage?: number | null,
  red?: number | null,
  green?: number | null,
  blue?: number | null,
  white?: boolean | null,
};

export type ModelGroupConfigConnection = {
  __typename: "ModelGroupConfigConnection",
  items:  Array<GroupConfig | null >,
  nextToken?: string | null,
};

export type GroupConfig = {
  __typename: "GroupConfig",
  name: string,
  configs:  Array<SavedConfig >,
  id: string,
  createdAt: string,
  updatedAt: string,
  groupGroupConfigsGroupID: string,
};

export type SavedConfig = {
  __typename: "SavedConfig",
  deviceID: string,
  type: DeviceType,
  config: Config,
};

export type ModelGroupPresetConnection = {
  __typename: "ModelGroupPresetConnection",
  items:  Array<GroupPreset | null >,
  nextToken?: string | null,
};

export type GroupPreset = {
  __typename: "GroupPreset",
  name: string,
  preset: SavedPreset,
  id: string,
  createdAt: string,
  updatedAt: string,
  groupGroupPresetsGroupID: string,
};

export type SavedPreset = {
  __typename: "SavedPreset",
  type: DeviceType,
  config: Config,
};

export type CreateUserInput = {
  userID: string,
  email: string,
  username: string,
  password: string,
  salt: string,
  defaultGroupID: string,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  password?: ModelStringInput | null,
  salt?: ModelStringInput | null,
  defaultGroupID?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateUserInput = {
  userID: string,
  email?: string | null,
  username?: string | null,
  password?: string | null,
  salt?: string | null,
  defaultGroupID?: string | null,
};

export type DeleteUserInput = {
  userID: string,
};

export type CreateGroupInput = {
  groupID: string,
  name: string,
  userID: string,
};

export type ModelGroupConditionInput = {
  name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelGroupConditionInput | null > | null,
  or?: Array< ModelGroupConditionInput | null > | null,
  not?: ModelGroupConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateGroupInput = {
  groupID: string,
  name?: string | null,
  userID?: string | null,
};

export type DeleteGroupInput = {
  groupID: string,
};

export type CreateGroupPresetInput = {
  name: string,
  preset: SavedPresetInput,
  id?: string | null,
  groupGroupPresetsGroupID: string,
};

export type SavedPresetInput = {
  type: DeviceType,
  config: ConfigInput,
};

export type ConfigInput = {
  voltage?: number | null,
  red?: number | null,
  green?: number | null,
  blue?: number | null,
  white?: boolean | null,
};

export type ModelGroupPresetConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelGroupPresetConditionInput | null > | null,
  or?: Array< ModelGroupPresetConditionInput | null > | null,
  not?: ModelGroupPresetConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  groupGroupPresetsGroupID?: ModelIDInput | null,
};

export type UpdateGroupPresetInput = {
  name?: string | null,
  preset?: SavedPresetInput | null,
  id: string,
  groupGroupPresetsGroupID?: string | null,
};

export type DeleteGroupPresetInput = {
  id: string,
};

export type CreateGroupConfigInput = {
  name: string,
  configs: Array< SavedConfigInput >,
  id?: string | null,
  groupGroupConfigsGroupID: string,
};

export type SavedConfigInput = {
  deviceID: string,
  type: DeviceType,
  config: ConfigInput,
};

export type ModelGroupConfigConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelGroupConfigConditionInput | null > | null,
  or?: Array< ModelGroupConfigConditionInput | null > | null,
  not?: ModelGroupConfigConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  groupGroupConfigsGroupID?: ModelIDInput | null,
};

export type UpdateGroupConfigInput = {
  name?: string | null,
  configs?: Array< SavedConfigInput > | null,
  id: string,
  groupGroupConfigsGroupID?: string | null,
};

export type DeleteGroupConfigInput = {
  id: string,
};

export type CreateDeviceInput = {
  deviceID: string,
  hubID: string,
  name: string,
  type: DeviceType,
  config: ConfigInput,
};

export type ModelDeviceConditionInput = {
  hubID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelDeviceTypeInput | null,
  and?: Array< ModelDeviceConditionInput | null > | null,
  or?: Array< ModelDeviceConditionInput | null > | null,
  not?: ModelDeviceConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelDeviceTypeInput = {
  eq?: DeviceType | null,
  ne?: DeviceType | null,
};

export type UpdateDeviceInput = {
  deviceID: string,
  hubID?: string | null,
  name?: string | null,
  type?: DeviceType | null,
  config?: ConfigInput | null,
};

export type DeleteDeviceInput = {
  deviceID: string,
};

export type CreateUserDevicesInput = {
  id?: string | null,
  userUserID: string,
  deviceDeviceID: string,
};

export type ModelUserDevicesConditionInput = {
  userUserID?: ModelIDInput | null,
  deviceDeviceID?: ModelIDInput | null,
  and?: Array< ModelUserDevicesConditionInput | null > | null,
  or?: Array< ModelUserDevicesConditionInput | null > | null,
  not?: ModelUserDevicesConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateUserDevicesInput = {
  id: string,
  userUserID?: string | null,
  deviceDeviceID?: string | null,
};

export type DeleteUserDevicesInput = {
  id: string,
};

export type CreateGroupDevicesInput = {
  id?: string | null,
  groupGroupID: string,
  deviceDeviceID: string,
};

export type ModelGroupDevicesConditionInput = {
  groupGroupID?: ModelIDInput | null,
  deviceDeviceID?: ModelIDInput | null,
  and?: Array< ModelGroupDevicesConditionInput | null > | null,
  or?: Array< ModelGroupDevicesConditionInput | null > | null,
  not?: ModelGroupDevicesConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateGroupDevicesInput = {
  id: string,
  groupGroupID?: string | null,
  deviceDeviceID?: string | null,
};

export type DeleteGroupDevicesInput = {
  id: string,
};

export type ModelUserFilterInput = {
  userID?: ModelIDInput | null,
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  password?: ModelStringInput | null,
  salt?: ModelStringInput | null,
  defaultGroupID?: ModelIDInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelGroupFilterInput = {
  groupID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGroupFilterInput | null > | null,
  or?: Array< ModelGroupFilterInput | null > | null,
  not?: ModelGroupFilterInput | null,
};

export type ModelGroupPresetFilterInput = {
  name?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGroupPresetFilterInput | null > | null,
  or?: Array< ModelGroupPresetFilterInput | null > | null,
  not?: ModelGroupPresetFilterInput | null,
  groupGroupPresetsGroupID?: ModelIDInput | null,
};

export type ModelGroupConfigFilterInput = {
  name?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGroupConfigFilterInput | null > | null,
  or?: Array< ModelGroupConfigFilterInput | null > | null,
  not?: ModelGroupConfigFilterInput | null,
  groupGroupConfigsGroupID?: ModelIDInput | null,
};

export type ModelDeviceFilterInput = {
  deviceID?: ModelIDInput | null,
  hubID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelDeviceTypeInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDeviceFilterInput | null > | null,
  or?: Array< ModelDeviceFilterInput | null > | null,
  not?: ModelDeviceFilterInput | null,
};

export type ModelDeviceConnection = {
  __typename: "ModelDeviceConnection",
  items:  Array<Device | null >,
  nextToken?: string | null,
};

export type ModelUserDevicesFilterInput = {
  id?: ModelIDInput | null,
  userUserID?: ModelIDInput | null,
  deviceDeviceID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserDevicesFilterInput | null > | null,
  or?: Array< ModelUserDevicesFilterInput | null > | null,
  not?: ModelUserDevicesFilterInput | null,
};

export type ModelGroupDevicesFilterInput = {
  id?: ModelIDInput | null,
  groupGroupID?: ModelIDInput | null,
  deviceDeviceID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGroupDevicesFilterInput | null > | null,
  or?: Array< ModelGroupDevicesFilterInput | null > | null,
  not?: ModelGroupDevicesFilterInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  userID?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
  password?: ModelSubscriptionStringInput | null,
  salt?: ModelSubscriptionStringInput | null,
  defaultGroupID?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionGroupFilterInput = {
  groupID?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionGroupFilterInput | null > | null,
  groupGroupConfigsGroupID?: ModelSubscriptionIDInput | null,
  groupGroupPresetsGroupID?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionGroupPresetFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGroupPresetFilterInput | null > | null,
  or?: Array< ModelSubscriptionGroupPresetFilterInput | null > | null,
};

export type ModelSubscriptionGroupConfigFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGroupConfigFilterInput | null > | null,
  or?: Array< ModelSubscriptionGroupConfigFilterInput | null > | null,
};

export type ModelSubscriptionDeviceFilterInput = {
  deviceID?: ModelSubscriptionIDInput | null,
  hubID?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionDeviceFilterInput | null > | null,
  or?: Array< ModelSubscriptionDeviceFilterInput | null > | null,
};

export type ModelSubscriptionUserDevicesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userUserID?: ModelSubscriptionIDInput | null,
  deviceDeviceID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserDevicesFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserDevicesFilterInput | null > | null,
};

export type ModelSubscriptionGroupDevicesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  groupGroupID?: ModelSubscriptionIDInput | null,
  deviceDeviceID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGroupDevicesFilterInput | null > | null,
  or?: Array< ModelSubscriptionGroupDevicesFilterInput | null > | null,
};

export type getAllUserDataQueryVariables = {
  userID: string,
};

export type getAllUserDataQuery = {
  getUser?:  {
    username: string,
    email: string,
    defaultGroupID: string,
    devices?:  {
      items:  Array< {
        device:  {
          deviceID: string,
        },
      } | null >,
    } | null,
    groups?:  {
      items:  Array< {
        groupID: string,
      } | null >,
    } | null,
  } | null,
  userDevicesByUserUserID?:  {
    items:  Array< {
      device:  {
        deviceID: string,
        hubID: string,
        name: string,
        type: DeviceType,
        config:  {
          voltage?: number | null,
          red?: number | null,
          green?: number | null,
          blue?: number | null,
          white?: boolean | null,
        },
        groups?:  {
          items:  Array< {
            groupGroupID: string,
          } | null >,
        } | null,
      },
    } | null >,
  } | null,
  groupsByUserID?:  {
    items:  Array< {
      groupID: string,
      name: string,
      groupConfigs?:  {
        items:  Array< {
          name: string,
          configs:  Array< {
            deviceID: string,
            type: DeviceType,
            config:  {
              voltage?: number | null,
              red?: number | null,
              green?: number | null,
              blue?: number | null,
              white?: boolean | null,
            },
          } >,
        } | null >,
      } | null,
      groupPresets?:  {
        items:  Array< {
          name: string,
          preset:  {
            type: DeviceType,
            config:  {
              voltage?: number | null,
              red?: number | null,
              green?: number | null,
              blue?: number | null,
              white?: boolean | null,
            },
          },
        } | null >,
      } | null,
      devices?:  {
        items:  Array< {
          deviceDeviceID: string,
        } | null >,
      } | null,
    } | null >,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    userID: string,
    email: string,
    username: string,
    password: string,
    salt: string,
    groups?:  {
      __typename: "ModelGroupConnection",
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    defaultGroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    userID: string,
    email: string,
    username: string,
    password: string,
    salt: string,
    groups?:  {
      __typename: "ModelGroupConnection",
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    defaultGroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    userID: string,
    email: string,
    username: string,
    password: string,
    salt: string,
    groups?:  {
      __typename: "ModelGroupConnection",
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    defaultGroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type CreateGroupMutation = {
  createGroup?:  {
    __typename: "Group",
    groupID: string,
    name: string,
    devices?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    groupConfigs?:  {
      __typename: "ModelGroupConfigConnection",
      nextToken?: string | null,
    } | null,
    groupPresets?:  {
      __typename: "ModelGroupPresetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGroupMutationVariables = {
  input: UpdateGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type UpdateGroupMutation = {
  updateGroup?:  {
    __typename: "Group",
    groupID: string,
    name: string,
    devices?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    groupConfigs?:  {
      __typename: "ModelGroupConfigConnection",
      nextToken?: string | null,
    } | null,
    groupPresets?:  {
      __typename: "ModelGroupPresetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGroupMutationVariables = {
  input: DeleteGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type DeleteGroupMutation = {
  deleteGroup?:  {
    __typename: "Group",
    groupID: string,
    name: string,
    devices?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    groupConfigs?:  {
      __typename: "ModelGroupConfigConnection",
      nextToken?: string | null,
    } | null,
    groupPresets?:  {
      __typename: "ModelGroupPresetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGroupPresetMutationVariables = {
  input: CreateGroupPresetInput,
  condition?: ModelGroupPresetConditionInput | null,
};

export type CreateGroupPresetMutation = {
  createGroupPreset?:  {
    __typename: "GroupPreset",
    name: string,
    preset:  {
      __typename: "SavedPreset",
      type: DeviceType,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupPresetsGroupID: string,
  } | null,
};

export type UpdateGroupPresetMutationVariables = {
  input: UpdateGroupPresetInput,
  condition?: ModelGroupPresetConditionInput | null,
};

export type UpdateGroupPresetMutation = {
  updateGroupPreset?:  {
    __typename: "GroupPreset",
    name: string,
    preset:  {
      __typename: "SavedPreset",
      type: DeviceType,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupPresetsGroupID: string,
  } | null,
};

export type DeleteGroupPresetMutationVariables = {
  input: DeleteGroupPresetInput,
  condition?: ModelGroupPresetConditionInput | null,
};

export type DeleteGroupPresetMutation = {
  deleteGroupPreset?:  {
    __typename: "GroupPreset",
    name: string,
    preset:  {
      __typename: "SavedPreset",
      type: DeviceType,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupPresetsGroupID: string,
  } | null,
};

export type CreateGroupConfigMutationVariables = {
  input: CreateGroupConfigInput,
  condition?: ModelGroupConfigConditionInput | null,
};

export type CreateGroupConfigMutation = {
  createGroupConfig?:  {
    __typename: "GroupConfig",
    name: string,
    configs:  Array< {
      __typename: "SavedConfig",
      deviceID: string,
      type: DeviceType,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupConfigsGroupID: string,
  } | null,
};

export type UpdateGroupConfigMutationVariables = {
  input: UpdateGroupConfigInput,
  condition?: ModelGroupConfigConditionInput | null,
};

export type UpdateGroupConfigMutation = {
  updateGroupConfig?:  {
    __typename: "GroupConfig",
    name: string,
    configs:  Array< {
      __typename: "SavedConfig",
      deviceID: string,
      type: DeviceType,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupConfigsGroupID: string,
  } | null,
};

export type DeleteGroupConfigMutationVariables = {
  input: DeleteGroupConfigInput,
  condition?: ModelGroupConfigConditionInput | null,
};

export type DeleteGroupConfigMutation = {
  deleteGroupConfig?:  {
    __typename: "GroupConfig",
    name: string,
    configs:  Array< {
      __typename: "SavedConfig",
      deviceID: string,
      type: DeviceType,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupConfigsGroupID: string,
  } | null,
};

export type CreateDeviceMutationVariables = {
  input: CreateDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type CreateDeviceMutation = {
  createDevice?:  {
    __typename: "Device",
    deviceID: string,
    hubID: string,
    name: string,
    type: DeviceType,
    users?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    config:  {
      __typename: "Config",
      voltage?: number | null,
      red?: number | null,
      green?: number | null,
      blue?: number | null,
      white?: boolean | null,
    },
    groups?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDeviceMutationVariables = {
  input: UpdateDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type UpdateDeviceMutation = {
  updateDevice?:  {
    __typename: "Device",
    deviceID: string,
    hubID: string,
    name: string,
    type: DeviceType,
    users?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    config:  {
      __typename: "Config",
      voltage?: number | null,
      red?: number | null,
      green?: number | null,
      blue?: number | null,
      white?: boolean | null,
    },
    groups?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDeviceMutationVariables = {
  input: DeleteDeviceInput,
  condition?: ModelDeviceConditionInput | null,
};

export type DeleteDeviceMutation = {
  deleteDevice?:  {
    __typename: "Device",
    deviceID: string,
    hubID: string,
    name: string,
    type: DeviceType,
    users?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    config:  {
      __typename: "Config",
      voltage?: number | null,
      red?: number | null,
      green?: number | null,
      blue?: number | null,
      white?: boolean | null,
    },
    groups?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserDevicesMutationVariables = {
  input: CreateUserDevicesInput,
  condition?: ModelUserDevicesConditionInput | null,
};

export type CreateUserDevicesMutation = {
  createUserDevices?:  {
    __typename: "UserDevices",
    id: string,
    userUserID: string,
    deviceDeviceID: string,
    user:  {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserDevicesMutationVariables = {
  input: UpdateUserDevicesInput,
  condition?: ModelUserDevicesConditionInput | null,
};

export type UpdateUserDevicesMutation = {
  updateUserDevices?:  {
    __typename: "UserDevices",
    id: string,
    userUserID: string,
    deviceDeviceID: string,
    user:  {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserDevicesMutationVariables = {
  input: DeleteUserDevicesInput,
  condition?: ModelUserDevicesConditionInput | null,
};

export type DeleteUserDevicesMutation = {
  deleteUserDevices?:  {
    __typename: "UserDevices",
    id: string,
    userUserID: string,
    deviceDeviceID: string,
    user:  {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGroupDevicesMutationVariables = {
  input: CreateGroupDevicesInput,
  condition?: ModelGroupDevicesConditionInput | null,
};

export type CreateGroupDevicesMutation = {
  createGroupDevices?:  {
    __typename: "GroupDevices",
    id: string,
    groupGroupID: string,
    deviceDeviceID: string,
    group:  {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGroupDevicesMutationVariables = {
  input: UpdateGroupDevicesInput,
  condition?: ModelGroupDevicesConditionInput | null,
};

export type UpdateGroupDevicesMutation = {
  updateGroupDevices?:  {
    __typename: "GroupDevices",
    id: string,
    groupGroupID: string,
    deviceDeviceID: string,
    group:  {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGroupDevicesMutationVariables = {
  input: DeleteGroupDevicesInput,
  condition?: ModelGroupDevicesConditionInput | null,
};

export type DeleteGroupDevicesMutation = {
  deleteGroupDevices?:  {
    __typename: "GroupDevices",
    id: string,
    groupGroupID: string,
    deviceDeviceID: string,
    group:  {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  userID: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    userID: string,
    email: string,
    username: string,
    password: string,
    salt: string,
    groups?:  {
      __typename: "ModelGroupConnection",
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    defaultGroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  userID?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGroupQueryVariables = {
  groupID: string,
};

export type GetGroupQuery = {
  getGroup?:  {
    __typename: "Group",
    groupID: string,
    name: string,
    devices?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    groupConfigs?:  {
      __typename: "ModelGroupConfigConnection",
      nextToken?: string | null,
    } | null,
    groupPresets?:  {
      __typename: "ModelGroupPresetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGroupsQueryVariables = {
  groupID?: string | null,
  filter?: ModelGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListGroupsQuery = {
  listGroups?:  {
    __typename: "ModelGroupConnection",
    items:  Array< {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGroupPresetQueryVariables = {
  id: string,
};

export type GetGroupPresetQuery = {
  getGroupPreset?:  {
    __typename: "GroupPreset",
    name: string,
    preset:  {
      __typename: "SavedPreset",
      type: DeviceType,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupPresetsGroupID: string,
  } | null,
};

export type ListGroupPresetsQueryVariables = {
  filter?: ModelGroupPresetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroupPresetsQuery = {
  listGroupPresets?:  {
    __typename: "ModelGroupPresetConnection",
    items:  Array< {
      __typename: "GroupPreset",
      name: string,
      id: string,
      createdAt: string,
      updatedAt: string,
      groupGroupPresetsGroupID: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGroupConfigQueryVariables = {
  id: string,
};

export type GetGroupConfigQuery = {
  getGroupConfig?:  {
    __typename: "GroupConfig",
    name: string,
    configs:  Array< {
      __typename: "SavedConfig",
      deviceID: string,
      type: DeviceType,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupConfigsGroupID: string,
  } | null,
};

export type ListGroupConfigsQueryVariables = {
  filter?: ModelGroupConfigFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroupConfigsQuery = {
  listGroupConfigs?:  {
    __typename: "ModelGroupConfigConnection",
    items:  Array< {
      __typename: "GroupConfig",
      name: string,
      id: string,
      createdAt: string,
      updatedAt: string,
      groupGroupConfigsGroupID: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDeviceQueryVariables = {
  deviceID: string,
};

export type GetDeviceQuery = {
  getDevice?:  {
    __typename: "Device",
    deviceID: string,
    hubID: string,
    name: string,
    type: DeviceType,
    users?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    config:  {
      __typename: "Config",
      voltage?: number | null,
      red?: number | null,
      green?: number | null,
      blue?: number | null,
      white?: boolean | null,
    },
    groups?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDevicesQueryVariables = {
  deviceID?: string | null,
  filter?: ModelDeviceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDevicesQuery = {
  listDevices?:  {
    __typename: "ModelDeviceConnection",
    items:  Array< {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserDevicesQueryVariables = {
  id: string,
};

export type GetUserDevicesQuery = {
  getUserDevices?:  {
    __typename: "UserDevices",
    id: string,
    userUserID: string,
    deviceDeviceID: string,
    user:  {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserDevicesQueryVariables = {
  filter?: ModelUserDevicesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserDevicesQuery = {
  listUserDevices?:  {
    __typename: "ModelUserDevicesConnection",
    items:  Array< {
      __typename: "UserDevices",
      id: string,
      userUserID: string,
      deviceDeviceID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGroupDevicesQueryVariables = {
  id: string,
};

export type GetGroupDevicesQuery = {
  getGroupDevices?:  {
    __typename: "GroupDevices",
    id: string,
    groupGroupID: string,
    deviceDeviceID: string,
    group:  {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGroupDevicesQueryVariables = {
  filter?: ModelGroupDevicesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroupDevicesQuery = {
  listGroupDevices?:  {
    __typename: "ModelGroupDevicesConnection",
    items:  Array< {
      __typename: "GroupDevices",
      id: string,
      groupGroupID: string,
      deviceDeviceID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UsersByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByEmailQuery = {
  usersByEmail?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GroupsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GroupsByUserIDQuery = {
  groupsByUserID?:  {
    __typename: "ModelGroupConnection",
    items:  Array< {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type DevicesByNameQueryVariables = {
  name: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeviceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type DevicesByNameQuery = {
  devicesByName?:  {
    __typename: "ModelDeviceConnection",
    items:  Array< {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserDevicesByUserUserIDQueryVariables = {
  userUserID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserDevicesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserDevicesByUserUserIDQuery = {
  userDevicesByUserUserID?:  {
    __typename: "ModelUserDevicesConnection",
    items:  Array< {
      __typename: "UserDevices",
      id: string,
      userUserID: string,
      deviceDeviceID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserDevicesByDeviceDeviceIDQueryVariables = {
  deviceDeviceID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserDevicesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserDevicesByDeviceDeviceIDQuery = {
  userDevicesByDeviceDeviceID?:  {
    __typename: "ModelUserDevicesConnection",
    items:  Array< {
      __typename: "UserDevices",
      id: string,
      userUserID: string,
      deviceDeviceID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GroupDevicesByGroupGroupIDQueryVariables = {
  groupGroupID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGroupDevicesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GroupDevicesByGroupGroupIDQuery = {
  groupDevicesByGroupGroupID?:  {
    __typename: "ModelGroupDevicesConnection",
    items:  Array< {
      __typename: "GroupDevices",
      id: string,
      groupGroupID: string,
      deviceDeviceID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GroupDevicesByDeviceDeviceIDQueryVariables = {
  deviceDeviceID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGroupDevicesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GroupDevicesByDeviceDeviceIDQuery = {
  groupDevicesByDeviceDeviceID?:  {
    __typename: "ModelGroupDevicesConnection",
    items:  Array< {
      __typename: "GroupDevices",
      id: string,
      groupGroupID: string,
      deviceDeviceID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type searchUsernameQueryVariables = {
  username: string,
};

export type searchUsernameQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      userID: string,
      password: string,
      salt: string,
    } | null >,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    userID: string,
    email: string,
    username: string,
    password: string,
    salt: string,
    groups?:  {
      __typename: "ModelGroupConnection",
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    defaultGroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    userID: string,
    email: string,
    username: string,
    password: string,
    salt: string,
    groups?:  {
      __typename: "ModelGroupConnection",
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    defaultGroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    userID: string,
    email: string,
    username: string,
    password: string,
    salt: string,
    groups?:  {
      __typename: "ModelGroupConnection",
      nextToken?: string | null,
    } | null,
    devices?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    defaultGroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
};

export type OnCreateGroupSubscription = {
  onCreateGroup?:  {
    __typename: "Group",
    groupID: string,
    name: string,
    devices?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    groupConfigs?:  {
      __typename: "ModelGroupConfigConnection",
      nextToken?: string | null,
    } | null,
    groupPresets?:  {
      __typename: "ModelGroupPresetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup?:  {
    __typename: "Group",
    groupID: string,
    name: string,
    devices?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    groupConfigs?:  {
      __typename: "ModelGroupConfigConnection",
      nextToken?: string | null,
    } | null,
    groupPresets?:  {
      __typename: "ModelGroupPresetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGroupSubscriptionVariables = {
  filter?: ModelSubscriptionGroupFilterInput | null,
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup?:  {
    __typename: "Group",
    groupID: string,
    name: string,
    devices?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    userID: string,
    groupConfigs?:  {
      __typename: "ModelGroupConfigConnection",
      nextToken?: string | null,
    } | null,
    groupPresets?:  {
      __typename: "ModelGroupPresetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGroupPresetSubscriptionVariables = {
  filter?: ModelSubscriptionGroupPresetFilterInput | null,
};

export type OnCreateGroupPresetSubscription = {
  onCreateGroupPreset?:  {
    __typename: "GroupPreset",
    name: string,
    preset:  {
      __typename: "SavedPreset",
      type: DeviceType,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupPresetsGroupID: string,
  } | null,
};

export type OnUpdateGroupPresetSubscriptionVariables = {
  filter?: ModelSubscriptionGroupPresetFilterInput | null,
};

export type OnUpdateGroupPresetSubscription = {
  onUpdateGroupPreset?:  {
    __typename: "GroupPreset",
    name: string,
    preset:  {
      __typename: "SavedPreset",
      type: DeviceType,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupPresetsGroupID: string,
  } | null,
};

export type OnDeleteGroupPresetSubscriptionVariables = {
  filter?: ModelSubscriptionGroupPresetFilterInput | null,
};

export type OnDeleteGroupPresetSubscription = {
  onDeleteGroupPreset?:  {
    __typename: "GroupPreset",
    name: string,
    preset:  {
      __typename: "SavedPreset",
      type: DeviceType,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupPresetsGroupID: string,
  } | null,
};

export type OnCreateGroupConfigSubscriptionVariables = {
  filter?: ModelSubscriptionGroupConfigFilterInput | null,
};

export type OnCreateGroupConfigSubscription = {
  onCreateGroupConfig?:  {
    __typename: "GroupConfig",
    name: string,
    configs:  Array< {
      __typename: "SavedConfig",
      deviceID: string,
      type: DeviceType,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupConfigsGroupID: string,
  } | null,
};

export type OnUpdateGroupConfigSubscriptionVariables = {
  filter?: ModelSubscriptionGroupConfigFilterInput | null,
};

export type OnUpdateGroupConfigSubscription = {
  onUpdateGroupConfig?:  {
    __typename: "GroupConfig",
    name: string,
    configs:  Array< {
      __typename: "SavedConfig",
      deviceID: string,
      type: DeviceType,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupConfigsGroupID: string,
  } | null,
};

export type OnDeleteGroupConfigSubscriptionVariables = {
  filter?: ModelSubscriptionGroupConfigFilterInput | null,
};

export type OnDeleteGroupConfigSubscription = {
  onDeleteGroupConfig?:  {
    __typename: "GroupConfig",
    name: string,
    configs:  Array< {
      __typename: "SavedConfig",
      deviceID: string,
      type: DeviceType,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    groupGroupConfigsGroupID: string,
  } | null,
};

export type OnCreateDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionDeviceFilterInput | null,
};

export type OnCreateDeviceSubscription = {
  onCreateDevice?:  {
    __typename: "Device",
    deviceID: string,
    hubID: string,
    name: string,
    type: DeviceType,
    users?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    config:  {
      __typename: "Config",
      voltage?: number | null,
      red?: number | null,
      green?: number | null,
      blue?: number | null,
      white?: boolean | null,
    },
    groups?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionDeviceFilterInput | null,
};

export type OnUpdateDeviceSubscription = {
  onUpdateDevice?:  {
    __typename: "Device",
    deviceID: string,
    hubID: string,
    name: string,
    type: DeviceType,
    users?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    config:  {
      __typename: "Config",
      voltage?: number | null,
      red?: number | null,
      green?: number | null,
      blue?: number | null,
      white?: boolean | null,
    },
    groups?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionDeviceFilterInput | null,
};

export type OnDeleteDeviceSubscription = {
  onDeleteDevice?:  {
    __typename: "Device",
    deviceID: string,
    hubID: string,
    name: string,
    type: DeviceType,
    users?:  {
      __typename: "ModelUserDevicesConnection",
      nextToken?: string | null,
    } | null,
    config:  {
      __typename: "Config",
      voltage?: number | null,
      red?: number | null,
      green?: number | null,
      blue?: number | null,
      white?: boolean | null,
    },
    groups?:  {
      __typename: "ModelGroupDevicesConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserDevicesSubscriptionVariables = {
  filter?: ModelSubscriptionUserDevicesFilterInput | null,
};

export type OnCreateUserDevicesSubscription = {
  onCreateUserDevices?:  {
    __typename: "UserDevices",
    id: string,
    userUserID: string,
    deviceDeviceID: string,
    user:  {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserDevicesSubscriptionVariables = {
  filter?: ModelSubscriptionUserDevicesFilterInput | null,
};

export type OnUpdateUserDevicesSubscription = {
  onUpdateUserDevices?:  {
    __typename: "UserDevices",
    id: string,
    userUserID: string,
    deviceDeviceID: string,
    user:  {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserDevicesSubscriptionVariables = {
  filter?: ModelSubscriptionUserDevicesFilterInput | null,
};

export type OnDeleteUserDevicesSubscription = {
  onDeleteUserDevices?:  {
    __typename: "UserDevices",
    id: string,
    userUserID: string,
    deviceDeviceID: string,
    user:  {
      __typename: "User",
      userID: string,
      email: string,
      username: string,
      password: string,
      salt: string,
      defaultGroupID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGroupDevicesSubscriptionVariables = {
  filter?: ModelSubscriptionGroupDevicesFilterInput | null,
};

export type OnCreateGroupDevicesSubscription = {
  onCreateGroupDevices?:  {
    __typename: "GroupDevices",
    id: string,
    groupGroupID: string,
    deviceDeviceID: string,
    group:  {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGroupDevicesSubscriptionVariables = {
  filter?: ModelSubscriptionGroupDevicesFilterInput | null,
};

export type OnUpdateGroupDevicesSubscription = {
  onUpdateGroupDevices?:  {
    __typename: "GroupDevices",
    id: string,
    groupGroupID: string,
    deviceDeviceID: string,
    group:  {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGroupDevicesSubscriptionVariables = {
  filter?: ModelSubscriptionGroupDevicesFilterInput | null,
};

export type OnDeleteGroupDevicesSubscription = {
  onDeleteGroupDevices?:  {
    __typename: "GroupDevices",
    id: string,
    groupGroupID: string,
    deviceDeviceID: string,
    group:  {
      __typename: "Group",
      groupID: string,
      name: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    device:  {
      __typename: "Device",
      deviceID: string,
      hubID: string,
      name: string,
      type: DeviceType,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
