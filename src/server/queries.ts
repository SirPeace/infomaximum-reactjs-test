import { gql } from "@apollo/client"

export const ProcessesList = gql`
  {
    processList {
      id
      name
      numberOfExecutions
      numberOfScenarios
      end
      loading
      start
      employeesInvolvedProcess
      averageLeadTime
      averageActiveTime
    }
  }
`

export const CurrentUser = gql`
  {
    currentUser {
      id
      firstName
      secondName
      email
    }
  }
`
