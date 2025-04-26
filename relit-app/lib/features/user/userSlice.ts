import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import {
  addDeviceAction, AddDevicePayload,
  addGroupAction, AddGroupPayload, createUserAction,
  initAction, InitPayload,
  removeDeviceAction, RemoveDevicePayload,
  removeGroupAction, RemoveGroupPayload, removeUserAction,
} from '@/lib/features/shared';
import { UserState } from '@/user/userTypes';

// Empty initial state, as user not logged in
const initialState: UserState = {
  userID: 'userid123',
  username: 'NPC',
  email: 'usermail@mail.com',
  group_ids: [
    'group1',
    'group2',
    'group3'
  ], // Initialize as an empty array
  device_ids: [
    'owif',
    'id12333',
    'sumID2',
    'id123',
    'sumID2123',
    'id1222',
    'capstone_light_rgb',
    "capstone_light_white"
  ], // Initialize as an empty array
  logged_in: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    login: (state) => {
      state.logged_in = true;
    },

    logout: (state) => {
      state.logged_in = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initAction, (state, action: PayloadAction<InitPayload>) => {
        const user_data = action.payload.data.getUser;

        // if got none, got no data to init with
        if (!user_data) return

        state.userID = action.payload.userID;
        state.username = user_data.username;
        state.email = user_data.email;

        state.group_ids = []
        const group_ids = user_data.groups?.items
        if (group_ids) {
          state.group_ids = group_ids.map(group => group ? group.groupID : "")
        }

        state.device_ids = []
        const device_ids = user_data.devices?.items
        if (device_ids) {
          state.device_ids = device_ids.map(device => device ? device.device.deviceID : "")
        }
      })
      .addCase(addGroupAction, (state, action: PayloadAction<AddGroupPayload>) => {
        // Add group id if it doesn't already exist
        if (!state.group_ids.includes(action.payload.groupID)) {
          state.group_ids.push(action.payload.groupID);
        }
      })
      .addCase(removeGroupAction, (state, action: PayloadAction<RemoveGroupPayload>) => {
        // Remove group id
        state.group_ids = state.group_ids.filter(id => id !== action.payload);
      })
      .addCase(addDeviceAction, (state, action: PayloadAction<AddDevicePayload>) => {
        // Add device id if it doesn't already exist
        if (!state.device_ids.includes(action.payload.deviceID)) {
          state.device_ids.push(action.payload.deviceID);
        }
      })
      .addCase(removeDeviceAction, (state, action: PayloadAction<RemoveDevicePayload>) => {
        // Remove device id
        state.device_ids = state.device_ids.filter((id) => id !== action.payload.deviceID);
      })
      .addCase(createUserAction, (state, action) => {
        // Handle user creation logic (left empty for now)
      })
      .addCase(removeUserAction, (state) => {
        // Correctly reset state without re-assigning
        Object.assign(state, initialState);
      });
  },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
export const selectLoggedIn = (state: RootState) => state.user.logged_in;
export const { login, logout } = userSlice.actions;
