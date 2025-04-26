import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@/lib/store';
import {
  addDeviceAction,
  AddDevicePayload,
  addDeviceToGroupAction,
  AddDeviceToGroupPayload,
  initAction,
  InitPayload,
  removeDeviceAction,
  removeDeviceFromGroupAction,
  RemoveDeviceFromGroupPayload,
  RemoveDevicePayload,
  removeUserAction,
  queryConfigToAppConfig,
  setDeviceGroupsAction,
  applyPresetToDevicesAction,
  setGroupDevicesAction
} from "@/lib/features/shared";
import {Config, DevicesState, Device, } from "@/devices/devicesTypes";
import { DeviceType } from '@/graphql/API';
const initialState: DevicesState = {
  devices: [
    {
      deviceID: 'id1222',
      name: 'RGB bed & living',
      hub_id: 'hub1',
      type: DeviceType.RGBLight,
      config: {
        voltage: 55,
        red: 155,
        green: 54,
        blue: 130
      },
      group_ids: [
        'bedroom_id',
        'living_room_id'
      ]
    } as Device,
    {
      deviceID: 'sumID2123',
      name: 'RGB bedroom',
      hub_id: 'hub1',
      type: DeviceType.RGBLight,
      config: {
        voltage: 40,
        red: 100,
        green: 10,
        blue: 250,
      },
      group_ids: [
        'bedroom_id'
      ]
    } as Device,
    {
      deviceID: 'id123',
      name: 'RGB Bed 2',
      hub_id: 'hub1',
      type: DeviceType.RGBLight,
      config: {
        voltage: 75,
        red: 155,
        green: 54,
        blue: 130,
      },
      group_ids: [
        'bedroom_id'
      ]
    } as Device,
    {
      deviceID: 'sumID2',
      name: 'RGB living',
      hub_id: 'hub1',
      type: DeviceType.RGBLight,
      config: {
        voltage: 32,
        red: 60,
        green: 100,
        blue: 190,
      },
      group_ids: [
        'living_room_id'
      ]
    } as Device,
    {
      deviceID: 'id12333',
      name: 'White kitchen',
      hub_id: 'hub1',
      type: DeviceType.WhiteLight,
      config: {
        voltage: 95,
      },
      group_ids: [
        'kitchen_id',
      ]
    } as Device,
    {
      deviceID: 'owif',
      name: 'RGBW ungrouped',
      hub_id: 'hub1',
      type: DeviceType.RGBWLight,
      config: {
        voltage: 69,
        red: 60,
        green: 100,
        blue: 190,
        white: 45
      },
      group_ids: []
    } as Device,
    {
      deviceID: 'capstone_light_rgb',
      name: 'Fair Light RGB',
      hub_id: 'hub1',
      type: DeviceType.RGBLight,
      config: {
        voltage: 3,
        red: 60,
        green: 100,
        blue: 190,
      },
      group_ids: []
    } as Device,
    {
      deviceID: 'capstone_light_white',
      name: 'Fair Light White',
      hub_id: 'hub1',
      type: DeviceType.WhiteLight,
      config: {
        voltage: 13,
      },
      group_ids: []
    } as Device,
  ] 
}

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  
  reducers: {
    updateDevice: (state, action: PayloadAction<{ device: Device}>) => {
      const index = state.devices.findIndex(
        device => device.deviceID === action.payload.device.deviceID
      )
    
      if (index !== -1) {
        console.log('updating')
        state.devices[index] = action.payload.device
      }
    }
  },

  extraReducers: builder => {
    builder
      .addCase(initAction, (state, action: PayloadAction<InitPayload>) => {
        const devices_data = action.payload.data.userDevicesByUserUserID?.items

        // Clear devices as we need to overwrite
        state.devices = []

        // got nothing, can't do any init actions
        if (!devices_data) return

        for (const device_data of devices_data) {
          // no device data, skip it
          if (!device_data) continue
          const device = device_data.device

          let device_config: Config | null = null

          try {
            device_config = queryConfigToAppConfig(device.type, device.config)
          } catch (e) {
            if (e instanceof TypeError) {
              console.error(e.message)
            } else {
              console.error(e)
            }
          }

          // got an unknown device type, so don't include it
          if (!device_config) continue
          const device_to_add = {
            deviceID: device.deviceID,
            hub_id: device.hubID,
            name: device.name,
            type: device.type,
            config: device_config,
            group_ids: device.groups? device.groups.items.map(group => group ? group.groupGroupID: ""): []
          }
          state.devices.push(device_to_add)
        }
      })
      .addCase(addDeviceAction, (state: DevicesState, action: PayloadAction<AddDevicePayload>) => {
        const { deviceID, name, hub_id, type, config, defaultGroupID } = action.payload;

        // Add device
        state.devices.push({
          deviceID,
          name,
          type,
          hub_id,
          config,
          group_ids: [defaultGroupID]
        })
      })
      .addCase(removeDeviceAction, (state: DevicesState, action: PayloadAction<RemoveDevicePayload>) => {
        // Remove device from state
        state.devices = state.devices.filter(device => device.deviceID !== action.payload.deviceID)
      })
      .addCase(addDeviceToGroupAction, (state: DevicesState, action: PayloadAction<AddDeviceToGroupPayload>) => {
        const { deviceID, defaultGroupID, groupID } = action.payload;
        const device = state.devices.find(device => device.deviceID === deviceID)

        // device not found
        if (!device) {
          console.error("Device to add to group not found. DeviceID = ", deviceID)
          return
        }

        // Remove device from default_group
        const deviceGroupIndex = device.group_ids.indexOf(defaultGroupID)
        if (deviceGroupIndex !== -1) {
          device.group_ids.splice(deviceGroupIndex, 1)
        }
        // Add group to device
        device.group_ids.push(groupID)
      })
      .addCase(removeDeviceFromGroupAction, (state: DevicesState, action: PayloadAction<RemoveDeviceFromGroupPayload>) => {
        const { deviceID, groupID, defaultGroupID } = action.payload;
        const device = state.devices.find(device => device.deviceID === deviceID)

        // device not found
        if (!device) {
          console.error("Device to remove from group not found. DeviceID = ", deviceID)
          return
        }

        // Remove group from device
        const deviceGroupIndex = device.group_ids.indexOf(groupID);
        if (deviceGroupIndex !== -1) {
          device.group_ids.splice(deviceGroupIndex, 1);
        }

        // add to default group if no longer part of any groups
        if (device.group_ids.length === 0) {
          device.group_ids.push(defaultGroupID)
        }
      })
      .addCase(removeUserAction, (state) => {
        // clear out data
        state.devices = []
      })
      .addCase(setDeviceGroupsAction, (state, action) => {
        const { deviceID, groupIDs, defaultGroupID } = action.payload
      
        const device = state.devices.find(device => device.deviceID === deviceID)
        if (!device) {
          console.error('Device not found when setting device groups:', deviceID)
          return
        }
      
        // Update device's group_ids (fallback to default if empty)
        device.group_ids = groupIDs.length > 0 ? [...groupIDs] : [defaultGroupID]
      })
      .addCase(applyPresetToDevicesAction, (state, action) => {
        const { preset, deviceIDs } = action.payload
        const { voltage, red, green, blue, white } = preset.config
      
        for (const deviceID of deviceIDs) {
          const device = state.devices.find(d => d.deviceID === deviceID)
          if (!device) continue
      
          const updatedDevice = { ...device }
      
          // Always apply voltage (aka brightness)
          updatedDevice.config.voltage = voltage
      
          // Apply RGB if device supports it
          if (
            device.type === DeviceType.RGBLight ||
            device.type === DeviceType.RGBWLight
          ) {
            updatedDevice.config.red = red
            updatedDevice.config.green = green
            updatedDevice.config.blue = blue
          }
      
          // Apply white if device is RGBW and white is in preset
          if (
            device.type === DeviceType.RGBWLight &&
            'white' in preset.config
          ) {
            updatedDevice.config.white = white
          }
      
          const index = state.devices.findIndex(d => d.deviceID === deviceID)
          if (index !== -1) {
            state.devices[index] = updatedDevice
          }
        }
      })
      .addCase(setGroupDevicesAction, (state, action) => {
        const { groupID, deviceIDs, defaultGroupID } = action.payload
      
        const affectedDevices = state.devices.filter(
          d => d.group_ids.includes(groupID) || deviceIDs.includes(d.deviceID)
        )
      
        for (const device of affectedDevices) {
          // Remove the groupID from devices that are no longer in the group
          device.group_ids = device.group_ids.filter(id => id !== groupID)
      
          // Add the groupID if device is in new list and it doesn't already have it
          if (deviceIDs.includes(device.deviceID)) {
            device.group_ids.push(groupID)
          }
      
          // If device has no groups after this update, assign to default
          if (device.group_ids.length === 0) {
            device.group_ids.push(defaultGroupID)
          }
        }
      })
      
      

  }
});

export default devicesSlice.reducer;
export const selectDevices = (state: RootState) => state.devices.devices;
export const selectDevice = (state: RootState, deviceID: string) => state.devices.devices.find(device => device.deviceID === deviceID);
export const { updateDevice } = devicesSlice.actions;
