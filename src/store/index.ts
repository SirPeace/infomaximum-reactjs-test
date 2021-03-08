import { combineReducers } from "redux"
import ProcessesReducer, { ProcessesState } from "./processes/reducer"
import UserReducer, { UserState } from "./user/reducer"

export type State = {
  user: UserState
  processes: ProcessesState
}

const rootReducer = combineReducers({
  user: UserReducer,
  processes: ProcessesReducer,
})

export default rootReducer
