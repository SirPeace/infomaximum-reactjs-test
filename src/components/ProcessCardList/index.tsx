import React from "react"
import { useQuery } from "@apollo/client"

import { ProcessesList } from "../../server/queries"
import Alert from "../Alert"
import Loader from "../Loader"
import ProcessCard from "../ProcessCard"

const ProcessCardList = () => {
  const { data, loading, error } = useQuery(ProcessesList)

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert message={error.message} render={!!error} type="danger" />
  ) : (
    data.processList.map((process: any, index: number) => (
      <div style={{ marginBottom: 12 }} key={`ProcessCard-${index}`}>
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

export default ProcessCardList
