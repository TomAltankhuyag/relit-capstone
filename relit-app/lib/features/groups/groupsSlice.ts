import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import { Group, GroupConfig, GroupsState, SavedConfig, GroupPreset, Preset } from "@/groups/groupsTypes";
import {
  addDeviceAction,
  AddDevicePayload,
  addDeviceToGroupAction,
  AddDeviceToGroupPayload,
  addGroupAction,
  AddGroupPayload,
  createUserAction,
  initAction,
  InitPayload, queryConfigToAppConfig,
  removeDeviceAction,
  removeDeviceFromGroupAction,
  RemoveDeviceFromGroupPayload,
  RemoveDevicePayload,
  removeGroupAction,
  RemoveGroupPayload,
  removeUserAction,
  setDeviceGroupsAction,
  setGroupDevicesAction
} from "@/lib/features/shared";
import { Config, WhiteLightConfig } from "@/devices/devicesTypes"
import { DeviceType } from '@/graphql/API';
// no groups, as not logged in
const initialState: GroupsState = {
  // the id of the group which is the default group devices get placed in
  default_id: 'GROUPS',
  groups: [
    {
      groupID: 'bedroom_id',
      name: 'Bedroom',
      device_ids: [
        'id1222',
        'id123',
        'sumID2123'
      ],
      group_configs: [],
      group_presets: [
        {
          name: 'Some RGB preset 1',
          preset: {
            type: DeviceType.RGBLight,
            config: {
              voltage: 99,
              red: 52,
              green: 122,
              blue: 175
            } as Config
          } as Preset,
        } as GroupPreset,
        {
          name: 'Some RGB preset 2',
          preset: {
            type: DeviceType.RGBLight,
            config: {
              voltage: 45,
              red: 100,
              green: 0,
              blue: 175
            } as Config
          } as Preset,
        } as GroupPreset,
      ]
    } as Group,
    {
      groupID: 'living_room_id',
      name: 'Living Room',
      device_ids: [
        'sumID2',
        'id1222'
      ],
      group_configs: [

      ],
      group_presets: [
        {
          name: 'Some RGB preset 3',
          preset: {
            type: DeviceType.RGBLight,
            config: {
              voltage: 78,
              red: 155,
              green: 111,
              blue: 175
            } as Config
          } as Preset,
        } as GroupPreset
      ]
    } as Group,
    {
      groupID: 'kitchen_id',
      name: 'Kitchen',
      device_ids: [
        'id12333'
      ],
      group_configs: [

      ],
      group_presets: [
        {
          name: 'Some White Preset 1',
          preset: {
            type: DeviceType.WhiteLight,
            config: {
              voltage: 78,
            } as Config
          } as Preset,
        } as GroupPreset
      ]
    } as Group,
  ],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,

  reducers: {
    // adds a group. Provide the group and its id
    add: (state: GroupsState, action: PayloadAction<Group>) => {
      // should not duplicate an existing group as get id from database
      // expected to add to db first, before adding locally
      state.groups.push(action.payload)
    },

    // rename a group. Provide the id of the group and the new name
    rename: (state, action: PayloadAction<{ id: string, new_name: string }>) => {
      const group = state.groups.find(group => group.groupID === action.payload.id);
      if (!group) {
        console.error("Did not find group id within app. GroupID: ", action.payload.id);
        return
      }
      group.name = action.payload.new_name;
    },

    // edit a config (not sure how this will be used)
    update_config: (state) => {
      // TODO: PLACEHOLDER
    },
    addPresetToGroup: (
      state,
      action: PayloadAction<{ groupID: string, name: string, voltage: number, red: number, green: number, blue: number }>
    ) => {
      const { groupID, name, voltage, red, green, blue } = action.payload
    
      const group = state.groups.find(group => group.groupID === groupID)
      if (!group) {
        console.warn(`Group not found while adding preset: ${groupID}`)
        return
      }
    
      group.group_presets.push({
        name,
        preset: {
          type: DeviceType.RGBLight,
          config: {
            voltage,
            red,
            green,
            blue
          }
        }
      })
    }
  },

  extraReducers: builder => {
    builder
      .addCase(initAction, (state, action: PayloadAction<InitPayload>) => {
        // clear state before init
        state.default_id = ""
        state.groups = []

        // the following line creates a bug
        // state = initialState
        // it somehow makes state into readonly, thus when we try to push to state.groups, it fails
        // meaning it would require state.groups = [...state.groups, group_to_add] to work instead

        const default_group = action.payload.data.getUser?.defaultGroupID;
        const groups_data = action.payload.data.groupsByUserID?.items;

        if (!default_group) {
          console.error("Got no default group id during groups init.")
          return
        }
        if (!groups_data) {
          console.error("Got no data on groups during groups init.")
          return
        }

        state.default_id = default_group;

        for (const group_data of groups_data) {
          // no group data, skip it
          if (!group_data) continue
          // incomplete group data, skip as well
          if (!group_data.groupConfigs) continue
          const groupConfigs = group_data.groupConfigs.items
          // incomplete config data, skip
          if (!groupConfigs) continue
          // checking of all elements is not null, if at least 1 is, incomplete data, so we skip
          if (groupConfigs.some(config => !config?.configs)) continue

          const group_configs: GroupConfig[] = groupConfigs.map(config => {
            // due to check before, config.configs will have usable data (not null or undefined)
            const conf = config?.configs
            if (!conf) throw Error(`Unexpected value: groupSlices.initAction, conf=${conf}`)

            const configs: SavedConfig[] = conf.map(config => {

              let conf: Config
              try {
                conf = queryConfigToAppConfig(config.type, config.config)
              } catch (e) {
                // unexpected behaviour, app shouldn't ever reach this part of code
                console.error(e)
                conf = { voltage: 0 } as WhiteLightConfig
              }
              return {
                deviceID: config.deviceID,
                type: config.type,
                config: conf,
              }
            })
            return {
              // config should never return false
              name: config ? config.name : "",
              configs
            }
          })

          const groupPresets = group_data.groupPresets?.items
          if (!groupPresets) continue
          // making sure all presets are not null, if at least 1 is, incomplete data, skip
          if (groupPresets.some(preset => !preset?.preset)) continue
          const group_presets: GroupPreset[] = groupPresets.map(preset => {
            if (!preset?.preset) return null
            const pres = preset.preset

            let conf: Config
            try {
              conf = queryConfigToAppConfig(pres.type, pres.config)
            } catch (e) {
              // unexpected behaviour, app shouldn't ever reach this part of code
              console.error(e)
              conf = { voltage: 0 } as WhiteLightConfig
            }
            const saved_preset: Preset = {
              type: pres.type,
              config: conf
            }
            return {
              name: preset.name,
              preset: saved_preset
            }
          }).filter(preset => preset !== null) as GroupPreset[]

          const devices = group_data.devices?.items
          if (!devices) {
            console.error("Got no devices during groups init.")
            return
          }

          const device_ids: string[] = devices.map(((device) => {
            // device should not be null, but have to check
            return device ? device.deviceDeviceID : ""
          })).filter(deviceID => deviceID)
          // remove any empty string (due to device being null)

          const group_to_add: Group = {
            groupID: group_data.groupID,
            name: group_data.name,
            device_ids,
            group_configs,
            group_presets
          }
          state.groups.push(group_to_add)
        }
      })
      .addCase(addGroupAction, (state, action: PayloadAction<AddGroupPayload>) => {
        // add group
        state.groups.push(action.payload)
      })
      .addCase(removeGroupAction, (state: GroupsState, action: PayloadAction<RemoveGroupPayload>) => {
        const groupID = action.payload;
        // remove group
        state.groups = state.groups.filter(group => group.groupID !== groupID)
      })
      .addCase(addDeviceAction, (state: GroupsState, action: PayloadAction<AddDevicePayload>) => {
        const deviceID = action.payload.deviceID;
        // add device to default group
        const defaultGroupID = state.default_id
        const defaultGroup = state.groups.find(group => group.groupID === defaultGroupID)
        if (defaultGroup && !defaultGroup.device_ids.includes(deviceID)) {
          defaultGroup.device_ids.push(deviceID);
        }
      })
      .addCase(removeDeviceAction, (state: GroupsState, action: PayloadAction<RemoveDevicePayload>) => {
        const deviceID = action.payload.deviceID;
        // remove device from all groups
        for (const group of state.groups) {
          const index = group.device_ids.indexOf(deviceID);
          if (index !== -1) {
            group.device_ids.splice(index, 1);
          }
        }
      })
      .addCase(addDeviceToGroupAction, (state: GroupsState, action: PayloadAction<AddDeviceToGroupPayload>) => {
        const groupID = action.payload.groupID;
        const deviceID = action.payload.deviceID;

        // first check if device in default group, as need to remove it from there
        // const defaultGroupID = state.default_id
        // const defaultGroup = state.groups.find(group => group.groupID === defaultGroupID)
        // if (defaultGroup && defaultGroup.device_ids.includes(deviceID)) {
        //   const index = defaultGroup.device_ids.indexOf(deviceID);
        //   if (index !== -1) {
        //     defaultGroup.device_ids.splice(index, 1);
        //   }
        // }

        // add device to group
        const group = state.groups.find(group => group.groupID === groupID)
        if (group && !group.device_ids.includes(deviceID)) {
          group.device_ids.push(deviceID);
        }
      })
      .addCase(removeDeviceFromGroupAction, (state: GroupsState, action: PayloadAction<RemoveDeviceFromGroupPayload>) => {
        const groupID = action.payload.groupID;
        const deviceID = action.payload.deviceID;

        // remove from group
        const group = state.groups.find(group => group.groupID === groupID)
        if (group) {
          const index = group.device_ids.indexOf(deviceID);
          if (index !== -1) {
            group.device_ids.splice(index, 1);
          }
        }

        // if the device was in 1 group (before removal from it), add device to default group
        // if (action.payload.num_groups_device_in === 1) {
        //   const defaultGroupID = state.default_id
        //   const defaultGroup = state.groups.find(group => group.groupID === defaultGroupID)
        //   if (defaultGroup && !defaultGroup.device_ids.includes(deviceID)) {
        //     defaultGroup.device_ids.push(deviceID);
        //   }
        // }
      })
      .addCase(createUserAction, (state, action) => {
        // should user login automatically after creating account? if not, then no local changes.
        // simply update db and go through login
      })
      .addCase(removeUserAction, (state) => {
        // clear out state
        state = initialState;
      })
      .addCase(setDeviceGroupsAction, (state, action) => {
        const { deviceID, groupIDs, defaultGroupID } = action.payload
      
        const allGroupIDs = new Set([
          ...state.groups.map(group => group.groupID),
          defaultGroupID
        ])
      
        // Remove device from all groups
        for (const group of state.groups) {
          const index = group.device_ids.indexOf(deviceID)
          if (index !== -1) group.device_ids.splice(index, 1)
        }
      
        // Add to new groups (or default group if none)
        const newGroups = groupIDs.length > 0 ? groupIDs : [defaultGroupID]
      
        for (const groupID of newGroups) {
          if (!allGroupIDs.has(groupID)) {
            console.warn(`Group ${groupID} not found when assigning device ${deviceID}`)
            continue
          }
      
          const group = state.groups.find(group => group.groupID === groupID)
          if (group && !group.device_ids.includes(deviceID)) {
            group.device_ids.push(deviceID)
          }
        }
      })
      .addCase(setGroupDevicesAction, (state, action) => {
        const { groupID, deviceIDs } = action.payload
      
        const group = state.groups.find(g => g.groupID === groupID)
        if (!group) {
          console.error(`Group ${groupID} not found`)
          return
        }
      
        group.device_ids = deviceIDs
      })
      
  }
});

export default groupsSlice.reducer;
export const selectGroups = (state: RootState) => state.groups.groups;
export const selectGroup = (state: RootState, groupID: string) => state.groups.groups.find(group => group.groupID === groupID);
export const { add, rename, addPresetToGroup } = groupsSlice.actions
