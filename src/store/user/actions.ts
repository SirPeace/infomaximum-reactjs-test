import { AnyAction } from "redux"
import { UserState } from "./reducer"

interface updateUserDataAction extends AnyAction {
  type: "UPDATE_USER_DATA"
  payload: UserState
}

export const updateUserData = (data: UserState): updateUserDataAction => ({
  type: "UPDATE_USER_DATA",
  payload: data,
})

export type AuthAction = updateUserDataAction
