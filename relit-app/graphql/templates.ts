import {Amplify} from "aws-amplify";
import awsconfig from "@amplifyconfig";
import {generateClient} from "aws-amplify/api";
import {createGroupDevices, deleteGroup, deleteGroupDevices, deleteUser, deleteUserDevices} from "@/graphql/mutations"
import {listGroupDevices, listUserDevices} from "@/graphql/queries";

// need these 2 lines in same page as planning to use graphql
Amplify.configure(awsconfig);
const client = generateClient()

// function for calling graphql statements
// variables are based off of types defined in API.ts
async function graphql_templates() {
  // delete user
  const userID = ""
  const deleteUserResult = await client.graphql({
    query: deleteUser,
    variables: {
      input: {
        userID
      }
    }
  })
  // delete group
  const groupID = ""
  const deleteGroupResult = await client.graphql({
    query: deleteGroup,
    variables: {
      input: {
        groupID
      }
    }
  })

  /// START remove device from user (requires 2 graphql statements)

  // get join-table id using deviceID and userID

  const deviceID = ""
  // const userID = ""    need this, just not declaring as an example above already did that
  const joinTable_userDevice = await client.graphql({
    query: listUserDevices,
    variables: {
      filter: {
        userUserID: { eq: userID }, deviceDeviceID: { eq: deviceID }
      }
    }
  })  // this should return a list of only 1 id
  const joinTableUserDevices = joinTable_userDevice.data.listUserDevices.items
  if (joinTableUserDevices.length !== 1) {
    // deal with error and stop, expected size is 1
  }
  const userDeviceID = joinTableUserDevices[0].id

  // remove from device from user
  const removeUserDeviceResult = await client.graphql({
    query: deleteUserDevices,
    variables: {
      input: {
        id: userDeviceID
      }
    }
  })
  /// END remove device from user

  /// START remove device rom group (requires 2 graphql statements)
  // get join-table id of group-device

  // const deviceID = ""
  // const groupID = ""     need these 2 variables defined, commented out as already defined earlier
  const joinTable_groupDevice = await client.graphql({
    query: listGroupDevices,
    variables: {
      filter: {
        groupGroupID: { eq: groupID }, deviceDeviceID: { eq: deviceID }
      }
    }
  })  // this should only return 1
  const joinTableGroupDevices = joinTable_groupDevice.data.listGroupDevices.items
  if (joinTableGroupDevices.length !== 1) {
    // deal with error and stop
  }
  const groupDeviceID = joinTableGroupDevices[0].id

  // remove join-table row
  const removeGroupDeviceResult = await client.graphql({
    query: deleteGroupDevices,
    variables: {
      input: {
        id: groupDeviceID
      }
    }
  })
  /// END change device group

  // add device to a group
  // const deviceID = ""
  // const groupID = ""     need these 2 variables defined, commented out as already defined earlier
  const addGroupDeviceResult = await client.graphql({
    query: createGroupDevices,
    variables: {
      input: {
        groupGroupID: groupID,
        deviceDeviceID: deviceID,
      }
    }
  })

}
