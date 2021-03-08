import { AuthAction } from "./actions"

export type UserState = {
  id: number
  firstName: string
  secondName: string
  email: string
}

const initialState: UserState | {} = {}

const UserReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case "UPDATE_USER_DATA":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default UserReducer
