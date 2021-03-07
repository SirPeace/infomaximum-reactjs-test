import { AuthAction } from "./actions"

export type UserData = {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface AuthState {
  token?: string
  user?: UserData
}

const initialState: AuthState = {}

const AuthReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case "SET_AUTH_TOKEN":
      return {
        ...state,
        token: action.payload,
      }
    case "UPDATE_USER_DATA":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    default:
      return initialState
  }
}

export default AuthReducer
