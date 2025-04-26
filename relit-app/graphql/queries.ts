/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($userID: ID!) {
  getUser(userID: $userID) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $userID: ID
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    userID: $userID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getGroup = /* GraphQL */ `query GetGroup($groupID: ID!) {
  getGroup(groupID: $groupID) {
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
` as GeneratedQuery<APITypes.GetGroupQueryVariables, APITypes.GetGroupQuery>;
export const listGroups = /* GraphQL */ `query ListGroups(
  $groupID: ID
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listGroups(
    groupID: $groupID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      groupID
      name
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGroupsQueryVariables,
  APITypes.ListGroupsQuery
>;
export const getGroupPreset = /* GraphQL */ `query GetGroupPreset($id: ID!) {
  getGroupPreset(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetGroupPresetQueryVariables,
  APITypes.GetGroupPresetQuery
>;
export const listGroupPresets = /* GraphQL */ `query ListGroupPresets(
  $filter: ModelGroupPresetFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroupPresets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      name
      id
      createdAt
      updatedAt
      groupGroupPresetsGroupID
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGroupPresetsQueryVariables,
  APITypes.ListGroupPresetsQuery
>;
export const getGroupConfig = /* GraphQL */ `query GetGroupConfig($id: ID!) {
  getGroupConfig(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetGroupConfigQueryVariables,
  APITypes.GetGroupConfigQuery
>;
export const listGroupConfigs = /* GraphQL */ `query ListGroupConfigs(
  $filter: ModelGroupConfigFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroupConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      name
      id
      createdAt
      updatedAt
      groupGroupConfigsGroupID
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGroupConfigsQueryVariables,
  APITypes.ListGroupConfigsQuery
>;
export const getDevice = /* GraphQL */ `query GetDevice($deviceID: ID!) {
  getDevice(deviceID: $deviceID) {
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
` as GeneratedQuery<APITypes.GetDeviceQueryVariables, APITypes.GetDeviceQuery>;
export const listDevices = /* GraphQL */ `query ListDevices(
  $deviceID: ID
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDevices(
    deviceID: $deviceID
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      deviceID
      hubID
      name
      type
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDevicesQueryVariables,
  APITypes.ListDevicesQuery
>;
export const getUserDevices = /* GraphQL */ `query GetUserDevices($id: ID!) {
  getUserDevices(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserDevicesQueryVariables,
  APITypes.GetUserDevicesQuery
>;
export const listUserDevices = /* GraphQL */ `query ListUserDevices(
  $filter: ModelUserDevicesFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userUserID
      deviceDeviceID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserDevicesQueryVariables,
  APITypes.ListUserDevicesQuery
>;
export const getGroupDevices = /* GraphQL */ `query GetGroupDevices($id: ID!) {
  getGroupDevices(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetGroupDevicesQueryVariables,
  APITypes.GetGroupDevicesQuery
>;
export const listGroupDevices = /* GraphQL */ `query ListGroupDevices(
  $filter: ModelGroupDevicesFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroupDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      groupGroupID
      deviceDeviceID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGroupDevicesQueryVariables,
  APITypes.ListGroupDevicesQuery
>;
export const usersByEmail = /* GraphQL */ `query UsersByEmail(
  $email: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UsersByEmailQueryVariables,
  APITypes.UsersByEmailQuery
>;
export const groupsByUserID = /* GraphQL */ `query GroupsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  groupsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      groupID
      name
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GroupsByUserIDQueryVariables,
  APITypes.GroupsByUserIDQuery
>;
export const devicesByName = /* GraphQL */ `query DevicesByName(
  $name: String!
  $sortDirection: ModelSortDirection
  $filter: ModelDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  devicesByName(
    name: $name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      deviceID
      hubID
      name
      type
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.DevicesByNameQueryVariables,
  APITypes.DevicesByNameQuery
>;
export const userDevicesByUserUserID = /* GraphQL */ `query UserDevicesByUserUserID(
  $userUserID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserDevicesFilterInput
  $limit: Int
  $nextToken: String
) {
  userDevicesByUserUserID(
    userUserID: $userUserID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userUserID
      deviceDeviceID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserDevicesByUserUserIDQueryVariables,
  APITypes.UserDevicesByUserUserIDQuery
>;
export const userDevicesByDeviceDeviceID = /* GraphQL */ `query UserDevicesByDeviceDeviceID(
  $deviceDeviceID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserDevicesFilterInput
  $limit: Int
  $nextToken: String
) {
  userDevicesByDeviceDeviceID(
    deviceDeviceID: $deviceDeviceID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userUserID
      deviceDeviceID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserDevicesByDeviceDeviceIDQueryVariables,
  APITypes.UserDevicesByDeviceDeviceIDQuery
>;
export const groupDevicesByGroupGroupID = /* GraphQL */ `query GroupDevicesByGroupGroupID(
  $groupGroupID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelGroupDevicesFilterInput
  $limit: Int
  $nextToken: String
) {
  groupDevicesByGroupGroupID(
    groupGroupID: $groupGroupID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      groupGroupID
      deviceDeviceID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GroupDevicesByGroupGroupIDQueryVariables,
  APITypes.GroupDevicesByGroupGroupIDQuery
>;
export const groupDevicesByDeviceDeviceID = /* GraphQL */ `query GroupDevicesByDeviceDeviceID(
  $deviceDeviceID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelGroupDevicesFilterInput
  $limit: Int
  $nextToken: String
) {
  groupDevicesByDeviceDeviceID(
    deviceDeviceID: $deviceDeviceID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      groupGroupID
      deviceDeviceID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GroupDevicesByDeviceDeviceIDQueryVariables,
  APITypes.GroupDevicesByDeviceDeviceIDQuery
>;
