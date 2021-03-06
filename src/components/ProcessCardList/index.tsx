import React, { Dispatch } from "react"
import { useQuery } from "@apollo/client"

import { ProcessesList } from "../../server/queries"
import Alert from "../Alert"
import Loader from "../Loader"
import ProcessCard from "../ProcessCard"
import { connect } from "react-redux"
import { ProcessesState } from "../../store/processes/reducer"
import { ProcessesAction, setProcesses } from "../../store/processes/actions"
import { State } from "../../store"

interface ProcessCardListProps {
  processes: ProcessesState
  setProcesses: (data: ProcessesState) => void
}

const ProcessCardList = ({ processes, setProcesses }: ProcessCardListProps) => {
  const { loading, error } = useQuery(ProcessesList, {
    skip: JSON.stringify(processes) !== "[]",
    onCompleted: (data: any) => {
      setProcesses(data.processList)
    },
  })

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert message={error.message} render={!!error} type="danger" />
  ) : (
    (processes as any).map((process: any, index: number) => (
      <div style={{ marginBottom: 12 }} key={process.id}>
        <ProcessCard
          name={process.name}
          numberOfExecutions={process.numberOfExecutions}
          numberOfScenarios={process.numberOfScenarios}
          averageActiveTime={process.averageActiveTime}
          averageLeadTime={process.averageLeadTime}
          employeesInvolvedProcess={process.employeesInvolvedProcess}
          start={process.start}
          end={process.end}
          loading={process.loading}
        />
      </div>
    ))
  )
}

const mapStateToProps = (state: State) => ({
  processes: state.processes,
})

const mapDispatchToProps = (dispatch: Dispatch<ProcessesAction>) => ({
  setProcesses: (data: ProcessesState) => dispatch(setProcesses(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCardList)
