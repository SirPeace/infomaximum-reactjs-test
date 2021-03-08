import { combineReducers } from "redux"
import ProcessesReducer from "./processes/reducer"
import UserReducer from "./user/reducer"

const rootReducer = combineReducers({
  user: UserReducer,
  processes: ProcessesReducer,
})

export default rootReducer
