/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
    userID
    email
    username
    password
    salt
    groups {
      nextToken
      __typename
    }
    devices {
      nextToken
      __typename
    }
    defaultGroupID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
    userID
    email
    username
    password
    salt
    groups {
      nextToken
      __typename
    }
    devices {
      nextToken
      __typename
    }
    defaultGroupID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
    userID
    email
    username
    password
    salt
    groups {
      nextToken
      __typename
    }
    devices {
      nextToken
      __typename
    }
    defaultGroupID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateGroup = /* GraphQL */ `subscription OnCreateGroup($filter: ModelSubscriptionGroupFilterInput) {
  onCreateGroup(filter: $filter) {
    groupID
    name
    devices {
      nextToken
      __typename
    }
    userID
    groupConfigs {
      nextToken
      __typename
    }
    groupPresets {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGroupSubscriptionVariables,
  APITypes.OnCreateGroupSubscription
>;
export const onUpdateGroup = /* GraphQL */ `subscription OnUpdateGroup($filter: ModelSubscriptionGroupFilterInput) {
  onUpdateGroup(filter: $filter) {
    groupID
    name
    devices {
      nextToken
      __typename
    }
    userID
    groupConfigs {
      nextToken
      __typename
    }
    groupPresets {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGroupSubscriptionVariables,
  APITypes.OnUpdateGroupSubscription
>;
export const onDeleteGroup = /* GraphQL */ `subscription OnDeleteGroup($filter: ModelSubscriptionGroupFilterInput) {
  onDeleteGroup(filter: $filter) {
    groupID
    name
    devices {
      nextToken
      __typename
    }
    userID
    groupConfigs {
      nextToken
      __typename
    }
    groupPresets {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGroupSubscriptionVariables,
  APITypes.OnDeleteGroupSubscription
>;
export const onCreateGroupPreset = /* GraphQL */ `subscription OnCreateGroupPreset(
  $filter: ModelSubscriptionGroupPresetFilterInput
) {
  onCreateGroupPreset(filter: $filter) {
    name
    preset {
      type
      __typename
    }
    id
    createdAt
    updatedAt
    groupGroupPresetsGroupID
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGroupPresetSubscriptionVariables,
  APITypes.OnCreateGroupPresetSubscription
>;
export const onUpdateGroupPreset = /* GraphQL */ `subscription OnUpdateGroupPreset(
  $filter: ModelSubscriptionGroupPresetFilterInput
) {
  onUpdateGroupPreset(filter: $filter) {
    name
    preset {
      type
      __typename
    }
    id
    createdAt
    updatedAt
    groupGroupPresetsGroupID
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGroupPresetSubscriptionVariables,
  APITypes.OnUpdateGroupPresetSubscription
>;
export const onDeleteGroupPreset = /* GraphQL */ `subscription OnDeleteGroupPreset(
  $filter: ModelSubscriptionGroupPresetFilterInput
) {
  onDeleteGroupPreset(filter: $filter) {
    name
    preset {
      type
      __typename
    }
    id
    createdAt
    updatedAt
    groupGroupPresetsGroupID
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGroupPresetSubscriptionVariables,
  APITypes.OnDeleteGroupPresetSubscription
>;
export const onCreateGroupConfig = /* GraphQL */ `subscription OnCreateGroupConfig(
  $filter: ModelSubscriptionGroupConfigFilterInput
) {
  onCreateGroupConfig(filter: $filter) {
    name
    configs {
      deviceID
      type
      __typename
    }
    id
    createdAt
    updatedAt
    groupGroupConfigsGroupID
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGroupConfigSubscriptionVariables,
  APITypes.OnCreateGroupConfigSubscription
>;
export const onUpdateGroupConfig = /* GraphQL */ `subscription OnUpdateGroupConfig(
  $filter: ModelSubscriptionGroupConfigFilterInput
) {
  onUpdateGroupConfig(filter: $filter) {
    name
    configs {
      deviceID
      type
      __typename
    }
    id
    createdAt
    updatedAt
    groupGroupConfigsGroupID
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGroupConfigSubscriptionVariables,
  APITypes.OnUpdateGroupConfigSubscription
>;
export const onDeleteGroupConfig = /* GraphQL */ `subscription OnDeleteGroupConfig(
  $filter: ModelSubscriptionGroupConfigFilterInput
) {
  onDeleteGroupConfig(filter: $filter) {
    name
    configs {
      deviceID
      type
      __typename
    }
    id
    createdAt
    updatedAt
    groupGroupConfigsGroupID
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGroupConfigSubscriptionVariables,
  APITypes.OnDeleteGroupConfigSubscription
>;
export const onCreateDevice = /* GraphQL */ `subscription OnCreateDevice($filter: ModelSubscriptionDeviceFilterInput) {
  onCreateDevice(filter: $filter) {
    deviceID
    hubID
    name
    type
    users {
      nextToken
      __typename
    }
    config {
      voltage
      red
      green
      blue
      white
      __typename
    }
    groups {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateDeviceSubscriptionVariables,
  APITypes.OnCreateDeviceSubscription
>;
export const onUpdateDevice = /* GraphQL */ `subscription OnUpdateDevice($filter: ModelSubscriptionDeviceFilterInput) {
  onUpdateDevice(filter: $filter) {
    deviceID
    hubID
    name
    type
    users {
      nextToken
      __typename
    }
    config {
      voltage
      red
      green
      blue
      white
      __typename
    }
    groups {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateDeviceSubscriptionVariables,
  APITypes.OnUpdateDeviceSubscription
>;
export const onDeleteDevice = /* GraphQL */ `subscription OnDeleteDevice($filter: ModelSubscriptionDeviceFilterInput) {
  onDeleteDevice(filter: $filter) {
    deviceID
    hubID
    name
    type
    users {
      nextToken
      __typename
    }
    config {
      voltage
      red
      green
      blue
      white
      __typename
    }
    groups {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteDeviceSubscriptionVariables,
  APITypes.OnDeleteDeviceSubscription
>;
export const onCreateUserDevices = /* GraphQL */ `subscription OnCreateUserDevices(
  $filter: ModelSubscriptionUserDevicesFilterInput
) {
  onCreateUserDevices(filter: $filter) {
    id
    userUserID
    deviceDeviceID
    user {
      userID
      email
      username
      password
      salt
      defaultGroupID
      createdAt
      updatedAt
      __typename
    }
    device {
      deviceID
      hubID
      name
      type
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserDevicesSubscriptionVariables,
  APITypes.OnCreateUserDevicesSubscription
>;
export const onUpdateUserDevices = /* GraphQL */ `subscription OnUpdateUserDevices(
  $filter: ModelSubscriptionUserDevicesFilterInput
) {
  onUpdateUserDevices(filter: $filter) {
    id
    userUserID
    deviceDeviceID
    user {
      userID
      email
      username
      password
      salt
      defaultGroupID
      createdAt
      updatedAt
      __typename
    }
    device {
      deviceID
      hubID
      name
      type
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserDevicesSubscriptionVariables,
  APITypes.OnUpdateUserDevicesSubscription
>;
export const onDeleteUserDevices = /* GraphQL */ `subscription OnDeleteUserDevices(
  $filter: ModelSubscriptionUserDevicesFilterInput
) {
  onDeleteUserDevices(filter: $filter) {
    id
    userUserID
    deviceDeviceID
    user {
      userID
      email
      username
      password
      salt
      defaultGroupID
      createdAt
      updatedAt
      __typename
    }
    device {
      deviceID
      hubID
      name
      type
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserDevicesSubscriptionVariables,
  APITypes.OnDeleteUserDevicesSubscription
>;
export const onCreateGroupDevices = /* GraphQL */ `subscription OnCreateGroupDevices(
  $filter: ModelSubscriptionGroupDevicesFilterInput
) {
  onCreateGroupDevices(filter: $filter) {
    id
    groupGroupID
    deviceDeviceID
    group {
      groupID
      name
      userID
      createdAt
      updatedAt
      __typename
    }
    device {
      deviceID
      hubID
      name
      type
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGroupDevicesSubscriptionVariables,
  APITypes.OnCreateGroupDevicesSubscription
>;
export const onUpdateGroupDevices = /* GraphQL */ `subscription OnUpdateGroupDevices(
  $filter: ModelSubscriptionGroupDevicesFilterInput
) {
  onUpdateGroupDevices(filter: $filter) {
    id
    groupGroupID
    deviceDeviceID
    group {
      groupID
      name
      userID
      createdAt
      updatedAt
      __typename
    }
    device {
      deviceID
      hubID
      name
      type
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGroupDevicesSubscriptionVariables,
  APITypes.OnUpdateGroupDevicesSubscription
>;
export const onDeleteGroupDevices = /* GraphQL */ `subscription OnDeleteGroupDevices(
  $filter: ModelSubscriptionGroupDevicesFilterInput
) {
  onDeleteGroupDevices(filter: $filter) {
    id
    groupGroupID
    deviceDeviceID
    group {
      groupID
      name
      userID
      createdAt
      updatedAt
      __typename
    }
    device {
      deviceID
      hubID
      name
      type
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGroupDevicesSubscriptionVariables,
  APITypes.OnDeleteGroupDevicesSubscription
>;
