import { configureStore } from '@reduxjs/toolkit'
import userReducer from "@/user/userSlice"
import groupsReducer from "@/groups/groupsSlice"
import devicesReducer from "@/devices/devicesSlice";
import { enableMapSet } from 'immer'

enableMapSet()


export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      groups: groupsReducer,
      devices: devicesReducer,
    }
  })
}

// Infer types for store, rootstate and dispatch types based off of
// actual store variable
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
// don't use these types, use the ones in hooks.ts

