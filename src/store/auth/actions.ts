import { AnyAction } from "redux"
import { UserData } from "./reducer"

interface updateUserDataAction extends AnyAction {
  type: "UPDATE_USER_DATA"
  payload: UserData
}

export const updateUserData = (data: UserData): updateUserDataAction => ({
  type: "UPDATE_USER_DATA",
  payload: data,
})

interface setAuthTokenAction extends AnyAction {
  type: "SET_AUTH_TOKEN"
  payload: string
}

export const setAuthToken = (token: string): setAuthTokenAction => ({
  type: "SET_AUTH_TOKEN",
  payload: token,
})

export type AuthAction = updateUserDataAction | setAuthTokenAction
