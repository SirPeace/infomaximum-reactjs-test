import { ProcessesState } from "./reducer"

interface SetProcessesAction {
  type: "SET_PROCESSES"
  payload: ProcessesState
}

export const setProcesses = (data: ProcessesState): SetProcessesAction => {
  return {
    type: "SET_PROCESSES",
    payload: data,
  }
}

export type ProcessesAction = SetProcessesAction
