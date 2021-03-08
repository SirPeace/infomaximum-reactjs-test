import React from "react"
import { Link } from "react-router-dom"

import Alert from "../components/Alert"
import classes from "./styles.module.scss"
import Paper from "../components/Paper"
import SignupForm from "../components/forms/SignupForm"
import useTitle from "../utils/useTitle"

const SignupPage = () => {
  useTitle("Регистрация")

  const [error, setError] = React.useState<string | null>(null)

  const handleErrors = (error: string) => {
    setError(error)
  }

  const handleSubmit = () => {
    setError(null)
  }

  return (
    <div className={classes.SignupPage}>
      <div className={classes.SignupPage__container}>
        <div className={classes.logo}></div>
        <Paper className={classes.paper}>
          <div className={classes.paper__container}>
            <SignupForm handleErrors={handleErrors} onSubmit={handleSubmit} />

            <p>
              Уже зарегистрированы?&nbsp;<Link to="/login">Вход</Link>
            </p>
          </div>

          <div className={classes.alert}>
            <Alert message={error as string} type="danger" render={!!error} />
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default SignupPage
