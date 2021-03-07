import React from "react"
import NavBar from "../components/NavBar"

import classes from "./styles.module.scss"
import ProcessCard from "../components/ProcessCard"
import useTitle from "../utils/useTitle"
import { useQuery } from "@apollo/client"
import { ProcessesList } from "../server/queries"
import Loader from "../components/Loader"
import Alert from "../components/Alert"

const ProcessesPage = () => {
  useTitle("Процессы")

  const { data, loading, error } = useQuery(ProcessesList)

  return (
    <div className={`${classes.AppPage} ${classes.ProcessesPage}`}>
      <NavBar />
      <main className={classes.AppPage__body}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert message={error.message} render={!!error} />
        ) : (
          data.processList.map((process: any, index: number) => (
            <div className={classes.ProcessCard} key={`ProcessCard-${index}`}>
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
        )}
      </main>
    </div>
  )
}

export default ProcessesPage
