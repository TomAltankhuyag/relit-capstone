import * as APITypes from "@/graphql/API";


// copied from queries.ts
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

const getAllUserData = /* GraphQL */ `query getAllUserData($userID: ID!) {
  getUser(userID: $userID) {
    username
    email
    defaultGroupID
    devices {
      items {
        device {
          deviceID
        }
      }
    }
    groups {
      items {
        groupID
      }
    }
  }
  userDevicesByUserUserID(userUserID: $userID) {
    items {
      device {
        deviceID
        hubID
        name
        type
        config {
          voltage
          red
          green
          blue
          white
        }
        groups {
          items {
            groupGroupID
          }
        }
      }
    }
  }
  groupsByUserID(userID: $userID) {
    items {
      groupID
      name
      groupConfigs {
        items {
          name
          configs {
            deviceID
            type
            config {
              voltage
              red
              green
              blue
              white
            }
          }
        }
      }
      groupPresets {
        items {
          name
          preset {
            type
            config {
              voltage
              red
              green
              blue
              white
            }
          }
        }
      }
      devices {
        items {
          deviceDeviceID
        }
      }
    }
  }
}` as GeneratedQuery<APITypes.getAllUserDataQueryVariables, APITypes.getAllUserDataQuery>

export default getAllUserData