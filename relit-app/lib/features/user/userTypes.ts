export interface UserState {
  userID: string
  username: string,
  email: string,
  group_ids: string[],
  device_ids: string[],
  logged_in: boolean,
}
