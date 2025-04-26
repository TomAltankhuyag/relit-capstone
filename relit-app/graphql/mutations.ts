/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createGroup = /* GraphQL */ `mutation CreateGroup(
  $input: CreateGroupInput!
  $condition: ModelGroupConditionInput
) {
  createGroup(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateGroupMutationVariables,
  APITypes.CreateGroupMutation
>;
export const updateGroup = /* GraphQL */ `mutation UpdateGroup(
  $input: UpdateGroupInput!
  $condition: ModelGroupConditionInput
) {
  updateGroup(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateGroupMutationVariables,
  APITypes.UpdateGroupMutation
>;
export const deleteGroup = /* GraphQL */ `mutation DeleteGroup(
  $input: DeleteGroupInput!
  $condition: ModelGroupConditionInput
) {
  deleteGroup(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteGroupMutationVariables,
  APITypes.DeleteGroupMutation
>;
export const createGroupPreset = /* GraphQL */ `mutation CreateGroupPreset(
  $input: CreateGroupPresetInput!
  $condition: ModelGroupPresetConditionInput
) {
  createGroupPreset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateGroupPresetMutationVariables,
  APITypes.CreateGroupPresetMutation
>;
export const updateGroupPreset = /* GraphQL */ `mutation UpdateGroupPreset(
  $input: UpdateGroupPresetInput!
  $condition: ModelGroupPresetConditionInput
) {
  updateGroupPreset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateGroupPresetMutationVariables,
  APITypes.UpdateGroupPresetMutation
>;
export const deleteGroupPreset = /* GraphQL */ `mutation DeleteGroupPreset(
  $input: DeleteGroupPresetInput!
  $condition: ModelGroupPresetConditionInput
) {
  deleteGroupPreset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteGroupPresetMutationVariables,
  APITypes.DeleteGroupPresetMutation
>;
export const createGroupConfig = /* GraphQL */ `mutation CreateGroupConfig(
  $input: CreateGroupConfigInput!
  $condition: ModelGroupConfigConditionInput
) {
  createGroupConfig(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateGroupConfigMutationVariables,
  APITypes.CreateGroupConfigMutation
>;
export const updateGroupConfig = /* GraphQL */ `mutation UpdateGroupConfig(
  $input: UpdateGroupConfigInput!
  $condition: ModelGroupConfigConditionInput
) {
  updateGroupConfig(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateGroupConfigMutationVariables,
  APITypes.UpdateGroupConfigMutation
>;
export const deleteGroupConfig = /* GraphQL */ `mutation DeleteGroupConfig(
  $input: DeleteGroupConfigInput!
  $condition: ModelGroupConfigConditionInput
) {
  deleteGroupConfig(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteGroupConfigMutationVariables,
  APITypes.DeleteGroupConfigMutation
>;
export const createDevice = /* GraphQL */ `mutation CreateDevice(
  $input: CreateDeviceInput!
  $condition: ModelDeviceConditionInput
) {
  createDevice(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateDeviceMutationVariables,
  APITypes.CreateDeviceMutation
>;
export const updateDevice = /* GraphQL */ `mutation UpdateDevice(
  $input: UpdateDeviceInput!
  $condition: ModelDeviceConditionInput
) {
  updateDevice(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateDeviceMutationVariables,
  APITypes.UpdateDeviceMutation
>;
export const deleteDevice = /* GraphQL */ `mutation DeleteDevice(
  $input: DeleteDeviceInput!
  $condition: ModelDeviceConditionInput
) {
  deleteDevice(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteDeviceMutationVariables,
  APITypes.DeleteDeviceMutation
>;
export const createUserDevices = /* GraphQL */ `mutation CreateUserDevices(
  $input: CreateUserDevicesInput!
  $condition: ModelUserDevicesConditionInput
) {
  createUserDevices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserDevicesMutationVariables,
  APITypes.CreateUserDevicesMutation
>;
export const updateUserDevices = /* GraphQL */ `mutation UpdateUserDevices(
  $input: UpdateUserDevicesInput!
  $condition: ModelUserDevicesConditionInput
) {
  updateUserDevices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserDevicesMutationVariables,
  APITypes.UpdateUserDevicesMutation
>;
export const deleteUserDevices = /* GraphQL */ `mutation DeleteUserDevices(
  $input: DeleteUserDevicesInput!
  $condition: ModelUserDevicesConditionInput
) {
  deleteUserDevices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserDevicesMutationVariables,
  APITypes.DeleteUserDevicesMutation
>;
export const createGroupDevices = /* GraphQL */ `mutation CreateGroupDevices(
  $input: CreateGroupDevicesInput!
  $condition: ModelGroupDevicesConditionInput
) {
  createGroupDevices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateGroupDevicesMutationVariables,
  APITypes.CreateGroupDevicesMutation
>;
export const updateGroupDevices = /* GraphQL */ `mutation UpdateGroupDevices(
  $input: UpdateGroupDevicesInput!
  $condition: ModelGroupDevicesConditionInput
) {
  updateGroupDevices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateGroupDevicesMutationVariables,
  APITypes.UpdateGroupDevicesMutation
>;
export const deleteGroupDevices = /* GraphQL */ `mutation DeleteGroupDevices(
  $input: DeleteGroupDevicesInput!
  $condition: ModelGroupDevicesConditionInput
) {
  deleteGroupDevices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteGroupDevicesMutationVariables,
  APITypes.DeleteGroupDevicesMutation
>;
