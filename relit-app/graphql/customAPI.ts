// export type searchUsernameQuery = {
//   listUsers?: {
//       items: Array<{
//         userID: string
//         password: string
//         salt: string
//       } | null>
//   } | null
// }
//
// export type getAllUserDataQuery = {
//   getUser?: {
//     username: string
//     email: string
//     defaultGroupID: string
//     devices?: {
//       items: Array<{
//         device?: {
//           deviceID: string
//         } | null
//       } | null>
//     } | null
//     groups?: {
//       items: Array<{
//         groupID: string
//       } | null>
//     } | null
//   } | null
//
//   userDevicesByUserUserID?: {
//     items: Array<{
//       device?: {
//         deviceID: string
//         hubID: string
//         name: string
//         type: string
//         config: ConfigQuery
//         groups?: {
//           items: Array<{
//             groupGroupID: string
//           }>
//         }
//       } | null
//     } | null>
//   } | null
//
//   groupsByUserID?: {
//     items: Array<{
//       groupID: string
//       name: string
//       groupConfigs?: {
//         name: string
//         items: Array<{
//           deviceID: string
//           type: string
//           config: ConfigQuery
//         }>
//       } | null
//       devices? : {
//         items: Array<{
//           deviceDeviceID: string
//         }>
//       } | null
//     } | null>
//   } | null
// }
//
// export type ConfigQuery = {
//   voltage?: number | null
//   red?: number | null
//   green?: number | null
//   blue?: number | null
//   white?: boolean | null
// }