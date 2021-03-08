import React from "react"
import NavBar from "../components/NavBar"

import classes from "./styles.module.scss"
import ProcessCardList from "../components/ProcessCardList"
import useTitle from "../utils/useTitle"

const ProcessesPage = () => {
  useTitle("Процессы")

  return (
    <div className={`${classes.AppPage} ${classes.ProcessesPage}`}>
      <NavBar />
      <main className={classes.AppPage__body}>
        <ProcessCardList />
      </main>
    </div>
  )
}

export default ProcessesPage
