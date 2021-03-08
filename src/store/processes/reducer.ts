import { ProcessesAction } from "./actions"

export type ProcessesState = {
  __typename: string
  id: number
  name: string
  numberOfExecutions: number
  numberOfScenarios: number
  end: string
  loading: string
  start: string
  employeesInvolvedProcess: number
  averageLeadTime: string
  averageActiveTime: string
}[]

const initialState: ProcessesState = []

const ProcessesReducer = (state = initialState, action: ProcessesAction) => {
  switch (action.type) {
    case "SET_PROCESSES":
      console.log(state)
      return action.payload
    default:
      return state
  }
}

export default ProcessesReducer
